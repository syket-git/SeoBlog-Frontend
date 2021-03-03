import { API } from '../config';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const token = Cookies.get('token');
console.log(token);

//Create Blog
export const createBlog = ({
  title,
  body,
  photo,
  categories,
  tags,
  setUploading,
  setSelectedTag,
  setSelectedCategory,
  setFeaturedImage,
  setBody,
  setTitle,
}) => async (dispatch) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('body', body);
  formData.append('photo', photo);
  formData.append('categories', categories);
  formData.append('tags', tags);
  if (token === undefined) {
    toast.error("Can't get Token. Please sign in again.");
    return;
  }
  try {
    setUploading(true);
    fetch(`${API}/blog`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setUploading(false);
          toast.error(json.error);
        } else if (json.message) {
          setUploading(false);
          toast.success(json.message);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('title');
            localStorage.removeItem('blog');
          }
          setBody('');
          setTitle('');
          setSelectedTag([]);
          setSelectedCategory([]);
          setFeaturedImage(null);
        }
      });
  } catch (error) {
    toast.error(error?.response?.body);
  }
};

//ListAllCategoriesAndTags

export const listAllCategoriesAndTags = () => {
  return fetch(`${API}/blogs-categories-tags`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
