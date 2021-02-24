import React from 'react';
import { useForm } from 'react-hook-form';
import { signin } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SigninComponent = ({ signin }) => {
  const { handleSubmit, register, errors } = useForm();
  const submit = (data) => {
    signin(data);
  };
  return (
    <div>
      <div className="container my-5">
        <h2 className="text-center">Sign in</h2>
        <form onSubmit={handleSubmit(submit)}>
          <input
            ref={register({ required: true })}
            type="email"
            placeholder="Type your email"
            name="email"
            className="form-control"
          />
          {errors.email && (
            <span style={{ color: 'red' }}>Email is required</span>
          )}
          <br />
          <input
            ref={register({ required: true })}
            type="password"
            placeholder="Type your password"
            name="password"
            className="form-control"
          />
          {errors.password && (
            <span style={{ color: 'red' }}>Password is required</span>
          )}
          <br />
          <button className="form-control btn btn-success" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

SigninComponent.prototype = {
  signin: PropTypes.func.isRequired,
};

export default connect(null, { signin })(SigninComponent);
