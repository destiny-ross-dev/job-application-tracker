import React from "react";

const InputField = ({ error, handleChange, label, onLockClick, ...props }) => {
  return (
    <div
      className={`${
        props.disabled ? "InputField InputField--disabled" : "InputField"
      }`}
      type={props.type}
    >
      <input onChange={handleChange} {...props} />
      {label ? (
        <label className={props.value.length ? "shrink" : ""}>{label}</label>
      ) : null}
    </div>
  );
};
export default InputField;
