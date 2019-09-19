import React, { useState } from "react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

const RecentApplication = ({ app }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <div className="RecentApplicationsList__Item" key={app.id}>
      <h3>{app.company}</h3>
      <p>{app.position_title}</p>
      <p>Date applied: {format(parseISO(app.date_applied), "MMM dd, yyyy")}</p>
      <p>Status: {app.status}</p>
      <div
        className="RecentApplicationOptionToggle"
        onClick={() => setOptionsOpen(!optionsOpen)}
      >
        <i className="fas fa-ellipsis-v"></i>
      </div>
      {optionsOpen && (
        <div
          onMouseLeave={() => setOptionsOpen(false)}
          className="RecentApplicationOption"
        >
          <p>Edit</p>
        </div>
      )}
    </div>
  );
};

export default RecentApplication;
