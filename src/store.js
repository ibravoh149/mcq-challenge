import React, { createContext, useReducer } from "react";
import combineReducers from "react-combine-reducers";
import TestReducer from "./reducers/TestReducer";

export const initialState = {
  test: {
    requestingTestQuestions: false,
    questions: [],
    answers: [],
    score: null,
    requestingSubmit: false,
  },
};

export const Context = createContext(initialState);

export const Provider = ({ children }) => {
  const [rootReducerCombined, initialStateCombined] = combineReducers({
    Test: [TestReducer, initialState.test],
  });

  const [state, dispatch] = useReducer(
    rootReducerCombined,
    initialStateCombined
  );

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
