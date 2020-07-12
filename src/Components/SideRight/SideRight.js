import React from "react";
import "./SideRight.scss";
import Countdown, { zeroPad } from "react-countdown";
import moment from "moment";

const SideRight = () => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <div className={`mcq-sidebar-right__timer`}>
          <span>Submitted</span>
        </div>
      );
    } else {
      // Render a countdown
      const timerColor =
        minutes > 20
          ? "timer-success"
          : minutes <= 20 && minutes >= 5
          ? "timer-warning"
          : "timer-danger";
      return (
        <div className={`mcq-sidebar-right__timer ${timerColor}`}>
          <span>
            {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
          </span>
        </div>
      );
    }
  };

  return (
    <div className="mcq-sidebar-right">
      {/* <div className="mcq-sidebar-right__timer"> */}
      <Countdown
        renderer={renderer}
        date={moment(Date.now()).add(45, "m").valueOf()}
        onComplete={() => console.log("completed")}
      />
      {/* </div> */}
      <span className="time-left">Time Left</span>

      <div className="mcq-sidebar-right__intsructions-c">
        <h6 className="">Instructions</h6>
        <div className="mcq-sidebar-right__intsructions-c--intsructions">
          <div className="instruction-item">
            <div className="instruction-item__count">1</div>
            <p>All Questions are compulsory.</p>
          </div>
          <div className="instruction-item">
            <div className="instruction-item__count">2</div>
            <p>You have 45 mins to answer all questions.</p>
          </div>
          <div className="instruction-item">
            <div className="instruction-item__count">3</div>
            <p>Do not spend too much time on one question.</p>
          </div>
          <div className="instruction-item">
            <div className="instruction-item__count">4</div>
            <p>
              Once the time elapse before you finish, the system will
              automatically Submit your answers.
            </p>
          </div>
          {/* <div className="instruction-item">
            <div className="instruction-item__count">5</div>
            <p>
              You can take test again by clicking on "retake test" button below.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SideRight;
