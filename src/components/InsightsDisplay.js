import React from "react";

const metricTitles = {
  page_follows: "Total Followers / Fans",
  page_post_engagements: "Total Engagement",
  page_impressions: "Total Impressions",
  page_actions_post_reactions_like_total: "Total Reactions",
};

const InsightsDisplayComponent = ({ insights }) => {
  return (
    <>
      <div className="my-5">
        <p className="font-semibold text-xl">Page overview </p>
        <p className="text-gray-500">Last 28 days</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="border border-blue-300 p-5 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold">
              {metricTitles[insight.name] || "Unknown Metric"}
            </h3>
            <p className="text-xl font-semibold">{insight.values[0].value}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default InsightsDisplayComponent;
