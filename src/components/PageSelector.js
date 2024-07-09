import React from "react";

const PageSelector = ({
  pages,
  setSelectedPage,
  fetchPageInsights,
  setTimePeriod,
}) => {
  return (
    <div className="m-4 flex items-center">
      <select
        onChange={(e) => setSelectedPage(e.target.value)}
        defaultValue=""
        className="px-4 py-2 mt-2 text-md text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
      >
        <option value="" className="text-md" disabled>
          Select a Page
        </option>
        {pages.map((page) => (
          <option key={page.id} value={page.id} className="text-md">
            {page.name}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setTimePeriod(e.target.value)}
        defaultValue="28"
        className="px-4 py-2 mt-2 ml-4 text-md text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
      >
        <option value="7">Last 7 Days</option>
        <option value="14">Last 14 Days</option>
        <option value="28">Last 28 Days</option>
        <option value="90">Last 90 Days</option>
      </select>

      <button
        className="bg-blue-500 text-white px-2 py-2 rounded-md ml-4 text-nowrap"
        onClick={fetchPageInsights}
      >
        Get Insights
      </button>
    </div>
  );
};

export default PageSelector;
