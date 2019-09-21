import React, { useState, useEffect, Suspense } from "react";

import { connect } from "react-redux";
import {
  getApplicationsForTable,
  getStatsForDashboard
} from "../../redux/applications/applications.actions";

const TableRow = React.lazy(() => import("./table-row"));
const Table = ({
  history,
  getStatsForDashboard,
  getApplicationsForTable,
  applications,
  stats
}) => {
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [totalApplications, setTotalApplications] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getStatsForDashboard();
    getApplicationsForTable();
  }, []);

  const reloadTable = (limit, offset) => {
    getApplicationsForTable(limit, offset);
  };

  const onLimitChange = e => {
    setLimit(e.target.value);
    reloadTable(e.target.value);
  };

  const onClickPageBack = () => {
    if (offset - limit < 0) {
      return;
    }
    setOffset(offset - limit);
    setPage(page => page - 1);
    reloadTable(limit, offset - limit);
  };

  const onClickPageForward = async () => {
    console.log("forward");
    if (offset + limit > totalApplications) {
      return;
    }
    setOffset(offset + limit);
    setPage(page => page + 1);
    reloadTable(limit, offset + limit);
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="Table">
        <div className="Table__Row--Header Table__Row">
          <h3 className="Table__ColumnTitle Table__Column Table__Column--Company">
            Company Name
          </h3>
          <h3 className="Table__ColumnTitle Table__Column Table__Column--Position">
            Position
          </h3>
          <h3 className="Table__ColumnTitle Table__Column Table__Column--City">
            City
          </h3>
          <h3 className="Table__ColumnTitle Table__Column Table__Column Table__Column--State">
            State
          </h3>
          <h3 className="Table__ColumnTitle Table__Column Table__Column--Applied">
            Applied
          </h3>
          <h3 className="Table__ColumnTitle Table__Column Table__Column--Status">
            Status
          </h3>
          <h3 className="Table__ColumnTitle Table__Column Table__Column--Contact">
            Contact Name
          </h3>
          <h3 className="Table__ColumnTitle Table__Column Table__Column--Email">
            Contact Email
          </h3>
          <h3 className="Table__ColumnTitle Table__Column Table__Column--Link">
            Posting
          </h3>
          <h3 className="Table__ColumnTitle Table__Column Table__Column--Pinned">
            Pinned
          </h3>
          <h3 className="Table__ColumnTitle Table__Column Table__Column--Options"></h3>
        </div>

        {applications.map((e, i) => {
          console.log(e);
          return (
            <TableRow key={i} reload={reloadTable} limit={limit} data={e} />
          );
        })}
        <div className="Table__Row Table__Row--Footer">
          <div className="Spacer" />
          <div className="RowController">
            <p>Rows Per Page:</p>
            <select value={limit} onChange={onLimitChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>

          <div className="Pagination">
            <div onClick={onClickPageBack}>
              <i className="fas PageControl fa-chevron-left" />
            </div>
            <p>
              Page {page} of {Math.ceil(stats["Total Applications"] / limit)}
            </p>
            <div onClick={onClickPageForward}>
              <i className="fas PageControl fa-chevron-right" />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
const mapStateToProps = state => {
  return {
    applications: state.applications.tableList,
    stats: state.applications.stats
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getApplicationsForTable: (limit, offset) =>
      dispatch(getApplicationsForTable(limit, offset)),
    getStatsForDashboard: () => dispatch(getStatsForDashboard())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
