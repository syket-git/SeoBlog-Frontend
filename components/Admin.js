import React, { useEffect } from 'react';
import Router from 'next/router';
import { getLocalStorage } from '../actions/auth';

const Admin = ({ children }) => {
  const user = getLocalStorage('user');
  useEffect(() => {
    if (user === null) {
      Router.push('/signin');
    } else if (user.role !== 1) {
      Router.push('/');
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};
export default Admin;
