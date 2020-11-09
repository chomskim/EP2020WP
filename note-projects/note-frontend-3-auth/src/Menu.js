import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from "aws-amplify";
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useMainContext } from './libs/contextLib';

function Menu() {
  const { state, reducer } = useMainContext();
  const history = useHistory();

  async function handleSignout() {
    console.log('Click Signout');
    await Auth.signOut();

    reducer({ type: 'clear' });
    history.push('/');
  }

  return (
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
  );
}

export default Menu;
