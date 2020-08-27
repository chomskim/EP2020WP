import React, { useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import './Signin.css';

export default function Signin() {
  const history = useHistory();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  function validateForm() {
    return values.email.length > 0 && values.password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('email, password=', values.email, values.password);
    history.push("/");
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className="Signin">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl autoFocus type="email" value={values.email} onChange={handleChange('email')} />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl value={values.password} onChange={handleChange('password')} type="password" />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Signin
        </Button>
      </form>
    </div>
  );
}
