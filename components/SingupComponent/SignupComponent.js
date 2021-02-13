import React from 'react';
import { useForm } from 'react-hook-form';
import Style from './SignupComponent.module.css';
import { signup } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SignupComponent = ({ signup }) => {
  const { handleSubmit, register, errors } = useForm();
  const submit = (data) => {
    signup(data);
  };
  return (
    <div>
      <div className="container my-5">
        <h2 className="text-center">Sign up</h2>
        <form onSubmit={handleSubmit(submit)}>
          <input
            ref={register({ required: true })}
            type="text"
            placeholder="Type your name"
            name="name"
            className="form-control"
          />
          {errors.name && <span className={Style.error}>Name is required</span>}
          <br />
          <input
            ref={register({ required: true })}
            type="email"
            placeholder="Type your email"
            name="email"
            className="form-control"
          />
          {errors.email && (
            <span className={Style.error}>Email is required</span>
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
            <span className={Style.error}>Password is required</span>
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

SignupComponent.prototype = {
  signup: PropTypes.func.isRequired,
};

export default connect(null, { signup })(SignupComponent);
