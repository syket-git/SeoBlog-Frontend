import React from 'react';
import moment from 'moment';
import renderHTML from 'react-render-html';
import Link from 'next/link';
import { API } from '../../config';

const SmallCard = ({ blog }) => {
  console.log(blog);
  return (
    <div>
      <div className="card" style={{ width: '18rem' }}>
        <Link href={`/blogs/${blog.slug}`}>
          <img
            style={{ width: '100%', height: '200px', cursor: 'pointer' }}
            className="card-img-top"
            src={`${API}/blog/photo/${blog.slug}`}
            alt={blog.title}
          />
        </Link>
        <div className="card-body">
          <Link href={`/blogs/${blog.slug}`}>
            <h5
              style={{ cursor: 'pointer' }}
              className="card-title text-primary"
            >
              {blog.title}
            </h5>
          </Link>
          <div className="card-text text-justify">
            {renderHTML(blog.excerpt)}
            <Link href={`/blogs/${blog.slug}`}>
              <a>Read more</a>
            </Link>
            <p className="font-italic pt-4 float-right">
              Posted {moment(blog.updatedAt).fromNow()} by{' '}
              <span className="text-capitalize text-primary">
                <Link href={`/`}>{blog?.postedBy?.name.split(' ')[0]}</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
