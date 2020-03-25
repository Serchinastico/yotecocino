import React from "react";
import WelcomeScreen from "feature/welcome/WelcomeScreen";
import SearchScreen from "feature/search/SearchScreen";
import FoodOfferScreen from "feature/food/FoodOfferScreen";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import SearchResultsScreen from "feature/search/SearchResultsScreen";
import { useQuery } from "foundation/router/UseQuery";
import "./index.scss";
import CreatedFoodOfferScreen from "./feature/food/CreatedFoodOfferScreen";
import ManageAllMyFoods from "./feature/food/ManageAllMyFoods";
import dayjs from "dayjs";
import { Service } from "foundation/types/Service";

const App: React.FC = () => {
  const parseLocation = (location: string) => {
    const parts = location.split(",");
    return {
      latitude: Number(parts[0]),
      longitude: Number(parts[1])
    };
  };

  const parseService = (service: string) => {
    switch (service.toLowerCase()) {
      case "lunch":
        return Service.lunch;
      case "dinner":
        return Service.dinner;
      default:
        return Service.lunch;
    }
  };

  const Routes = () => {
    const query = useQuery();

    return (
      <Switch>
        <Route path="/search/results">
          <SearchResultsScreen
            coordinates={parseLocation(query.get("location") ?? "0,0")}
            day={dayjs(query.get("day") ?? "").toDate()}
            service={parseService(query.get("service") ?? "")}
          />
        </Route>
        <Route exact path="/search">
          <SearchScreen />
        </Route>
        <Route exact path="/cook">
          <FoodOfferScreen />
        </Route>
        <Route exact path="/myFood">
          <ManageAllMyFoods />
        </Route>
        <Route exact path="/food/:foodId" component={CreatedFoodOfferScreen} />
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
