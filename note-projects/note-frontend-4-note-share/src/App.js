import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import "./App.css";
import Menu from "./Menu";
import MainRouter from "./MainRouter";
import { MainContext, useMainReducer } from "./libs/contextLib";

function App() {
  const [state, reducer] = useMainReducer();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      //console.log("App onLoad ");
      const res = await Auth.currentSession();
      //console.log('currentSession res =',res);
      if (res) {
        const email = res.idToken.payload.email;
        const auth = {
          isAuthenticated: true,
          userId: email,
        };
        reducer({ type: "setAuth", payload: auth });  
      }
    } catch (e) {
      //console.log('currentSession error =',e);
      if (e !== "No current user") {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }


  return (
    !isAuthenticating && (
    <div className="App container">
      <MainContext.Provider value={{ state, reducer }}>
        <Menu />
        <MainRouter />
      </MainContext.Provider>
    </div>
  ));
}

export default App;
