import { API } from '../config';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import queryString from 'query-string';
const token = Cookies.get('token');

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

export const listAllBlogsCategoriesAndTags = (skip, limit) => {
  const data = {
    limit,
    skip,
  };
  return fetch(`${API}/blogs-categories-tags`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Single Blog

export const singleBlog = (slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Related Blog

export const RelatedBlogs = (blog) => {
  return fetch(`${API}/blogs/related`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//List all Blogs
export const listAllBlogs = () => {
  return fetch(`${API}/blogs`, {
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Remove Blogs

export const removeBlog = (slug, token) => {
  return fetch(`${API}/blog/${slug}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

// Update Blog

export const updateBlog = (formData, slug) => {
  console.log(slug);
  return fetch(`${API}/blog/${slug}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      toast.error(err?.response?.body);
    });
};

// Search Blog
export const searchBlog = (params) => {
  console.log('search params', params);
  const query = queryString.stringify(params);
  console.log('query params', query);
  return fetch(`${API}/blogs/search?${query}`, {
    method: 'GET',
    headers: {
      Accepts: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
