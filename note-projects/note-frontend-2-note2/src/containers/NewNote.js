import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { v4 } from 'uuid';
import './NewNote.css';
import { useMainContext } from '../libs/contextLib';
import { delay } from '../libs/utilsLib';

export default function NewNote() {
  const { state, reducer } = useMainContext();
  const history = useHistory();
  const [values, setValues] = useState({
    title: '',
    content: '',
  });

  function validateForm() {
    return values.title.length > 0 || values.content.length > 0;
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  function insertNote() {
    const newNote = {
      noteId: v4(),
      title: values.title,
      content: values.content,
      created: new Date(),
      updated: new Date(),
    };
    return delay(500).then(() => {
      console.log('newNote=', newNote);
      // insert note
      reducer({ type: 'addNote', payload: newNote });
      return newNote;
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    console.log('values=', values);
    const newNote = await insertNote();
    console.log('handleSubmit newNote=', newNote);
    history.push('/');
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="title" bsSize="large">
          <ControlLabel>Title</ControlLabel>
          <FormControl autoFocus value={values.title} onChange={handleChange('title')} />
        </FormGroup>
        <FormGroup controlId="content">
          <FormControl
            componentClass="textarea"
            value={values.content}
            onChange={handleChange('content')}
          />
        </FormGroup>
        <Button block type="submit" bsSize="large" bsStyle="primary" disabled={!validateForm()}>
          Create
        </Button>
      </form>
    </div>
  );
}
