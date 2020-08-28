import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { onError } from '../libs/errorLib';

const INIT_NOTES_DB = [
  {
    title: 't1',
    content: 'sample note',
    created: 1487800950620,
    noteId: '1234',
  },
  {
    title: 'hello',
    content: 'second note',
    created: new Date(),
    noteId: '12345',
  },
];

export default function Notes() {
  const { id } = useParams();
  const history = useHistory();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    console.log('useEffect id=',id);
    async function onLoad() {
      try {
        const note = await loadNote();
        const { content } = note;

        setContent(content);
        setNote(note);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, []);

  function loadNote() {
    console.log('loadNote id=',id);
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    return delay(500).then(() => INIT_NOTES_DB.filter(note=>note.noteId===id)[0]);
  }

  function validateForm() {
    return content && content.length > 0;
  }

  function saveNote(note) {
    console.log('note=', note);
    return true;
  }
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await saveNote({
        content,
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
      {note && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              value={content}
              componentClass="textarea"
              onChange={(e) => setContent(e.target.value)}
            />
          </FormGroup>
          <Button block type="submit" bsSize="large" bsStyle="primary" disabled={!validateForm()}>
            Save
          </Button>
          <Button block bsSize="large" bsStyle="danger" onClick={handleDelete}>
            Delete
          </Button>
        </form>
      )}
    </div>
  );
}
