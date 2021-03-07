import React from 'react';
import moment from 'moment';
import renderHTML from 'react-render-html';
import Link from 'next/link';
import { API } from '../../config';

const SmallCard = ({ blog }) => {
  const text = renderHTML(blog.excerpt);
  let finalText = text.props.children[0];
  if (finalText?.length >= 100) {
    finalText = finalText.substr(0, 100) + '...';
  }

  return (
    <div>
      <div
        className="card"
        style={{ width: '18rem', minHeight: '500px', maxHeight: '600px' }}
      >
        <Link href={`/blogs/${blog.slug}`}>
          <img
            style={{ width: '100%', height: '200px', cursor: 'pointer' }}
            className="card-img-top"
            src={`${API}/blog/photo/${blog.slug}`}
            alt={blog.title}
          />
        </Link>
        <div className="card-body d-flex flex-column">
          <Link href={`/blogs/${blog.slug}`}>
            <h5
              style={{ cursor: 'pointer' }}
              className="card-title text-primary"
            >
              {blog.title}
            </h5>
          </Link>
          <div style={{ flex: '1' }} className="card-text text-justify">
            {finalText}
            <Link href={`/blogs/${blog.slug}`}>
              <a>Read more</a>
            </Link>
          </div>
          <p className="font-italic pt-4 pb-0 mb-0 text-right">
            Posted {moment(blog.updatedAt).fromNow()} by{' '}
            <span className="text-capitalize text-primary">
              <Link href={`/`}>{blog?.postedBy?.name.split(' ')[0]}</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
