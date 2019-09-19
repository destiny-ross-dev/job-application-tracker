import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isEmpty } from "../../utils";
import NotAuthed from "./not-authed";
import { getMostRecentApplications } from "../../redux/applications/applications.actions";
import DashboardStat from "../../components/dashboard-stat/dashboard-stat";
import RecentApplicationList from "./recent-application-list";
import { ColumnChart } from "react-chartkick";
import "chart.js";

const Dashboard = ({
  menuExpanded,
  user,
  getMostRecentApplications,
  history,
  recentList
}) => {
  const [lineChartData, setLineChartData] = useState({});
  useEffect(() => {
    getMostRecentApplications();
  }, [getMostRecentApplications]);

  useEffect(() => {
    mutateDataForChart(recentList);
  }, [recentList]);

  const mutateDataForChart = data => {
    const lineChartData = {};

    data.map((e, i) => {
      e.date_appliedShort = e.date_applied.slice(0, 10);
      if (e.date_applied in lineChartData) {
        console.log("exists");
        lineChartData[e.date_applied] = lineChartData[e.date_applied] + 1;
      } else {
        console.log("adding");
        lineChartData[e.date_applied] = 1;
      }
    });
    console.log(lineChartData);
    setLineChartData(lineChartData);
  };

  return (
    <div
      className={`DashboardPage ${
        menuExpanded
          ? "PageContainer"
          : "PageContainer PageContainer--maximized"
      }`}
    >
      {isEmpty(user) ? (
        <NotAuthed />
      ) : (
        <div className="DashboardContainer">
          <RecentApplicationList list={recentList} />
          <div className="StatContainer">
            <DashboardStat statName="Total Applications" value={56} />
            <DashboardStat statName="Interviews Scheduled" value={4} />
            <DashboardStat statName="Offers" value={1} />
          </div>
          <div className="Chart">
            <h2>Applications Over Time</h2>
            <ColumnChart
              label="Applications"
              ytitle="Number of Applications"
              xtitle="Date"
              colors={["#8d2663"]}
              data={lineChartData}
              library={{ color: "#fff" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    menuExpanded: state.settings.menuExpanded,
    recentList: state.applications.recentApplications
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMostRecentApplications: () => dispatch(getMostRecentApplications())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
