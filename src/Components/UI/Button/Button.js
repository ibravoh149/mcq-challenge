import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Button.scss";

export const Button = ({
  value,
  hasIcon,
  icon,
  isLoading,
  bgColor,
  textColor,
  onClick,
  borderColor,
  isDisabled,
  width,
  height,
  fontSize,
  className,
  useImage,
}) => {
  let styles = {
    backgroundColor: bgColor,
    minHeight: height,
    minWidth: width,
    color: textColor,
    borderColor,
    // borderColor: borderColor ? borderColor : textColor,
    border: borderColor ? `1px solid ${borderColor}` : "0px",
    fontSize,
  };
  if (isDisabled) {
    styles.backgroundColor = "#919ba8";
    // styles.borderColor = "#919ba8";
    styles.border = `2px solid #919ba8`;
    onClick = () => {
      console.log("inavtive");
    };
  }
  return (
    <div
      className={`custom-btn ${className ? className : ""}`}
      style={styles}
      onClick={onClick}
    >
      {hasIcon && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "space-between",
            flex: 1,
            alignItems: "center",
          }}
        >
          {useImage ? (
            <img
              src={icon}
              style={{ width: fontSize, height: fontSize, marginRight: "5px" }}
              alt="play icon"
            />
          ) : (
            <>{icon} </>
          )}

          {value}
        </div>
      )}
      {!hasIcon && value}
    </div>
  );
};

Button.propTypes = {
  //   width: PropTypes.string.isRequired,
  //   height: PropTypes.string.isRequired
};
Button.defaultProps = {
  width: "211px",
  height: "48px",
  bgColor: "#da291c",
  textColor: "#fff",
  fontSize: "18px",
  isLoading: false,
  isDisabled: false,
  hasIcon: false,
  borderColor: "#da291c",
  onClick: () => {},
  useImage: true,
};
