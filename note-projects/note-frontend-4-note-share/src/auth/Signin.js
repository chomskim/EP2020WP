import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useMainContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Signin.css";

export default function Signin() {
  const { state, reducer } = useMainContext();
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return values.email.length > 0 && values.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      //console.log("handleSubmit values=", values);
      const res = await Auth.signIn(values.email, values.password);
      //console.log("signIn res =", res);
      const auth = {
        isAuthenticated: true,
        userId: values.email,
      };
      //console.log("signin auth=", auth);
      reducer({ type: "setAuth", payload: auth });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className="Signin">
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl autoFocus type="email" value={values.email} onChange={handleChange("email")} />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" value={values.password} onChange={handleChange("password")} />
        </FormGroup>
        <Link to="/signin/reset">Forgot password?</Link>
        <LoaderButton
          className="btn btn-info btn-lg"
          block
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
          type="submit"
        >
          Signin
        </LoaderButton>
      </Form>
    </div>
  );
}
