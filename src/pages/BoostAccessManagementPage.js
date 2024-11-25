import React, { useState, useEffect, useCallback } from "react";
import { ChevronDown, RefreshCw } from "lucide-react";
import NavBar from "../components/Navbar";

const BoostAccessManagementPage = ({ igPages, setSelectedIGPage }) => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [postsWithBoostAccess, setPostsWithBoostAccess] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handlePageChange = (e) => {
    const selected = igPages.find((page) => page.id === e.target.value);
    setSelectedPage(selected);
    setSelectedIGPage(selected);
  };

  const fetchPostsWithBoostAccess = useCallback(() => {
    if (!selectedPage) return;

    setIsRefreshing(true);
    window.FB.api(
      `/${selectedPage.id}/media?fields=id,media_type,media_url,owner{username},timestamp,permalink,caption,branded_content_partner_promote`,
      (response) => {
        if (response && !response.error) {
          const posts = response.data.filter(
            (post) =>
              post.branded_content_partner_promote &&
              post.branded_content_partner_promote.data.length > 0
          );
          setPostsWithBoostAccess(posts);
          console.log("Posts with boost access:", posts);
        } else {
          console.error("Error fetching posts:", response.error);
        }
        setIsRefreshing(false);
      }
    );
  }, [selectedPage]);

  const revokeBoostAccess = (postId, partnerId) => {
    window.FB.api(
      `/${postId}/branded_content_partner_promote`,
      "POST",
      {
        sponsor_id: partnerId,
        permission: false,
      },
      (response) => {
        if (response && response.success) {
          alert("Boost access revoked successfully!");
          fetchPostsWithBoostAccess();
        } else {
          console.error("Error revoking boost access:", response.error);
        }
      }
    );
  };

  useEffect(() => {
    if (selectedPage) {
      fetchPostsWithBoostAccess();
    }
  }, [selectedPage, fetchPostsWithBoostAccess]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Manage Boost Access for Branded Posts
        </h1>

        <div className="mb-8">
          <label
            htmlFor="igPage"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Select Instagram Page
          </label>
          <div className="relative">
            <select
              id="igPage"
              onChange={handlePageChange}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a page</option>
              {igPages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.username}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Posts with Boost Access
            </h2>
            <button
              onClick={fetchPostsWithBoostAccess}
              disabled={isRefreshing || !selectedPage}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                className={`h-5 w-5 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
          {postsWithBoostAccess.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {postsWithBoostAccess.map((post) => (
                <li
                  key={post.id}
                  className="py-4 flex items-center justify-between"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.media_url}
                      alt="Post"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {post.caption || "View Post"}
                      </a>
                      <p className="text-sm text-gray-500">
                        Posted by: {post.owner.username}
                      </p>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {post.branded_content_partner_promote.data.map(
                      (partner) => (
                        <button
                          key={partner.id}
                          onClick={() => revokeBoostAccess(post.id, partner.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
                        >
                          Revoke Access
                        </button>
                      )
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8 text-lg">
              No posts with boost access found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoostAccessManagementPage;
