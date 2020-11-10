import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useMainContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { delay } from "../libs/utilsLib";
import "./Home.css";

export default function Home() {
  const { state, reducer } = useMainContext();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    if (!state.auth.isAuthenticated) {
      return;
    }
    try {
      const notes = await loadNotes();
      console.log("notes=", notes);
      setNotes(notes);
    } catch (e) {
      onError(e);
    }
    setIsLoading(false);
  }

  function loadNotes() {
    return delay(500).then(() => state.notes);
  }

  function renderNotesList(notes) {
    return notes.map((note, i) => (
      <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
        <ListGroupItem header={note.title} style={{ display: "flex" }}>
          {note.content && note.content.trim().split("\n")[0]}
          <span style={{ position: "absolute", right: 180 }}>
            {"Created: " + new Date(note.created).toISOString().substring(0, 10)}
          </span>
          <span style={{ position: "absolute", right: 10 }}>
            {"Updated: " + new Date(note.updated).toISOString().substring(0, 10)}
          </span>
        </ListGroupItem>
      </LinkContainer>
    ));
  }

  function renderSignin() {
    return (
      <div className="signin">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
        <div>
          <Link to="/signin" className="btn btn-info btn-lg">
            Signin
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          <LinkContainer key="new" to="/notes/new">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new note
              </h4>
            </ListGroupItem>
          </LinkContainer>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  return <div className="Home">{state.auth.isAuthenticated ? renderNotes() : renderSignin()}</div>;
}
