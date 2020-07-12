import React from "react";
import Layout from "../../Components/Layout/Layout";
import "./QuestionsHome.scss";
import { Progress } from "reactstrap";
import { Radio, Button } from "../../Components/UI";

const QuestionsHome = () => {
  return (
    <Layout>
      <div className="mcq-main">
        {" "}
        <div className="mcq-question-container">
          <div>
            <Progress value={Number((19 * 100) / 30)} color="primary" />
            <span className="counter">
              Question <span>1 of 30</span>
            </span>
          </div>
        </div>
        <div className="mcq-question-container">
          <div className="mqc-question-item">
            <div className="mqc-question-item__count">1</div>
            <p>
              What is the name of your school What is the name of your school
              What is the name of your school What is the name of your school ?
              What is the name of your school What is the name of your school
              What is the name of your school What is the name of your school
              What is the name of your school What is the name of your school
              What is the name of your school What is the name of your school
            </p>
          </div>
        </div>
        <h6 className="mcq-question-label">Options</h6>
        <div className="mcq-question-container">
          <div className="mqc-question-item__options">
            <Radio label="its me" name="question" />
            <Radio label="its you" name="question" />
            <Radio label="its you" name="question" />
          </div>
        </div>
        <div className="mcq-question-container">
          <div className="mqc-question-buttons-c">
            <Button
              value="Previous"
              height="40px"
              bgColor="white"
              borderColor="#3b4b5c"
              textColor="#3b4b5c"
              width="150px"
            />
            <Button
              value="Next"
              height="40px"
              bgColor="#3b4b5c"
              borderColor="#3b4b5c"
              width="150px"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionsHome;
