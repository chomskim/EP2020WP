import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppContext } from './libs/contextLib';

function Menu() {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();
  const history = useHistory();

  function handleSignout() {
    console.log('Click Signout');
    userHasAuthenticated(false);
    history.push('/Signin');
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
          {isAuthenticated ? (
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
