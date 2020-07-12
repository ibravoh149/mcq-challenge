import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.scss";
import { Provider } from "./store";
import PrivateRoute from "./PrivateRoute";
import ErrorBoundary from "./utils/Services/ErrorBoundary";
import NetworkService from "./utils/Services/NetworkService";
import { toast } from "react-toastify";
import { isLoggedIn } from "./utils/isLoggedIn";
import QuestionsHome from "./Pages/QuestionsHome/QuestionsHome";

toast.configure({ hideProgressBar: true });

function App() {
  return (
    <Provider>
      <ErrorBoundary>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={QuestionsHome} />

              {/* <Route
                exact
                path="/"
                component={isLoggedIn() ? HomePage : Login}
              /> */}

              {/* <PrivateRoute
                exact
                path="/test"
                component={QuestionsHome}
              /> */}
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
      </ErrorBoundary>
    </Provider>
  );
}

export default NetworkService(App);
