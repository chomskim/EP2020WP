import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useMainContext } from "../libs/contextLib";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { state, reducer } = useMainContext();
  const { pathname, search } = useLocation();
  return (
    <Route {...rest}>
      {state.auth.isAuthenticated ? children : <Redirect to={`/signin?redirect=${pathname}${search}`} />}
    </Route>
  );
}
