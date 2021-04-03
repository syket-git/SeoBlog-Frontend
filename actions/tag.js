import { TAGS, TAG } from './types';
import { API } from '../config';
import { toast } from 'react-toastify';
import { getCookie } from './auth';

const token = getCookie('token');

//Create Category
export const createTag = (name) => async (dispatch) => {
  try {
    fetch(`${API}/tag`, {
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
export const tags = () => async (dispatch) => {
  try {
    fetch(`${API}/tags`, {
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
            type: TAGS,
            payload: json,
          });
        }
      });
  } catch (err) {
    toast.error(err?.response?.body);
  }
};

//Get single Tag
export const singleTag = (slug) => {
  return fetch(`${API}/tag/${slug}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.json();
  });
};

//Remove Tag
export const removeTag = (slug) => async (dispatch) => {
  try {
    fetch(`${API}/tag/${slug}`, {
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
