import React from "react";

function CheckBoxes({ name }) {
  return (
    <label className="checkbox-container">
      {name}
      <input type="checkbox" checked="checked" />
      <span className="checkmark"></span>
    </label>
  );
}

export default CheckBoxes;
