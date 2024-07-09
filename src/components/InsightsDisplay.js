import React from "react";

const InsightsDisplay = ({ insights }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {insights.map((insight, index) => (
        <div
          key={index}
          className="border border-blue-300 p-5 rounded-lg shadow-sm"
        >
          <h3 className="text-lg font-semibold">{insight.title}</h3>
          <p className="text-xl font-semibold">{insight.values[0].value}</p>
        </div>
      ))}
    </div>
  );
};

export default InsightsDisplay;
