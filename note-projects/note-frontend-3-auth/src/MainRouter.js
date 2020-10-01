import React from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import AuthenticatedRoute from "./auth/AuthenticatedRoute";
import UnauthenticatedRoute from "./auth/UnauthenticatedRoute";
import ResetPassword from "./auth/ResetPassword";

export default function MainRouter() {
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <UnauthenticatedRoute exact path="/signin">
          <Signin />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute exact path="/signin/reset">
          <ResetPassword />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute exact path="/signup">
          <Signup />
        </UnauthenticatedRoute>
        <AuthenticatedRoute exact path="/notes/new">
          <NewNote />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/notes/:id">
          <Notes />
        </AuthenticatedRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}
