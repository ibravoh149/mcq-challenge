import React, { useEffect, useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import "./QuestionsHome.scss";
import { Progress } from "reactstrap";
import { Radio, Button, CLoader } from "../../Components/UI";
import {
  getQuestions,
  setAnswers,
  submitTest,
  clearAnswers,
} from "../../requests/TestRequests";
import { Context } from "../../store";
import StepWizard from "react-step-wizard";
import shortid from "shortid";
import { useEvents } from "../../utils/helper";
import Timer from "../../Components/Timer/Timer";

const QuestionsHome = () => {
  const { state, dispatch } = useContext(Context);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  // c= completed
  // s= start
  useEffect(() => {
    // if (!localStorage.c || !localStorage.s) {
    getQuestions(dispatch);
    // clearAnswers(dispatch);
    // }
  }, []);

  const events = useEvents();
  const totalQuestions =
    state.Test && state.Test.questions && state.Test.questions.length;

  const QuestionBox = (props) => {
    const {
      question,
      currentStep,
      nextStep,
      previousStep,

      setCurrentStepIndex,
    } = props;

    useEffect(() => {
      setCurrentStepIndex(currentStep);
    }, [currentStep]);

    const _handleNext = () => {
      currentStep >= totalQuestions ? _handleSubmit() : nextStep();
    };

    const _previousStep = () => {
      previousStep();
    };

    const _handleSubmit = () => {
      submitTest(dispatch, {
        questions: state.Test.questions,
        answers: state.Test.answers,
      });
    };
    return (
      <>
        {" "}
        <div className="mcq-question-container">
          <div className="mqc-question-item">
            <div className="mqc-question-item__count">{currentStep}</div>
            <p dangerouslySetInnerHTML={{ __html: question.question }}>
              {/* {question.question} */}
            </p>
            {/* <div dangerouslySetInnerHTML={{ __html: question.question }}></div> */}
          </div>
        </div>
        <h6 className="mcq-question-label">Options</h6>
        <div className="mcq-question-container">
          <div className="mqc-question-item__options">
            {question.options &&
              question.options.map((option) => {
                return (
                  <Radio
                    key={shortid.generate()}
                    label={option}
                    name={question.question}
                    value={option}
                    onChange={() => {
                      setAnswers(dispatch, { id: question.id, answer: option });
                    }}
                    checked={
                      state.Test.answers.findIndex(
                        (answer) => answer.answer === option
                      ) >= 0
                    }
                  />
                );
              })}
          </div>
        </div>
        <div className="mcq-question-container">
          <div className="mqc-question-buttons-c">
            {currentStep > 1 && (
              <Button
                value="Previous"
                height="40px"
                bgColor="white"
                borderColor="#3b4b5c"
                textColor="#3b4b5c"
                width="150px"
                onClick={_previousStep}
              />
            )}

            <Button
              value={currentStep === totalQuestions ? "Submit" : "Next"}
              height="40px"
              bgColor="#3b4b5c"
              borderColor="#3b4b5c"
              width="150px"
              onClick={_handleNext}
              isDisabled={
                state.Test.answers.findIndex(
                  (answer) => answer.id === question.id
                ) >= 0
                  ? false
                  : true
              }
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <Layout>
      <CLoader
        loading={state.Test.requestingSubmit}
        additonalInfo="Getting test score"
      />
      <div className="mcq-main">
        {" "}
        <div className="mcq-main__timer-holder">
          <Timer />
        </div>
        <div className="mcq-question-container">
          <div>
            <Progress
              value={Number((currentQuestionIndex * 100) / totalQuestions)}
              color="primary"
            />
            <span className="counter">
              Question{" "}
              <span>
                {state.Test && state.Test.questions.length > 0
                  ? currentQuestionIndex
                  : 0}{" "}
                of {totalQuestions}
              </span>
            </span>
          </div>
        </div>
        {(events.start || localStorage.s) &&
        (!events.completed || !localStorage.c || localStorage.c === "false") ? (
          <StepWizard
          // transitions={{
          //   enterRight: "none",
          //   enterLeft: "none",
          //   exitRight: "none",
          //   exitLeft: "none",
          // }}
          >
            {state.Test &&
              state.Test.questions &&
              // state.Test.questions.length > 0 &&
              state.Test.questions.map((question) => (
                <QuestionBox
                  // key={shortid.generate()}
                  question={question}
                  setCurrentStepIndex={setCurrentQuestionIndex}
                />
              ))}
          </StepWizard>
        ) : (events.start || localStorage.s) &&
          (events.completed ||
            (localStorage.c && localStorage.c === "true")) ? (
          <div className="mcq-question-container">
            Thanks for taking the test.
          </div>
        ) : (
          <div className="mcq-question-container">
            Click on "Start Test" button to begin.
            <br />
            Track your time left with the timer at the top right of your screen
            (Will show as soon as test starts)
          </div>
        )}
        {state.Test.requestingTestQuestions && (
          <div className="mcq-question-container">fetching questions...</div>
        )}
      </div>
    </Layout>
  );
};

export default QuestionsHome;
