import React, { useState, useEffect }from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from "aws-amplify";
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useMainContext } from './libs/contextLib';

function Menu() {
  const { state, reducer } = useMainContext();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const res = await Auth.currentSession();
      console.log('currentSession res =',res);
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleSignout() {
    console.log('Click Signout');
    await Auth.signOut();
    userHasAuthenticated(false);

    reducer({ type: 'clear' });
    history.push('/signin');
  }

  return (
    !isAuthenticating && (
    <Navbar fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Scratch</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          {state.auth.isAuthenticated ? (
            <NavItem onClick={handleSignout}>Signout</NavItem>
          ) : (
            <>
              <LinkContainer to="/signup">
                <NavItem>Signup</NavItem>
              </LinkContainer>
              <LinkContainer to="/signin">
                <NavItem>Signin</NavItem>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  ));
}

export default Menu;
