import React, { useContext, useEffect } from "react";
import "./SideRight.scss";
import Countdown, { zeroPad, calcTimeDelta } from "react-countdown";
import moment from "moment";
import { submitTest } from "../../requests/TestRequests";
import { Context } from "../../store";
import { useEvents } from "../../utils/helper";

const SideRight = () => {
  const { state, dispatch } = useContext(Context);

  const startTimer = () => {
    if (localStorage.s) {
      // localStorage.count = true;
      localStorage.d = moment(Date.now()).add(1, "m").valueOf();
    }
  };

  const events = useEvents();

  useEffect(() => {
    document.addEventListener("started", startTimer);
  }, []);

  useEffect(() => {}, []);

  let date;
  if (localStorage.d) {
    date = calcTimeDelta(JSON.parse(localStorage.d));
  }

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
        minutes > 5
          ? "timer-success"
          : minutes <= 5 && minutes >= 2
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

  const showTimer = () => {
    if (!localStorage.count) {
      localStorage.count = true;
      localStorage.d = moment(Date.now()).add(1, "m").valueOf();
    }
    if (
      (events.start || localStorage.s) &&
      (!events.completed || !localStorage.c || localStorage.c === "false")
    ) {
      return (
        <Countdown
          renderer={renderer}
          date={Date.now() + date.total}
          onComplete={() =>
            submitTest(dispatch, {
              questions: state.Test && state.Test.questions,
              answers: state.Test && state.Test.answers,
            })
          }
        />
      );
    } else if (
      (events.start || localStorage.s) &&
      (events.completed || (localStorage.c && localStorage.c === "true"))
    ) {
      return (
        <div className={`mcq-sidebar-right__timer`}>
          <span>Submitted</span>
        </div>
      );
    } else {
      return (
        <div className={`mcq-sidebar-right__timer`}>
          <span>Not started</span>
        </div>
      );
    }
  };

  return (
    <div className="mcq-sidebar-right">
      {/* <div className="mcq-sidebar-right__timer"> */}

      {showTimer()}

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
            <p>You have 8 mins to answer all questions.</p>
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
          <div className="instruction-item">
            <div className="instruction-item__count">5</div>
            <p>
              Do not refresh the page while the test is going on, if you attempt
              to do so, you will get new set of questions and your timer will
              not reset
            </p>
          </div>
          <div className="instruction-item">
            <div className="instruction-item__count">6</div>
            <p>
              if you attempt to logout and log back in, you will be greeted with
              new set of questions
            </p>
          </div>
          <div className="instruction-item">
            <div className="instruction-item__count">7</div>
            <p>
              Finally, you can always retake test after completing current test
              but with new set of questions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideRight;
