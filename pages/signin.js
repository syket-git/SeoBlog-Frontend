import { useEffect } from 'react';
import Layout from '../components/Layout';
import SigninComponent from '../components/SigninComponent/SigninComponent';
import { getLocalStorage } from '../actions/auth';
import Router from 'next/router';
const Signin = () => {
  useEffect(() => {
    const user = getLocalStorage('user');
    if (user) {
      Router.replace('/');
    }
  }, []);
  return (
    <Layout>
      <SigninComponent />
    </Layout>
  );
};
export default Signin;
