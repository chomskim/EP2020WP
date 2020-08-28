import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { useMainContext } from '../libs/contextLib';
import { onError } from '../libs/errorLib';

export default function Notes() {
  const { state, reducer } = useMainContext();
  const { id } = useParams();
  const history = useHistory();
  const [note, setNote] = useState(null);
  const [values, setValues] = useState({
    title: '',
    content: '',
  });
  useEffect(() => {
    console.log('useEffect id=', id);
    async function onLoad() {
      try {
        const note = await loadNote();
        const { content } = note;

        setNote(note);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, []);

  function loadNote() {
    console.log('loadNote id=', id);
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    return delay(500).then(() => state.notes.filter((note) => note.noteId === id)[0]);
  }

  function validateForm() {
    return values.title.length > 0 || values.content.length > 0;
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  function saveNote(note) {
    console.log('note=', note);
    return true;
  }
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await saveNote({
        title: values.title,
        content: values.content,
      });
      history.push('/');
    } catch (e) {
      onError(e);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();

    console.log('Clicked Delete Button');
    history.push('/');
  }

  return (
    <div className="Notes">
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
            rows="8"
          />
        </FormGroup>
        <Button block type="submit" bsSize="large" bsStyle="primary" disabled={!validateForm()}>
          Save
        </Button>
        <Button block bsSize="large" bsStyle="danger" onClick={handleDelete}>
          Delete
        </Button>
      </form>
    </div>
  );
}
