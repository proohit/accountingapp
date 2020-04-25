import React, { FunctionComponent, useState, useEffect } from "react";
import RecordView from "../../records/components/RecordView";
import { useHistory } from "react-router-dom";
import WalletView from "../../wallets/components/WalletView";
import Login from "../../authentication/components/Login";
import Dashboard from "../../dashboard/components/Dashboard";

export interface Route {
  name: string;
  path: string;
  params?: string;
  exact?: boolean;
  component: React.FunctionComponent<any> | React.ComponentClass<any, any>;
}
export const routesArray: Route[] = [
  { name: "Records", path: "/records", exact: true, component: RecordView },
  { name: "Wallets", path: "/wallets", exact: true, component: WalletView },
  { name: "Login", path: "/login", exact: true, component: Login },
  {
    name: "Dashboard",
    path: "/dashboard",
    component: Dashboard,
    params: "/:id",
  },
];

export const getRoute = (name: string): Route | undefined => {
  return routesArray.find((route) => route.name === name);
};

const getRouteByPath = (path: string): Route | undefined => {
  const foundRoute = routesArray.find((route) => path.includes(route.path));
  // const paramsInPath = path.split(foundRoute!.path).filter(a => a!=="");
  // console.log(paramsInPath.toString().split('/'));;
  const paramsInPath = path.split(foundRoute!.path);

  return foundRoute;
};

export const useRouter = () => {
  const history = useHistory();
  const [currentRoute, setCurrentRoute] = useState<Route | undefined>(getRouteByPath(history.location.pathname));

  const router = {
    navigateToRoute: (name: string, params?: any) => {
      let paramsString = "/";
      if (params) {
        Object.keys(params).forEach(
          (key) => (paramsString += params[key] + "/")
        );
      }
      const route = getRoute(name);
      const path = route?.path + paramsString;
      history.push(path);
      setCurrentRoute(route);
    },
    getCurrentRoute: () => {
      return currentRoute;
    },
    getRouteFrom: (name: string) => {
      return getRoute(name);
    },
    getLinkTo: (name: string, params?: any) => {
      let paramsString = "/";
      if (params) {
        Object.keys(params).forEach(
          (key) => (paramsString += params[key] + "/")
        );
      }
      const route = getRoute(name);
      const path = route?.path + paramsString;
      return path;
    },
  };

  return router;
};
