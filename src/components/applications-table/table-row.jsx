import React from "react";
import PinComponent from "./pin-component";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
const TableRow = ({ data, reload, limit }) => {
  return (
    <div className="Table__Row Table__Row--Data">
      <p className="Table__Column Table__Column--Company">{data.company}</p>
      <p className="Table__Column Table__Column--Position">
        {data.position_title}
      </p>
      <p className="Table__Column Table__Column--City">{data.city}</p>
      <p className="Table__Column Table__Column--State">{data.state}</p>
      <p className="Table__Column Table__Column--Applied">
        {format(parseISO(data.date_applied), "MMM dd, yyyy")}
      </p>
      <p className="Table__Column Table__Column--Status">{data.status}</p>
      <p className="Table__Column Table__Column--Contact">
        {data.contact_name}
      </p>
      <p className="Table__Column Table__Column--Email">{data.contact_email}</p>
      <p className="Table__Column Table__Column--Link">
        <a href={data.posting_url}>Link</a>
      </p>

      <PinComponent
        limit={limit}
        reload={reload}
        pinned={data.pinned}
        applicationId={data.id}
      />
      <div className="Table__Column Table__Column--Options">
        <i className="fas fa-ellipsis-v"></i>
      </div>
    </div>
  );
};

export default TableRow;
