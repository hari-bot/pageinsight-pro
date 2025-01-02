import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";

const FacebookInsightsDashboard = ({ fbPages }) => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [insightsData, setInsightsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (e) => {
    const pageId = e.target.value;
    const selected = fbPages.find((page) => page.id === pageId);
    setSelectedPage(selected);
  };

  const fetchInsights = () => {
    if (!selectedPage || !selectedPage.access_token) return;

    setLoading(true);

    window.FB.api(
      `/${selectedPage.id}/posts`,
      "GET",
      {
        fields:
          "created_time,message,full_picture,shares,likes.summary(true),comments.summary(true),insights.metric(post_impressions,post_impressions_unique,post_clicks),reactions.summary(true)",
        access_token: selectedPage.access_token,
      },
      (response) => {
        if (response && !response.error) {
          const formattedData = response.data.map((post) => {
            const likes = post.likes?.summary?.total_count || 0;
            const comments = post.comments?.summary?.total_count || 0;
            const shares = post.shares?.count || 0;
            const impressions =
              post.insights?.data?.find((m) => m.name === "post_impressions")
                ?.values[0]?.value || 0;
            const reach =
              post.insights?.data?.find(
                (m) => m.name === "post_impressions_unique"
              )?.values[0]?.value || 0;
            const reactions = post.reactions?.summary?.total_count || 0;

            const engagement = reach
              ? ((likes + comments + shares + reactions) / reach).toFixed(2)
              : 0;

            return {
              date: new Date(post.created_time).toLocaleDateString(),
              time: new Date(post.created_time).toLocaleTimeString(),
              caption: post.message || "No Caption",
              media: post.full_picture,
              likes,
              comments,
              shares,
              impressions,
              reach,
              views: impressions,
              reactions,
              engagement,
            };
          });

          setInsightsData(formattedData);
        } else {
          console.error("Error fetching insights:", response.error);
        }
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (selectedPage) {
      fetchInsights();
    }
    // eslint-disable-next-line
  }, [selectedPage]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Facebook Insights Dashboard
        </h1>

        <div className="mb-6">
          <label
            htmlFor="fbPage"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Select Facebook Page
          </label>
          <select
            id="fbPage"
            onChange={handlePageChange}
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a page</option>
            {fbPages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading insights...</p>
        ) : (
          insightsData.length > 0 && (
            <table className="table-auto w-full bg-white shadow-lg rounded-lg border border-gray-200">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Caption</th>
                  <th className="px-4 py-2">Media</th>
                  <th className="px-4 py-2">Likes</th>
                  <th className="px-4 py-2">Comments</th>
                  <th className="px-4 py-2">Shares</th>
                  <th className="px-4 py-2">Reach</th>
                  <th className="px-4 py-2">Views</th>
                  <th className="px-4 py-2">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {insightsData.map((post, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{post.date}</td>
                    <td className="px-4 py-2">{post.time}</td>
                    <td className="px-4 py-2">{post.caption}</td>
                    <td className="px-4 py-2">
                      {post.media && (
                        <img
                          src={post.media}
                          alt="Post Media"
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">{post.likes}</td>
                    <td className="px-4 py-2 text-center">{post.comments}</td>
                    <td className="px-4 py-2 text-center">{post.shares}</td>
                    <td className="px-4 py-2 text-center">{post.reach}</td>
                    <td className="px-4 py-2 text-center">{post.views}</td>
                    <td className="px-4 py-2 text-center">
                      {post.engagement}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
};

export default FacebookInsightsDashboard;
