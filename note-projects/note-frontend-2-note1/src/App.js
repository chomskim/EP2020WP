import React, { useState } from 'react';
import './App.css';
import MainRoutes from './MainRoutes';
import { AppContext } from './libs/contextLib';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  return (
    <div className="App container">
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <MainRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
