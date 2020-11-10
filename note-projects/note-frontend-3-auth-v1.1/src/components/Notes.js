import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, ControlLabel, Form, FormGroup, FormControl } from "react-bootstrap";
import { useMainContext } from "../libs/contextLib";
import LoaderButton from "./LoaderButton";
import { onError } from "../libs/errorLib";
import { delay } from "../libs/utilsLib";

export default function Notes() {
  const { state, reducer } = useMainContext();
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
      const curNote = await loadNote(id);
      setNote(curNote);
      setValues({
        title: curNote.title,
        content: curNote.content,
      });
    } catch (e) {
      onError(e);
    }
  }

  function loadNote(id) {
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
      email: note.email,
      noteId: note.noteId,
      title: values.title || note.title,
      content: values.content || note.content,
      created: note.created,
      updated: Date.now(),
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
    setIsLoading(true);

    try {
      const updNote = await updateNote();
      console.log("handleSubmit updNote=", updNote);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
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

    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteNote();
      history.push("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
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
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Save
        </LoaderButton>
        <LoaderButton block bsSize="large" bsStyle="danger" onClick={handleDelete}>
          Delete
        </LoaderButton>
      </Form>
    </div>
  );
}
