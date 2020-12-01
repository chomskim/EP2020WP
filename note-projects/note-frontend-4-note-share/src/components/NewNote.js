import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from "aws-amplify";
//import { Button } from "react-bootstrap";
import { v4 } from "uuid";
import "./NewNote.css";
import { useMainContext } from "../libs/contextLib";
import LoaderButton from "./LoaderButton";
import { onError } from "../libs/errorLib";
import { CONSTANTS } from "../libs/constants";

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
    if (state.curRoom.roomId !== CONSTANTS.NO_ROOM) {
      newNote.roomId = state.curRoom.roomId;
    }
    
    try {
      const res = await createNote(newNote);
      reducer({ type: 'addNote', payload: newNote });
      console.log("handleSubmit res=", res);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
  function createNote(newNote) {
    return API.post("notes", "/notes", {
      body: newNote
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
