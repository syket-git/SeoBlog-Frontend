import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Link from 'next/link';
import { APP_NAME } from '../config.js';
import { signout, getCookie, getLocalStorage } from '../actions/auth';
import { useSelector } from 'react-redux';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const user = getLocalStorage('user');
  console.log(user);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Link href="/">
          <NavLink style={{ cursor: 'pointer' }} className="font-weight-bold">
            {APP_NAME}
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {user === null && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink style={{ cursor: 'pointer' }}>Sign in</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink style={{ cursor: 'pointer' }}>Sign up</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
            {user !== null && (
              <React.Fragment>
                <NavItem>
                  <Link href={`${user?.role === 1 ? '/admin' : '/user'}`}>
                    <NavLink style={{ cursor: 'pointer' }}>Dashboard</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <NavLink onClick={signout} style={{ cursor: 'pointer' }}>
                    Signout
                  </NavLink>
                </NavItem>
              </React.Fragment>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
