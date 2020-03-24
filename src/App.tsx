import React from "react";
import WelcomeScreen from "feature/welcome/WelcomeScreen";
import SearchScreen from "feature/search/SearchScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchResultsScreen from "feature/search/SearchResultsScreen";
import { useQuery } from "foundation/router/UseQuery";
import "./index.scss";
import WorkInProgressScreen from "feature/wip/WorkInProgressScreen";

const App: React.FC = () => {
  const parseLocation = (location: string) => {
    const parts = location.split(",");
    return {
      latitude: Number(parts[0]),
      longitude: Number(parts[1])
    };
  };

  const Routes = () => {
    return <WorkInProgressScreen />;
  };

  return (
    <div>
      <Router>
        <Routes />
      </Router>
    </div>
  );
};

export default App;
