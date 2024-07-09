import React from "react";

const PageSelector = ({ pages, setSelectedPage, fetchPageInsights }) => {
  return (
    <div className="m-4">
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
      <button
        className="bg-blue-500 text-white px-2 py-2 rounded-md ml-10"
        onClick={fetchPageInsights}
      >
        Get Insights
      </button>
    </div>
  );
};

export default PageSelector;
