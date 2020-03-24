import React from "react";
import WelcomeScreen from "feature/welcome/WelcomeScreen";
import SearchScreen from "feature/search/SearchScreen";
import CookOfferScreen from "feature/cook/CookOfferScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchResultsScreen from "feature/search/SearchResultsScreen";
import { useQuery } from "foundation/router/UseQuery";
import "./index.scss";

const App: React.FC = () => {
  const parseLocation = (location: string) => {
    const parts = location.split(",");
    return {
      latitude: Number(parts[0]),
      longitude: Number(parts[1])
    };
  };

  const Routes = () => {
    const query = useQuery();

    return (
      <Switch>
        <Route path="/search/results">
          <SearchResultsScreen
            coordinates={parseLocation(query.get("location") ?? "0,0")}
            day={query.get("day") ?? ""}
            service={query.get("service") ?? "lunch"}
          />
        </Route>
        <Route exact path="/search">
          <SearchScreen />
        </Route>
          <Route exact path="/cook">
              <CookOfferScreen />
          </Route>
        <Route path="/">
          <WelcomeScreen />
        </Route>
      </Switch>
    );
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
