import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import { Button } from "react-bootstrap";
import { v4 } from "uuid";
import "./NewNote.css";
import { useMainContext } from "../libs/contextLib";
import { delay } from "../libs/utilsLib";
import LoaderButton from "./LoaderButton";
import { onError } from "../libs/errorLib";

export default function NewNote() {
  const { state, reducer } = useMainContext();
  const history = useHistory();
  const [values, setValues] = useState({
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return values.title.length > 0 || values.content.length > 0;
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("values=", values);

    setIsLoading(true);
    const newNote = {
      email: state.auth.userId,
      noteId: v4(),
      title: values.title,
      content: values.content,
      created: Date.now(),
      updated: Date.now(),
    };

    try {
      const res = await createNote(newNote);
      console.log("handleSubmit res=", newNote);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
  function createNote(newNote) {
    return delay(500).then(() => {
      console.log("newNote=", newNote);
      // insert note
      reducer({ type: "addNote", payload: newNote });
      return newNote;
    });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="title" bsSize="large">
          <ControlLabel>Title</ControlLabel>
          <FormControl autoFocus value={values.title} onChange={handleChange("title")} />
        </FormGroup>
        <FormGroup controlId="content">
          <FormControl componentClass="textarea" value={values.content} onChange={handleChange("content")} />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}
