import React from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Signin from "./containers/Signin";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";

export default function MainRoutes() {
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/notes/new">
          <NewNote />
        </Route>
        <Route exact path="/notes/:id">
          <Notes />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}
