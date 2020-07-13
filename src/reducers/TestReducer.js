import { asyncActionName } from "../utils/AsyncUtils";
import {
  GET_QUESTIONS,
  SET_ANSWER,
  CALCULATE_SCORE,
  CLEAR_ANSWERS,
} from "../actions";
import { initialState } from "../store";

const setAnswer = (previousState, payload) => {
  const answers = [...previousState];
  const index = answers.findIndex((answer) => answer.id === payload.id);
  if (index >= 0) {
    answers[index] = payload;
    // console.log( answers[index]);
  } else {
    answers.push(payload);
  }

  return answers;
};

const TestReducer = (state = initialState.test, action) => {
  switch (action.type) {
    case asyncActionName(GET_QUESTIONS).loading:
      return { ...state, requestingTestQuestions: action.payload };
    case asyncActionName(GET_QUESTIONS).success:
      return {
        ...state,
        questions: action.payload,
      };
    case asyncActionName(GET_QUESTIONS).failure:
      return {
        ...state,
        errorRequestingTestQuestiond: action.payload.status,
      };

    case asyncActionName(SET_ANSWER).success:
      return { ...state, answers: setAnswer(state.answers, action.payload) };
    case asyncActionName(CALCULATE_SCORE).success:
      return { ...state, score: action.payload };
    case asyncActionName(CALCULATE_SCORE).loading:
      return { ...state, requestingSubmit: action.payload };

    case asyncActionName(CLEAR_ANSWERS).success:
      return { ...state, answers: action.payload, score: 0 };
    default:
      return state;
  }
};

export default TestReducer;
