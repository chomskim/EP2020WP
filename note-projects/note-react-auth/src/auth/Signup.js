import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { HelpBlock, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../containers/LoaderButton";
import { useMainContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Signup.css";

export default function Signup() {
  const { state, reducer } = useMainContext();
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return values.email.length > 0 && values.password.length > 0 && values.password === values.confirmPassword;
  }

  function validateConfirmationForm() {
    return values.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const nuser = await Auth.signUp({
        username: values.email,
        password: values.password,
      });
      console.log("NewUser=", nuser);
      setIsLoading(false);
      setNewUser(nuser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(values.email, values.confirmationCode);
      await Auth.signIn(values.email, values.password);
      console.log("email, password=", values.email, values.password);
      const auth = {
        isAuthenticated: true,
        userId: values.email,
      };
      console.log("signin auth=", auth);
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

  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            onChange={handleChange("confirmationCode")}
            value={values.confirmationCode}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton block type="submit" bsSize="large" isLoading={isLoading} disabled={!validateConfirmationForm()}>
          Verify
        </LoaderButton>
      </Form>
    );
  }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl autoFocus type="email" value={values.email} onChange={handleChange("email")} />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" value={values.password} onChange={handleChange("password")} />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl type="password" onChange={handleChange("confirmPassword")} value={values.confirmPassword} />
        </FormGroup>
        <LoaderButton block bsSize="large" isLoading={isLoading} disabled={!validateForm()} type="submit">
          Signup
        </LoaderButton>
      </Form>
    );
  }

  return <div className="Signup">{newUser === null ? renderForm() : renderConfirmationForm()}</div>;
}
