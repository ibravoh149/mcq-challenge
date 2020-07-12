import axios from "axios";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { GET_QUESTIONS, SET_ANSWER, CALCULATE_SCORE } from "../actions";
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

export const submitTest = (dispatch, payload) => {
  dispatch(asyncActions(CALCULATE_SCORE).loading(true));
  let finalScore = 0;
  const { questions, answers } = payload;

  // if (questions.length !== answers.length) {
  //   return;
  // }
  // for (let i = 0; i > answers.length; i++) {
  //   if (answers[i] === questions[i]) {
  //     if (answers[i].answer === questions[i].correct_answer) {
  //       score++;
  //     }
  //   }
  // }

  const calc = (questions, answers) => {
    let score = 0;
    for (let question in questions) {
      for (let answer in answers) {
        if (questions[question].id === answers[answer].id) {
          if (questions[question].correct_answer === answers[answer].answer) {
            score++;
          }
        }
      }
    }
    return score;
  };

  setTimeout(() => {
    finalScore = calc(questions, answers);
    localStorage.c = true;
    localStorage.d = moment(Date.now()).add(0, "m").valueOf();
    const event = new Event("completed");
    document.dispatchEvent(event);
    // localStorage.s= false
    dispatch(asyncActions(CALCULATE_SCORE).success(finalScore));
    dispatch(asyncActions(CALCULATE_SCORE).loading(false));
  }, 2000);
};
