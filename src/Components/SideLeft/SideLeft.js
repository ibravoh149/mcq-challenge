import React from "react";
import "./SideLeft.scss";
import ReactAvatar from "react-avatar";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { Button } from "../UI";

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
        <div className="score-card">
          <h1>
            Your test score:<span>45</span>
          </h1>

          <Button
            bgColor="var(--pre-green)"
            borderColor="var(--pre-green)"
            // className="flex-1"
            value="Start Test"
            width="150px"
            // isLoading
          />
        </div>
      </div>
    </div>
  );
};

export default SideLeftBar;
