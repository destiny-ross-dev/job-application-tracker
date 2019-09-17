import React from "react";

const DashboardStat = ({ statName, value }) => {
  return (
    <div className="DashboardStat">
      <p>{statName}</p>
      <h1>{value}</h1>
    </div>
  );
};
export default DashboardStat;
