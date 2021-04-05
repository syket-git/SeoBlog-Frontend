import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { getPublicProfile } from '../../actions/user';
import { API, DOMAIN, APP_NAME, APP_ID } from '../../config';
import Link from 'next/link';
import Head from 'next/head';
import moment from 'moment';

const Username = ({ user, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {user.name} | {APP_NAME}
      </title>
      <meta name="description" content={`Blogs by ${user.name}`} />
      <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:description" content={user.name} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.username}`} />
      <meta
        property="og:image"
        content={`${DOMAIN}/static/image/seoblog.png`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/image/seoblog.png`}
      />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="fb:app_id" content={`${APP_ID}`} />
    </Head>
  );

  const showUserBlog = () => {
    return blogs.map((blog, i) => {
      return (
        <div className="mt-2 mb-2">
          <Link href={`/blogs/${blog.slug}`}>
            <a className="lead">{blog.title}</a>
          </Link>
        </div>
      );
    });
  };
  return (
    <React.Fragment>
      <Layout>
        {head()}
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5>{user.name}</h5>
                  <Link href={user.profile}>
                    <a className="text-primary">View profile</a>
                  </Link>
                  <p className="text-muted pt-2">
                    Joined {moment(user?.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-info p-2 text-white text-center">
                    Recent blogs
                  </h5>
                  <br />
                  {showUserBlog()}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-info p-2 text-white text-center">
                    Message
                  </h5>
                  <br />
                  <p>Contact form</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

//Server side data load

Username.getInitialProps = ({ query }) => {
  return getPublicProfile(query.username).then((data) => {
    if (data.error || !data) {
      console.log(data.error);
    } else {
      return { user: data.user, blogs: data.blogs, query };
    }
  });
};

export default Username;
