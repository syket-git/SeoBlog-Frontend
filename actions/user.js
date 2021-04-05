import { API } from '../config';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

//Token
const token = Cookies.get('token');

export const getPublicProfile = (username) => {
  return fetch(`${API}/user/${username}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then((res) => {
    return res.json();
  });
};
