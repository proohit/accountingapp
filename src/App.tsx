import { makeStyles, Snackbar, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./navigation/components/NavBar";
import { Alert } from "./shared/alert/AlertModel";
import { TypedAlert } from "./shared/alert/TypedAlert";
import { DataComponentProps } from "./shared/BaseProps";
import AuthenticationProvider from "./shared/context/AuthenticationProvider";
import Routes from "./shared/routes/Routes";

const useAppStyles = makeStyles((theme: Theme) => ({
  content: {
    padding: theme.spacing(4),
  },
}));

const App: React.FunctionComponent<{}> = (props) => {
  const [alert, setAlert] = useState<Alert | null>();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [header, setHeader] = useState<string>("Dashboard");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const classes = useAppStyles();

  const functionSet: DataComponentProps["functionSet"] = {
    changeHeader: (header: string) => setHeader(header),
    openAlert: (alert: Alert) => {
      setAlert(alert);
      setOpenAlert(true);
    },
    toggleLoading: (loading: boolean) => setIsLoading(loading),
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };

  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <nav>
          <div data-testid="navbar">
            <NavBar title={header} functionSet={functionSet}></NavBar>
          </div>
        </nav>
        <div className={classes.content}>
          <Routes />
        </div>
      </BrowserRouter>
      {isLoading && undefined}
      <Snackbar
        data-testid="snackbar"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={4000}
        onClose={closeAlert}
        open={openAlert}
      >
        {alert ? <TypedAlert alert={alert} /> : null}
      </Snackbar>
    </AuthenticationProvider>
  );
};

export default App;
