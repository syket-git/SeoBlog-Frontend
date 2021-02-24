import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { createBlog } from '../../../actions/blog';
import { useForm } from 'react-hook-form';
import { useSelector, connect } from 'react-redux';
import style from './CreateBlog.module.css';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

//Dynamically Import ReactQuill
const ReactQuil = dynamic(() => import('react-quill'), { ssr: false });
import '../../../node_modules/react-quill/dist/quill.snow.css';

const CreateBlog = ({ createBlog }) => {
  //Blog data get from localStorage
  const getBlogDataFromLS = () => {
    if (typeof window === 'undefined') return '';

    const data = localStorage.getItem('blog');

    if (data === null) {
      return '';
    } else if (data) {
      return data;
    }
  };

  //Blog title get from localStorage
  const getBlogTitleFromLS = () => {
    if (typeof window === 'undefined') return '';

    const title = localStorage.getItem('title');

    if (title === null) {
      return '';
    } else if (title) {
      return title;
    }
  };

  const category = useSelector((state) => state.category);
  const tag = useSelector((state) => state.tag);

  const [body, setBody] = useState(getBlogDataFromLS());
  const [title, setTitle] = useState(getBlogTitleFromLS());
  const [featuredImage, setFeaturedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { handleSubmit, errors, register, reset } = useForm();

  const submit = (data) => {
    if (selectedCategory.length <= 0) {
      toast.error('Please select at least one category');
    } else if (selectedTag.length <= 0) {
      toast.error('Please select at least one tag');
    } else {
      createBlog({
        title: title,
        body: body,
        photo: featuredImage !== null ? featuredImage : '',
        categories: selectedCategory,
        tags: selectedTag,
        setUploading,
        setFeaturedImage,
        setSelectedCategory,
        setSelectedTag,
        setBody,
        setTitle,
      });
    }
  };

  const handleBodyChange = (e) => {
    setBody(e);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', e);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    localStorage.setItem('title', e.target.value);
  };

  //Get Selected Category
  const handleCategory = (e) => () => {
    const checkedIndex = selectedCategory.indexOf(e);
    const all = [...selectedCategory];

    if (checkedIndex === -1) {
      all.push(e);
    } else {
      all.splice(checkedIndex, 1);
    }
  };

  //Get Selected Tag
  const handleTag = (e) => () => {
    const checkedIndex = selectedTag.indexOf(e);
    const all = [...selectedTag];

    if (checkedIndex === -1) {
      all.push(e);
    } else {
      all.splice(checkedIndex, 1);
    }
  };

  const createBlogForm = () => {
    return (
      <div className="row">
        <div className="col-md-9">
          <form onSubmit={handleSubmit(submit)}>
            <div className="form-group">
              <label htmlFor="title" className="text-muted">
                Title
              </label>
              <input
                ref={register({ required: true })}
                type="text"
                id="title"
                name="title"
                className="form-control"
                placeholder="Title"
                onChange={(e) => handleTitleChange(e)}
                value={title}
              />
              {errors.title && (
                <p className="text-danger pt-2">Title is required</p>
              )}
            </div>
            <div className="form-group">
              <ReactQuil
                modules={CreateBlog.modules}
                formats={CreateBlog.formats}
                value={body}
                onChange={(e) => handleBodyChange(e)}
                placeholder="Write something amazing..."
              />
              {errors.body && <p className="text-danger">Body is required</p>}
            </div>
            <div>
              {uploading ? (
                <button disabled className="btn btn-secondary">
                  Uploading...
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Publish
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="col-md-3 mt-4">
          <div>
            <h6>Featured Image</h6>
            <hr />
            <div className="mb-4">
              {featuredImage !== null && (
                <div className={style.showImageWrapper}>
                  <img
                    className={style.image}
                    src={URL.createObjectURL(featuredImage)}
                    alt=""
                  />
                </div>
              )}
              <p className="text-muted mb-1">Max size: 1mb</p>
              <label className="btn btn-outline-info">
                Upload featured image
                <input
                  onChange={(e) => setFeaturedImage(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
            <h6>Categories</h6>
            <hr />
            <div className={style.category}>
              {category?.loading
                ? 'Loading....'
                : category?.categories &&
                  category?.categories?.map((c, i) => (
                    <div key={i} className="form-check mb-2">
                      <input
                        onChange={handleCategory(c._id)}
                        className="form-check-input"
                        type="checkbox"
                        id={c.name}
                      />
                      <label className="form-check-label" htmlFor={c.name}>
                        {c.name}
                      </label>
                    </div>
                  ))}
            </div>
          </div>
          <div className="mt-3">
            <h6>Tags</h6>
            <hr />
            <div className={style.tag}>
              {tag?.loading
                ? 'Loading....'
                : tag?.tags &&
                  tag?.tags?.map((t, i) => (
                    <div key={i} className="form-check mb-2">
                      <input
                        onChange={handleTag(t._id)}
                        className="form-check-input"
                        type="checkbox"
                        id={i}
                      />
                      <label className="form-check-label" htmlFor={i}>
                        {t.name}
                      </label>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div className="container my-5">{createBlogForm()}</div>;
};

CreateBlog.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block'],
  ],
};

CreateBlog.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block',
];

CreateBlog.prototype = {
  createBlog: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { createBlog })(CreateBlog));
