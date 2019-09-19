import React, { useState } from "react";
import RecentApplication from "./recent-application";

const RecentApplicationsList = ({ list }) => {
  return (
    <div className="RecentApplicationsList">
      <h2>Recent Applications</h2>
      {list.map((e, i) => {
        return <RecentApplication app={e} i={i} key={e.id} />;
      })}
    </div>
  );
};
export default RecentApplicationsList;
