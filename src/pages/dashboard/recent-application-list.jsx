import React from "react";

const RecentApplicationsList = ({ list }) => {
  return (
    <div className="RecentApplicationsList">
      <h2>Recent Applications</h2>
      {list.map((e, i) => {
        return (
          <div key={i}>
            <h3>{e.company}</h3>
            <p>{e.position_title}</p>
          </div>
        );
      })}
    </div>
  );
};
export default RecentApplicationsList;
