import React, { useState, useEffect } from "react";
import { ChevronDown, RefreshCw, User } from "lucide-react";
import NavBar from "../components/Navbar";
import { useCallback } from "react";

export default function IGPagesAnalytics({
  igPages,
  setSelectedIGPage,
  fetchIGPageInsights,
  igInsights,
  engagementInsights,
}) {
  const [selectedPage, setSelectedPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedPage) {
      handleFetchInsights();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPage]);

  const handlePageChange = (e) => {
    const selected = igPages.find((page) => page.id === e.target.value);
    setSelectedPage(selected);
    setSelectedIGPage(selected);
  };

  const handleFetchInsights = useCallback(async () => {
    setIsLoading(true);
    await fetchIGPageInsights();
    setIsLoading(false);
  }, [fetchIGPageInsights]);

  const renderInsights = (insights) => {
    if (!insights || insights.length === 0)
      return <p className="text-gray-500 italic">No data available.</p>;

    return insights.map((insight, index) => {
      let value = "N/A";
      let title = insight.title;

      if (insight.title.toLowerCase() === "reach") {
        title = "People Reached";
        value =
          insight.values && insight.values[0] ? insight.values[0].value : "N/A";
      }

      if (insight.total_value) {
        value =
          insight.total_value.value !== undefined
            ? insight.total_value.value
            : "N/A";
      }

      return (
        <li
          key={index}
          className="flex justify-between items-center py-3 border-b last:border-b-0"
        >
          <span className="font-medium text-gray-700">{title}</span>
          <span className="text-gray-900 font-semibold">
            {value !== "N/A" ? value.toLocaleString() : value}
          </span>
        </li>
      );
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Instagram Pages and Analytics
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

        {selectedPage && (
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              {selectedPage.profile_picture_url ? (
                <img
                  className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
                  src={selectedPage.profile_picture_url}
                  alt={`${selectedPage.username}'s profile`}
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-blue-500 bg-gray-200 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedPage.username}
                </h2>
                <p className="text-gray-600 text-lg">
                  <span className="font-semibold">
                    {selectedPage.followers_count.toLocaleString()}
                  </span>{" "}
                  Followers
                </p>
                <p className="text-gray-500 mt-2">
                  {selectedPage.biography || "No biography available"}
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">
                    {selectedPage.media_count.toLocaleString()}
                  </span>{" "}
                  Total Posts
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
            <h2 className="text-2xl font-bold text-gray-800">
              Today's Insights
            </h2>
            <button
              onClick={handleFetchInsights}
              disabled={!selectedPage || isLoading}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <RefreshCw
                className={`h-5 w-5 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh Insights
            </button>
          </div>

          {selectedPage ? (
            isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading insights...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    Page Insights
                  </h3>
                  <ul className="space-y-2">{renderInsights(igInsights)}</ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    Engagement Insights
                  </h3>
                  <ul className="space-y-2">
                    {renderInsights(engagementInsights)}
                  </ul>
                </div>
              </div>
            )
          ) : (
            <p className="text-gray-500 text-center py-8 text-lg">
              Select a page to see its insights.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
