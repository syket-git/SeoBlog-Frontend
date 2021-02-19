import { API } from '../config';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
const token = Cookies.get('token');

export const createBlog = (blog) => async (dispatch) => {
  try {
    fetch(`${API}/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          toast.error(json.error);
        } else if (json.message) {
          toast.success(json.message);
        }
      });
  } catch (error) {
    toast.error(error?.response?.body);
  }
};
