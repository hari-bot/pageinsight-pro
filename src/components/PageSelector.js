import React from "react";

const PageSelector = ({
  pages,
  setSelectedPage,
  fetchPageInsights,
  setTimePeriod,
}) => {
  return (
    <div className="my-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <select
        onChange={(e) => setSelectedPage(e.target.value)}
        defaultValue=""
        className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="" disabled>
          Select a Page
        </option>
        {pages.map((page) => (
          <option key={page.id} value={page.id}>
            {page.name}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setTimePeriod(e.target.value)}
        defaultValue="28"
        className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="7">Last 7 Days</option>
        <option value="14">Last 14 Days</option>
        <option value="28">Last 28 Days</option>
        <option value="90">Last 90 Days</option>
      </select>

      <button
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        onClick={fetchPageInsights}
      >
        Get Insights
      </button>
    </div>
  );
};

export default PageSelector;
