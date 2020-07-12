import React from "react";
import "./CheckBox.scss";

export const CheckBox = ({
  label,
  value,
  name,
  className,
  checked,
  onChange,
  disabled,
}) => {
  return (
    <label className={`check-container ${className}`}>
      {label}
      <input
        type="checkbox"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <span className="check-checkmark"></span>
    </label>
  );
};
CheckBox.defaultProps = {
  className: "",
  onChange: () => {},
};

export const Radio = ({ label, value, name, className, onChange, checked }) => {
  return (
    <label className={`radio-container ${className}`}>
      {label}
      <input
        type="radio"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        checked={checked}
      />
      <span className="checkmark"></span>
    </label>
  );
};

Radio.defaultProps = {
  className: "",
  onChange: () => {},
};
