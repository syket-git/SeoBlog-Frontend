import { CATEGORIES, CATEGORY } from './types';
import { API } from '../config';
import { toast } from 'react-toastify';
import { getCookie } from './auth';

const token = getCookie('token');

//Create Category
export const postCategory = (name) => async (dispatch) => {
  try {
    fetch(`${API}/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(name),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          toast.error(json.error);
        } else if (json.message) {
          toast.success(json.message);
        }
      });
  } catch (err) {
    toast.error(err?.response?.body);
  }
};

//Get all Categories
export const categories = () => async (dispatch) => {
  try {
    fetch(`${API}/categories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          toast.error(json.error);
        } else {
          dispatch({
            type: CATEGORIES,
            payload: json,
          });
        }
      });
  } catch (err) {
    toast.error(err?.response?.body);
  }
};

//Get single Category
export const singleCategory = (slug) => {
  return fetch(`${API}/category/${slug}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.json();
  });
};

//Remove Category
export const removeCategory = (slug) => async (dispatch) => {
  try {
    fetch(`${API}/category/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          toast.error(json.error);
        } else if (json.message) {
          toast.success(json.message);
        }
      });
  } catch (err) {
    toast.error(err?.response?.body);
  }
};
