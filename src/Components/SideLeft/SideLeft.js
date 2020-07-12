import React from "react";
import "./SideLeft.scss";
import ReactAvatar from "react-avatar";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";

const SideLeftBar = () => {
  return (
    <div className="mcq-sidebar-left">
      <div className="mcq-sidebar-left__wrapper">
        <div className="mcq-sidebar-left__wrapper--avatar-containter">
          <div className="sidebar-avatar">
            <ReactAvatar name="John Doe" size={100} round />
          </div>
        </div>
        <div className="mcq-sidebar-left__wrapper--profile-card">
          <span className="profile-card-item">
            <AiOutlineUser color="#3b4b5c" size={16} />{" "}
            <span style={{ marginLeft: "10px" }}>ibravoh149</span>
          </span>

          <span className="profile-card-item">
            <AiOutlineMail color="#3b4b5c" size={16} />{" "}
            <span style={{ marginLeft: "10px" }}>ibravoh149@gmail.com</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideLeftBar;
