import Link from 'next/link';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { singleBlog, updateBlog } from '../../../actions/blog';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import style from '../CreateBlog/CreateBlog.module.css';
import { API } from '../../../config';

//Dynamically Import ReactQuill
const ReactQuil = dynamic(() => import('react-quill'), { ssr: false });
import '../../../node_modules/react-quill/dist/quill.snow.css';

const UpdateBlog = ({ router }) => {
  const [blog, setBlog] = useState({});
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [uploading, setUploading] = useState(false);

  const category = useSelector((state) => state.category);
  const tag = useSelector((state) => state.tag);

  const { handleSubmit, errors, register, reset } = useForm();

  useEffect(() => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          toast(data.error);
        } else {
          setTitle(data.title);
          setBody(data.body);
          setUpdatedCategory(data.categories);
          setUpdatedTag(data.tags);
        }
      });
    }
  }, [router]);

  const submit = (data) => {
    if (selectedCategory.length <= 0) {
      toast.error('Please select at least one category');
    } else if (selectedTag.length <= 0) {
      toast.error('Please select at least one tag');
    } else {
      //Form Data
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      featuredImage !== null && formData.append('photo', featuredImage);
      formData.append('categories', selectedCategory);
      formData.append('tags', selectedTag);
      updateBlog(formData, router.query.slug).then((data) => {
        console.log(data);
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success('Post updated successfully');
        }
      });
    }
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
    setSelectedCategory(all);
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
    setSelectedTag(all);
  };

  const setUpdatedCategory = (blogCategories) => {
    let categories = [];
    blogCategories.map((ca) => {
      categories.push(ca._id);
    });
    setSelectedCategory(categories);
  };
  const setUpdatedTag = (blogTags) => {
    let tags = [];
    blogTags.map((ta) => {
      tags.push(ta._id);
    });
    setSelectedTag(tags);
  };

  const findOutCategory = (c) => {
    const result = selectedCategory.indexOf(c);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };
  const findOutTag = (t) => {
    const result = selectedTag.indexOf(t);
    if (result !== -1) {
      return true;
    } else {
      return false;
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
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              {errors.title && (
                <p className="text-danger pt-2">Title is required</p>
              )}
            </div>
            <div className="form-group">
              <ReactQuil
                modules={UpdateBlog.modules}
                formats={UpdateBlog.formats}
                value={body}
                onChange={(e) => setBody(e)}
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
                  Update blog
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
              <div
                style={{
                  width: '250px',
                  height: '250px',
                  overflow: 'hidden',
                }}
              >
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  src={
                    featuredImage === null
                      ? `${API}/blog/photo/${router.query.slug}`
                      : URL.createObjectURL(featuredImage)
                  }
                  alt=""
                />
              </div>

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
                        checked={findOutCategory(c._id)}
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
                        checked={findOutTag(t._id)}
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

UpdateBlog.modules = {
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

UpdateBlog.formats = [
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

export default withRouter(UpdateBlog);
