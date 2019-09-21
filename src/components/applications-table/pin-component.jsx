import React, { useState } from "react";
import axios from "axios";

const PinComponent = ({ pinned, applicationId, reload, limit }) => {
  const [isPinned, setPinned] = useState(pinned);
  const onPinClick = async () => {
    try {
      const newPinnedState = await axios.put("/applications", {
        pinned: !isPinned,
        id: applicationId
      });
      console.log(newPinnedState.data);
      reload(limit);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(pinned);
  return (
    <div
      className={`Table__Column Table__Column--Pinned ${
        pinned ? "PinComponent--solid" : "PinComponent--empty"
      }`}
    >
      <i className={`fas fa-thumbtack pin`} />
    </div>
  );
};

export default PinComponent;
