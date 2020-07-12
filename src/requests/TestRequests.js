import React, { useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GET_QUESTIONS,
  SUBMIT_TEST,
  SET_ANSWER,
  CALCULATE_SCORE,
} from "../actions";
import { asyncActions } from "../utils/AsyncUtils";
import { TestUrl } from "../constants";
import shortid from "shortid";

const shuffle = (arr) => {
  if (arr.length === 1) {
    return arr;
  }
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand], ...shuffle(arr.filter((_, i) => i != rand))];
};

const formatQuestions = (questions = []) => {
  if (!questions || questions.length === 0) {
    return [];
  }
  const formatted = questions.map((q) => {
    return {
      id: shortid.generate(),
      question: q.question,
      options: shuffle([...q.incorrect_answers, q.correct_answer]),
      correct_answer: q.correct_answer,
    };
  });
  return formatted;
};

export const getQuestions = (dispatch) => {
  dispatch(asyncActions(GET_QUESTIONS).loading(true));
  return axios
    .get(`${TestUrl.GET_QUESTIONS}`)
    .then((response) => {
      if (response.status === 200) {
        // console.log(response.data);

        dispatch(
          asyncActions(GET_QUESTIONS).success(
            formatQuestions(response.data.results)
          )
        );
        dispatch(asyncActions(GET_QUESTIONS).loading(false));
      }
      return response;
    })
    .catch((error) =>
      dispatch(asyncActions(GET_QUESTIONS).failure(true, error))
    );
};

export const setAnswers = (dispatch, payload) => {
  dispatch(asyncActions(SET_ANSWER).success(payload));
};

export const calculateScore = (dispatch, payload) => {
  const score = 0;
  const { questions, answers } = payload;

  console.log(questions);
  console.log(answers);
  dispatch(asyncActions(CALCULATE_SCORE).success(score));
};
