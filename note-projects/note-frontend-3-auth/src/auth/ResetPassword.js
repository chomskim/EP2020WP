import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { HelpBlock, Form, FormGroup, Glyphicon, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../containers/LoaderButton";
import { onError } from "../libs/errorLib";
import "./ResetPassword.css";

export default function ResetPassword() {
  const [values, setValues] = useState({
    code: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  function validateCodeForm() {
    return values.email.length > 0;
  }

  function validateResetForm() {
    return values.code.length > 0 && values.password.length > 0 && values.password === values.confirmPassword;
  }

  async function handleSendCodeClick(event) {
    event.preventDefault();

    setIsSendingCode(true);

    try {
      await Auth.forgotPassword(values.email);
      setCodeSent(true);
    } catch (error) {
      onError(error);
      setIsSendingCode(false);
    }
  }

  async function handleConfirmClick(event) {
    event.preventDefault();

    setIsConfirming(true);

    try {
      await Auth.forgotPasswordSubmit(values.email, values.code, values.password);
      setConfirmed(true);
    } catch (error) {
      onError(error);
      setIsConfirming(false);
    }
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  function renderRequestCodeForm() {
    return (
      <Form onSubmit={handleSendCodeClick}>
        <FormGroup bsSize="large" controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl autoFocus type="email" value={values.email} onChange={handleChange} />
        </FormGroup>
        <LoaderButton block type="submit" bsSize="large" isLoading={isSendingCode} disabled={!validateCodeForm()}>
          Send Confirmation
        </LoaderButton>
      </Form>
    );
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmClick}>
        <FormGroup bsSize="large" controlId="code">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl autoFocus type="tel" value={values.code} onChange={handleChange} />
          <HelpBlock>Please check your email ({values.email}) for the confirmation code.</HelpBlock>
        </FormGroup>
        <hr />
        <FormGroup bsSize="large" controlId="password">
          <ControlLabel>New Password</ControlLabel>
          <FormControl type="password" value={values.password} onChange={handleChange} />
        </FormGroup>
        <FormGroup bsSize="large" controlId="confirmPassword">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl type="password" value={values.confirmPassword} onChange={handleChange} />
        </FormGroup>
        <LoaderButton block type="submit" bsSize="large" isLoading={isConfirming} disabled={!validateResetForm()}>
          Confirm
        </LoaderButton>
      </form>
    );
  }

  function renderSuccessMessage() {
    return (
      <div className="success">
        <Glyphicon glyph="ok" />
        <p>Your password has been reset.</p>
        <p>
          <Link to="/sign">Click here to login with your new credentials.</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="ResetPassword">
      {!codeSent ? renderRequestCodeForm() : !confirmed ? renderConfirmationForm() : renderSuccessMessage()}
    </div>
  );
}
