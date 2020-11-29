import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import AuthenticatedRoute from "./auth/AuthenticatedRoute";
import UnauthenticatedRoute from "./auth/UnauthenticatedRoute";
import ResetPassword from "./auth/ResetPassword";
import CreateRoom from "./components/CreateRoom";
import UpdateRoom from "./components/UpdateRoom";

export default function MainRouter() {
  return (
    <>
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
        <AuthenticatedRoute exact path="/room/new">
          <CreateRoom />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/room/:id">
          <UpdateRoom />
        </AuthenticatedRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}
