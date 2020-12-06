import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { ControlLabel, Form, FormGroup, FormControl } from "react-bootstrap";
import { useMainContext } from "../libs/contextLib";
import LoaderButton from "./LoaderButton";
import { onError } from "../libs/errorLib";
//import { CONSTANTS } from "../libs/constants";

import "./Notes.css";

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
    /*
    if (state.curRoom.owner === state.auth.userId) {
      return API.get("notes", `/notes/${id}`);
    } else {
      const selNotes = state.notes.filter((note) => note.noteId === id);
      console.log("loadNote selNotes=", selNotes);
      return selNotes[0];
    }
    */
   const selNotes = state.notes.filter((note) => note.noteId === id);
   console.log("loadNote selNotes=", selNotes);
   return selNotes[0];
  }

  function validateForm() {
    return (note && note.email === state.auth.userId) && (values.title.length > 0 || values.content.length > 0);
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  function updateNote(note) {
    //console.log("note=", note);
    const updNote = {
      email: note.email,
      noteId: note.noteId,
      title: values.title || note.title,
      content: values.content || note.content,
      created: note.created,
      updated: Date.now(),
    };
    console.log("note=", updNote);
    const updatedNoteIndex = state.notes.findIndex((proj) => proj.noteId === updNote.noteId);
    const updatedNotes = [
      ...state.notes.slice(0, updatedNoteIndex),
      updNote,
      ...state.notes.slice(updatedNoteIndex + 1),
    ];
    reducer({ type: 'setNotes', payload: updatedNotes });

    return API.put("notes", `/notes/${id}`, {
      body: updNote,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("values=", values);
    setIsLoading(true);

    try {
      const updNote = await updateNote(note);
      console.log("handleSubmit updNote=", updNote);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function deleteNote() {
    const filteredNotes = state.notes.filter((note) => note.noteId !== id);
    reducer({ type: 'setNotes', payload: filteredNotes });

    console.log("deleteNote id=", id);
    return API.del("notes", `/notes/${id}`);
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
        <LoaderButton
          block
          bsSize="large"
          bsStyle="danger"
          onClick={handleDelete}
          disabled={note && note.email !== state.auth.userId}
        >
          Delete
        </LoaderButton>
      </Form>
    </div>
  );
}
