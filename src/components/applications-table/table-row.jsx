import React from "react";
import PinComponent from "./pin-component";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
const TableRow = ({ applicationData, reload, limit }) => {
  return (
    <div className="Table__Row Table__Row--Data">
      <p className="Table__Column Table__Column--Company">
        {applicationData.company}
      </p>
      <p className="Table__Column Table__Column--Position">
        {applicationData.position_title}
      </p>
      <p className="Table__Column Table__Column--City">
        {applicationData.city}
      </p>
      <p className="Table__Column Table__Column--State">
        {applicationData.state}
      </p>
      <p className="Table__Column Table__Column--Applied">
        {format(parseISO(applicationData.date_applied), "MMM dd, yyyy")}
      </p>
      <p className="Table__Column Table__Column--Status">
        {applicationData.status}
      </p>
      <p className="Table__Column Table__Column--Contact">
        {applicationData.contact_name}
      </p>
      <p className="Table__Column Table__Column--Email">
        {applicationData.contact_email}
      </p>
      <p className="Table__Column Table__Column--Link">
        <a href={applicationData.posting_url}>Link</a>
      </p>

      <PinComponent
        limit={limit}
        reload={reload}
        pinned={applicationData.pinned}
        applicationId={applicationData.id}
      />
    </div>
  );
};

export default TableRow;
