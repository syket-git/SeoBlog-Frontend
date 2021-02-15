import React from 'react';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <ToastContainer position="top-center" autoClose={2000} />
      <Header />
      {children}
    </React.Fragment>
  );
};
export default Layout;
