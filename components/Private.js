import React, { useEffect } from 'react';
import Router from 'next/router';
import { getLocalStorage } from '../actions/auth';

const Private = ({ children }) => {
  const user = getLocalStorage('user');
  useEffect(() => {
    if (user === null) {
      Router.push('/signin');
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};
export default Private;
