import React from "react";
import { Switch, Route } from "react-router-dom";
import { routesArray } from "./router";

const Routes: React.FunctionComponent = () => {
  return (
    <Switch>
      {routesArray.map((route) => (
        <Route
          key={route.name}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
};

export default Routes;
