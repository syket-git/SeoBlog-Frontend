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
import NProgress from 'nprogress';
import Router from 'next/router';
import '../node_modules/nprogress/nprogress.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const user = getLocalStorage('user');

  Router.onRouteChangeStart = (url) => NProgress.start();
  Router.onRouteChangeComplete = (url) => NProgress.done();
  Router.onRouteChangeError = (url) => NProgress.start();

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
