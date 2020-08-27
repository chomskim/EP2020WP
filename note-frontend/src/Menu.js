import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Menu() {
  function handleSignout() {
    console.log('Click Signout');
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
          <LinkContainer to="/signup">
            <NavItem>Signup</NavItem>
          </LinkContainer>
          <LinkContainer to="/signin">
            <NavItem>Signin</NavItem>
          </LinkContainer>
          <NavItem onClick={handleSignout}>Signout</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
