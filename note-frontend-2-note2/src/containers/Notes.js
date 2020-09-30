import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, ControlLabel, Form, FormGroup, FormControl } from "react-bootstrap";
import { useMainContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { delay } from "../libs/utilsLib";

export default function Notes() {
  const { state, reducer } = useMainContext();
  const { id } = useParams();
  const history = useHistory();
  const [note, setNote] = useState(null);
  const [values, setValues] = useState({
    title: "",
    content: "",
  });
  useEffect(() => {
    console.log("useEffect id=", id);
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const curNote = await loadNote();
      setNote(curNote);
      setValues({
        title: curNote.title,
        content: curNote.content,
      });
    } catch (e) {
      onError(e);
    }
  }

  function loadNote() {
    console.log("loadNote id=", id);
    return delay(500).then(() => state.notes.filter((note) => note.noteId === id)[0]);
  }

  function validateForm() {
    return values.title.length > 0 || values.content.length > 0;
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  function updateNote() {
    console.log("note=", note);
    const updNote = {
      noteId: note.noteId,
      title: values.title || note.title,
      content: values.content || note.content,
      created: note.created,
      updated: new Date(),
    };
    return delay(500).then(() => {
      console.log("updNote=", updNote);
      // update note
      setNote(updNote);
      reducer({ type: "updNote", payload: updNote });
      return updNote;
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("values=", values);
    const updNote = await updateNote();
    console.log("handleSubmit updNote=", updNote);
    history.push("/");
  }

  function deleteNote() {
    console.log("deleteNote note=", note);
    return delay(500).then(() => {
      // delete note
      reducer({ type: "delNote", payload: note });
      return true;
    });
  }
  async function handleDelete(event) {
    event.preventDefault();
    await deleteNote();
    history.push("/");
  }

  return (
    <div className="Notes">
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="title" bsSize="large">
          <ControlLabel>Title</ControlLabel>
          <FormControl autoFocus value={values.title} onChange={handleChange("title")} />
        </FormGroup>
        <FormGroup controlId="content">
          <FormControl componentClass="textarea" value={values.content} onChange={handleChange("content")} rows="8" />
        </FormGroup>
        <Button block type="submit" bsSize="large" bsStyle="primary" disabled={!validateForm()}>
          Save
        </Button>
        <Button block bsSize="large" bsStyle="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Form>
    </div>
  );
}
