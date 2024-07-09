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

const InsightsDisplayComponent = ({ insights }) => {
  return (
    <>
      <div className="my-5">
        <p className="font-semibold text-xl">Page overview </p>
        <p className="text-gray-500">Last 28 days</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {insights.map((insight, index) => {
          const metric = metricTitles[insight.name] || {
            title: "Unknown Metric",
            icon: null,
          };
          return (
            <div
              key={index}
              className="border border-blue-300 p-5 rounded-lg shadow-sm"
            >
              <h3 className="text-md font-semibold flex items-center mb-2">
                {metric.icon && (
                  <FontAwesomeIcon icon={metric.icon} className="mr-2" />
                )}
                {metric.title}
              </h3>
              <p className="text-2xl font-semibold">
                {insight.values[0].value}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default InsightsDisplayComponent;
