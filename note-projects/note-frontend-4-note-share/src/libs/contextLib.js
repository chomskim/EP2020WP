import { useContext, createContext, useReducer } from "react";
import { CONSTANTS } from "../libs/constants";

const INIT_NOTES_DB = [
  {
    email: "admin@example.com",
    noteId: "1234",
    title: "t1",
    content: "sample note",
    created: 1487800950620,
    updated: Date.now(),
  },
  {
    email: "admin@example.com",
    noteId: "12345",
    title: "hello",
    content: "second note",
    created: Date.now(),
    updated: Date.now(),
  },
];
const initState = {
  auth: {
    isAuthenticated: false,
    userId: undefined,
  },
  notes: [],
  rooms: [],
  curRoom: CONSTANTS.NO_ROOM,
};

function mainReducer(state, action) {
  switch (action.type) {
    case "setAuth":
      return { ...state, auth: action.payload };
    case "setRoomList":
      return { ...state, rooms: action.payload };
    case "addRoom":
      const addedRooms = [...state.rooms, action.payload];
      return { ...state, rooms: addedRooms };
    case "setCurRoom":
      return { ...state, curRoom: action.payload };
    case "setNotes":
      return { ...state, notes: action.payload };
    case "addNote":
      const addedOjects = [...state.notes, action.payload];
      return { ...state, notes: addedOjects };
    case "delNote":
      const filteredNotes = state.notes.filter((note) => note.noteId !== action.payload.noteId);
      return { ...state, notes: filteredNotes };
    case "updNote":
      const updatedNote = { ...action.payload };
      console.log("updatedNote=", updatedNote);
      const updatedNoteIndex = state.notes.findIndex((proj) => proj.noteId === updatedNote.noteId);
      console.log("updatedNoteIndex=", updatedNoteIndex);
      const updatedNotes = [
        ...state.notes.slice(0, updatedNoteIndex),
        updatedNote,
        ...state.notes.slice(updatedNoteIndex + 1),
      ];
      return { ...state, notes: updatedNotes };
    default:
      // 'clear'
      return initState;
  }
}
export const MainContext = createContext();

export function useMainReducer() {
  return useReducer(mainReducer, initState);
}

export function useMainContext() {
  return useContext(MainContext);
}
