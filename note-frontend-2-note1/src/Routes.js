import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Signin from './containers/Signin';

export default function Routes() {
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
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}
