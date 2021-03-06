import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import './NewNote.css';

export default function NewNote() {
  const history = useHistory();
  const [values, setValues] = useState({
    title: '',
    content: '',
  });

  function validateForm() {
    return values.title.length>0 || values.content.length > 0;
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    console.log('values=',values);
    history.push("/");
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
      <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Title</ControlLabel>
          <FormControl autoFocus value={values.title} onChange={handleChange('title')} />
        </FormGroup>
        <FormGroup controlId="content">
          <FormControl
            componentClass="textarea"
            value={values.content} onChange={handleChange('content')}
          />
        </FormGroup>
        <Button block type="submit" bsSize="large" bsStyle="primary" disabled={!validateForm()}>
          Create
        </Button>
      </form>
    </div>
  );
}
