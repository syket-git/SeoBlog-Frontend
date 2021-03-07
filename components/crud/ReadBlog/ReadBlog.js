import { useEffect, useState } from 'react';
import { listAllBlogs, removeBlog } from '../../../actions/blog';
import { getCookie } from '../../../actions/auth';
import { toast } from 'react-toastify';
import renderHTML from 'react-render-html';
import moment from 'moment';

const ReadBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const token = getCookie('token');

  useEffect(() => {
    //call the all blogs function
    setAllBlogsInState();
  }, []);

  //set all blogs in state
  const setAllBlogsInState = () => {
    listAllBlogs().then((data) => {
      if (data.error) toast.error(data.error);
      else {
        setBlogs(data);
      }
    });
  };

  // implementing Delete Functionality

  const deleteBlog = (slug, token) => {
    removeBlog(slug, token).then((data) => {
      if (data.error) {
        setLoading(false);
        toast.error(data.error);
      } else {
        setLoading(false);
        toast.success(data.message);
        setAllBlogsInState();
      }
    });
  };

  //Delete Confirmation
  const confirmDelete = (slug) => {
    setSelectItem(slug);
    setLoading(true);
    const confirmation = window.confirm('Are you sure you want to delete');
    if (confirmation) {
      deleteBlog(slug, token);
    } else {
      setLoading(false);
    }
  };

  //show all blogs
  const showAllBlogs = () =>
    blogs.map((blog, i) => (
      <div key={i} className="col-md-12 mt-3 mb-3">
        <h4 className="font-weight-bold">{blog.title}</h4>
        <div className="mark pt-2 pb-2">
          <p
            style={{
              fontStyle: 'italic',
              paddingRight: '10px',
              borderRadius: '3px',
              width: 'fit-content',
            }}
            className="pb-0 mb-0 pl-2"
          >
            Written by{' '}
            <span className="text-capitalize">
              {blog?.postedBy?.name.split(' ')[0]}
            </span>{' '}
            | Published {moment(blog.updatedAt).fromNow()}
          </p>
        </div>
        <div className="pt-2 pb-2">{renderHTML(blog.excerpt)}</div>
        <div className="mt-2">
          <button
            onClick={() => confirmDelete(blog.slug)}
            className={`btn ${
              loading && selectItem === blog.slug
                ? 'btn-secondary'
                : 'btn-danger'
            }`}
          >
            {loading && selectItem === blog.slug ? (
              <span>Loading...</span>
            ) : (
              <span>Delete</span>
            )}
          </button>
        </div>
      </div>
    ));

  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        <div className="text-center mx-auto">
          <h3 className="font-weight-bold">All blogs</h3>
          <p className="text-muted">Select to any blog for update and delete</p>
        </div>
        {showAllBlogs()}
      </div>
    </div>
  );
};

export default ReadBlog;
