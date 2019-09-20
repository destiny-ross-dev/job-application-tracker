import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getApplicationsForTable } from "../../redux/applications/applications.actions";
import Table from "../../components/applications-table/applications-table";
const ApplicationsPage = ({
  menuExpanded,
  applications,
  getApplicationsForTable
}) => {
  useEffect(() => {
    getApplicationsForTable();
  }, [getApplicationsForTable]);
  return (
    <div
      className={`ApplicationsPage ${
        menuExpanded
          ? "PageContainer"
          : "PageContainer PageContainer--maximized"
      }`}
    >
      <h1>Applications</h1>
      <Table data={applications} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    applications: state.applications.tableList,
    menuExpanded: state.settings.menuExpanded
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getApplicationsForTable: (limit, offset) =>
      dispatch(getApplicationsForTable())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationsPage);
