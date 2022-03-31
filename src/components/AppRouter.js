import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

function AppRouter({ isLoggedIn }) {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/">
          {isLoggedIn ? <Home /> : <Auth />}
        </Route> */}
        {isLoggedIn ? (
          <Route exact path="/" component={Home} />
        ) : (
          <Route exact path="/" component={Auth} />
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;
