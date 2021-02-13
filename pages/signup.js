import Layout from '../components/Layout';
import { useEffect } from 'react';
import { getLocalStorage } from '../actions/auth';
import Router from 'next/router';
import SignupComponent from '../components/SingupComponent/SignupComponent';

const Signup = () => {
  useEffect(() => {
    const user = getLocalStorage('user');
    if (user) {
      Router.replace('/');
    }
  }, []);
  return (
    <Layout>
      <SignupComponent />
    </Layout>
  );
};
export default Signup;
