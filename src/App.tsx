import React from "react";
import WelcomeScreen from "feature/welcome/WelcomeScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <WelcomeScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
