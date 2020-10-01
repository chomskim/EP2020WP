import React, { useState } from 'react';
import './App.css';
import MainRouter from './MainRouter';
import { MainContext, useMainReducer } from './libs/contextLib';

function App() {
  const [state, reducer] = useMainReducer();
  return (
    <div className="App container">
      <MainContext.Provider value={{ state, reducer }}>
        <MainRouter />
      </MainContext.Provider>
    </div>
  );
}

export default App;
