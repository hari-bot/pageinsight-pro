import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faThumbsUp,
  faEye,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const metricTitles = {
  page_follows: { title: "Total Followers / Fans", icon: faUsers },
  page_post_engagements: { title: "Total Engagement", icon: faChartLine },
  page_impressions: { title: "Total Impressions", icon: faEye },
  page_actions_post_reactions_like_total: {
    title: "Total Reactions",
    icon: faThumbsUp,
  },
};

const InsightsDisplayComponent = ({ insights, timePeriod }) => {
  return (
    <div className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Page Overview</h2>
        <p className="text-gray-600">Last {timePeriod} days</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => {
          const metric = metricTitles[insight.name] || {
            title: "Unknown Metric",
            icon: null,
          };
          return (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition duration-300"
            >
              <div className="flex items-center mb-2">
                {metric.icon && (
                  <FontAwesomeIcon
                    icon={metric.icon}
                    className="text-blue-500 mr-3 text-xl"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-800">
                  {metric.title}
                </h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {insight.values[0].value.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsDisplayComponent;
