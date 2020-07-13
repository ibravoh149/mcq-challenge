import React, { useContext, useEffect } from "react";
import "./Timer.scss";
import Countdown, { zeroPad, calcTimeDelta } from "react-countdown";
import moment from "moment";
import { submitTest } from "../../requests/TestRequests";
import { Context } from "../../store";
import { useEvents } from "../../utils/helper";

const Timer = (props) => {
  const { state, dispatch } = useContext(Context);

  const startTimer = () => {
    if (localStorage.s) {
      // localStorage.count = true;
      localStorage.d = moment(Date.now()).add(5, "m").valueOf();
    }
  };

  const events = useEvents();

  useEffect(() => {
    document.addEventListener("started", startTimer);
  }, []);

  let date;
  if (localStorage.d) {
    date = calcTimeDelta(JSON.parse(localStorage.d));
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <div className={`timer`}>
          <span>Submitted</span>
        </div>
      );
    } else {
      // Render a countdown
      const timerColor =
        minutes > 3
          ? "timer-success"
          : minutes <= 3 && minutes >= 1
          ? "timer-warning"
          : "timer-danger";
      return (
        <div className={`timer ${timerColor}`}>
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
        <div className={`timer`}>
          <span>Submitted</span>
        </div>
      );
    } else {
      return (
        <div className={`timer`}>
          <span>Not started</span>
        </div>
      );
    }
  };

  return (
    <>
      {showTimer()}
      <span className="time-left">Time Left</span>
    </>
  );
};

export default Timer;
