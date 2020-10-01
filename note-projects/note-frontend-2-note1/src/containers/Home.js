import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";

const INIT_NOTES_DB = [
  {
    title: "t1",
    content: "sample note",
    created: 1487800950620,
    noteId: "1234",
  },
  {
    title: "hello",
    content: "second note",
    created: new Date(),
    noteId: "12345",
  },
];
export default function Home() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    if (!isAuthenticated) {
      return;
    }
    try {
      const notes = await loadNotes();
      console.log("notes=", notes);
      setNotes(notes);
    } catch (e) {
      onError(e);
    }
  }

  function loadNotes() {
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    return delay(500).then(() => INIT_NOTES_DB);
  }

  function renderNotesList(notes) {
    return notes.map((note, i) => (
      <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
        <ListGroupItem header={note.title} style={{ display: "flex" }}>
          {note.content.trim().split("\n")[0]}
          <span style={{ position: "absolute", right: 10 }}>
            {"Created: " + new Date(note.created).toISOString().substring(0, 10)}
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
          {renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  return <div className="Home">{isAuthenticated ? renderNotes() : renderSignin()}</div>;
}
