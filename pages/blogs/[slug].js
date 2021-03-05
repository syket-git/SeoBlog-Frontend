import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { singleBlog, RelatedBlogs } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, APP_ID } from '../../config';
import { withRouter } from 'next/router';
import moment from 'moment';
import renderHTML from 'react-render-html';
import SmallCard from '../../components/blog/SmallCard';
import { toast } from 'react-toastify';

const SingleBlog = ({ blog }) => {
  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${blog.slug}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${blog.slug}`} />
      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="fb:app_id" content={`${APP_ID}`} />
    </Head>
  );

  //State
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const showRelatedBlogs = () => {
    RelatedBlogs({ blog }).then((data) => {
      if (data?.error) {
        toast.error(data.error);
      } else {
        setRelatedBlogs(data);
      }
    });
  };

  useEffect(() => {
    showRelatedBlogs();
  }, [blog]);

  const showCategories = (blog) => {
    return blog?.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.name}`}>
        <a className="btn btn-info btn-sm ml-1 mr-1 mt-3">{c.name}</a>
      </Link>
    ));
  };
  const showTags = (blog) => {
    return blog?.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.name}`}>
        <a title="Tags" className="btn btn-outline-info btn-sm ml-1 mr-1 mt-3">
          {t.name}
        </a>
      </Link>
    ));
  };

  const showRelated = () => {
    return (
      relatedBlogs?.length > 0 &&
      relatedBlogs.map((blog, i) => (
        <div key={i} className="col-md-4">
          <SmallCard blog={blog} />
        </div>
      ))
    );
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row">
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    className="img img-fluid featured-image"
                    alt=""
                  />
                </div>
              </section>

              <section>
                <div className="container mt-5 ">
                  <h2 className="display-5 font-weight-bold">{blog.title}</h2>
                </div>
              </section>

              <section className="container d-flex align-items-center justify-content-end">
                <p
                  style={{
                    textAlign: 'right',
                    fontStyle: 'italic',
                    paddingRight: '10px',
                    borderRadius: '3px',
                    width: 'fit-content',
                  }}
                  className=" ml-1 pt-2 pb-2 pl-2"
                >
                  Written by{' '}
                  <span className="text-capitalize">
                    {blog?.postedBy?.name.split(' ')[0]}
                  </span>{' '}
                  | Published {moment(blog.updatedAt).fromNow()}
                </p>
              </section>

              <section>
                <div className="container">
                  <div className="col-md-12 pt-4 text-justify">
                    {renderHTML(blog.body)}
                  </div>
                </div>
              </section>
              <section className="container mt-3 mb-3">
                {showCategories(blog)}
                {showTags(blog)}
              </section>
              <section>
                <div className="container mt-5">
                  <h4>Related Blogs</h4>
                  <hr />
                  <div className="row">{showRelated()}</div>
                </div>
              </section>
              <section>
                <div className="container mt-5">
                  <h4>Comments</h4>
                  <hr />

                  <p>Show Comments</p>
                </div>
              </section>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      toast.error(data.error);
    } else {
      return {
        blog: data,
      };
    }
  });
};

export default withRouter(SingleBlog);
