import { useContext, createContext, useReducer } from 'react';

const INIT_NOTES_DB = [
  {
    noteId: '1234',
    title: 't1',
    content: 'sample note',
    created: 1487800950620,
    updated: new Date(),
  },
  {
    noteId: '12345',
    title: 'hello',
    content: 'second note',
    created: new Date(),
    updated: new Date(),
  },
];
const initState = {
  notes: INIT_NOTES_DB,
  auth: {
    isAuthenticated: false,
    userId: undefined,
  },
};

function mainReducer(state, action) {
  switch (action.type) {
    case 'setAuth':
      return { ...state, auth:action.payload };
    case 'setNotes':
      return { ...state, notes: action.payload };
    case 'addNote':
      const addedOrojects = [...state.notes, action.payload];
      return { ...state, notes: addedOrojects };
    case 'delNote':
      const filteredNotes = state.notes.filter(
        (note) => note.noteId !== action.payload.noteId
      );
      return { ...state, notes: filteredNotes };
    case 'updNote':
      const updatedNote = { ...action.payload };
      console.log('updatedNote=', updatedNote);
      const updatedNoteIndex = state.notes.findIndex(
        (proj) => proj.noteId === updatedNote.noteId
      );
      console.log('updatedNoteIndex=', updatedNoteIndex);
      const updatedNotes = [
        ...state.notes.slice(0, updatedNoteIndex),
        updatedNote,
        ...state.notes.slice(updatedNoteIndex + 1),
      ];
      return { ...state, notes: updatedNotes };
    default: // 'clear'
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