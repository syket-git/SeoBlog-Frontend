import { useState } from 'react';
import { SIGNIN } from './types';
import { API } from '../config';
import { toast } from 'react-toastify';
import Router from 'next/router';
import cookie from 'js-cookie';

export const signup = (user) => async (dispatch) => {
  try {
    fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          toast.error(json.error);
        } else if (json.message) {
          toast.success(json.message);
          setTimeout(() => {
            Router.push('/signin');
          }, [3000]);
        }
      });
  } catch (error) {
    console.log(error?.response?.body);
  }
};

//signin
export const signin = (user) => async (dispatch) => {
  try {
    fetch(`${API}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          toast.error(json.error);
        } else if (json.token) {
          setCookie('token', json.token);
          setLocalStorage('user', json.user);
          if (json.user) {
            Router.push('/');
          }
        }
      });
  } catch (error) {
    console.log(error?.response?.body);
  }
};

//signout

export const signout = () => {
  try {
    removeCookie('token');
    removeLocalStorage('user');
    fetch(`${API}/signout`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message) {
          Router.replace('/signin');
        }
      });
  } catch (error) {}
};

//set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

//get cookie
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

//remove cookie
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key);
  }
};

//setLocalStorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//getLocalStorage
export const getLocalStorage = (key) => {
  if (process.browser) {
    const userData = localStorage.getItem(key);
    return JSON.parse(userData);
  }
};
//removeLocalStorage
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};
