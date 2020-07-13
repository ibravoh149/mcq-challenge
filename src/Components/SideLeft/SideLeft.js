import React, { useContext } from "react";
import "./SideLeft.scss";
import ReactAvatar from "react-avatar";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { Button } from "../UI";
import { Context } from "../../store";
import { useEvents, useUser } from "../../utils/helper";
import { getQuestions, clearAnswers } from "../../requests/TestRequests";
import { Logout } from "../../requests/logout";
import { useHistory } from "react-router-dom";

const SideLeftBar = () => {
  const { state, dispatch } = useContext(Context);
  const totalQuestions =
    state.Test && state.Test.questions && state.Test.questions.length;
  const events = useEvents();
  const startAssessment = () => {
    if (!localStorage.s) {
      localStorage.s = true;
      localStorage.c = false;
      createEventStarted();
    }
  };
  const user = useUser();
  const history = useHistory();

  const createEventStarted = () => {
    const event = new Event("started");
    document.dispatchEvent(event);
  };

  const createEventCompleted = () => {
    const event = new Event("completed");
    document.dispatchEvent(event);
  };

  const _handleStartClick = () => {
    return (events.start || localStorage.s) &&
      (!events.completed || !localStorage.c || localStorage.c === "false")
      ? startAssessment()
      : (events.start || localStorage.s) &&
        (events.completed || (localStorage.c && localStorage.c === "true"))
      ? restartAssestment()
      : startAssessment();
  };

  const restartAssestment = () => {
    getQuestions(dispatch);
    clearAnswers(dispatch);
    // localStorage.clear();
    localStorage.s = true;
    localStorage.c = false;
    createEventStarted();
    createEventCompleted();
  };

  return (
    <div className="mcq-sidebar-left">
      <div className="mcq-sidebar-left__wrapper">
        <div className="mcq-sidebar-left__wrapper--avatar-containter">
          <div className="sidebar-avatar">
            <ReactAvatar name={user.username} size={100} round />
          </div>
        </div>
        <div className="mcq-sidebar-left__wrapper--profile-card">
          <span className="profile-card-item">
            <AiOutlineUser color="#3b4b5c" size={16} />{" "}
            <span style={{ marginLeft: "10px" }}>{user.username}</span>
          </span>

          <span className="profile-card-item">
            <AiOutlineMail color="#3b4b5c" size={16} />{" "}
            <span style={{ marginLeft: "10px" }}>{user.email}</span>
          </span>
          <div className="logout" onClick={() => Logout(history)}>
            Logout
          </div>
        </div>
        <div className="score-card">
          <h1>
            Your test score:{" "}
            {state.Test.score ? (
              <span>
                {state.Test.score} /{totalQuestions || 10}
              </span>
            ) : events.score ? (
              <span>
                {events.score} /{totalQuestions || 10}
              </span>
            ) : null}
          </h1>

          <Button
            bgColor="var(--pre-green)"
            borderColor="var(--pre-green)"
            // className="flex-1"
            value={
              (events.start || localStorage.s) &&
              (!events.completed ||
                !localStorage.c ||
                localStorage.c === "false")
                ? "Started Test"
                : (events.start || localStorage.s) &&
                  (events.completed ||
                    (localStorage.c && localStorage.c === "true"))
                ? "Retake Test"
                : "Start Test"
            }
            width="150px"
            // isLoading
            onClick={_handleStartClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SideLeftBar;
