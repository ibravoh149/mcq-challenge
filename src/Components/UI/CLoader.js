import React from "react";
import Loader from "react-loader-spinner";

export const CLoader = ({ loading, additonalInfo }) => {
  if (!loading) {
    return null;
  }
  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        height: "100vh",
        // minHeight: "max-content",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
        zIndex: 9999,
        // width: "100%",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Loader
        type="Oval"
        color="red"
        height={100}
        width={100}
        // timeout={3000} //3 secs
      />
      <div
        style={{
          padding: "5px",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          color: "white",
          borderRadius: "4px",
        }}
      >
        {" "}
        {additonalInfo && additonalInfo}
      </div>
    </div>
  );
};
