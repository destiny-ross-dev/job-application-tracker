import React, { useEffect } from "react";
import { connect } from "react-redux";
import { isEmpty } from "../../utils";
import NotAuthed from "./not-authed";
import { getMostRecentApplications } from "../../redux/applications/applications.actions";
import DashboardStat from "../../components/dashboard-stat/dashboard-stat";
import RecentApplicationList from "./recent-application-list";
const Dashboard = ({
  menuExpanded,
  user,
  getMostRecentApplications,
  history,
  recentList
}) => {
  useEffect(() => {
    getMostRecentApplications();
  }, [getMostRecentApplications]);
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
          <div className="Chart">Chart</div>
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
