import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Card from '../../components/blog/Card';
import { listAllCategoriesAndTags } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, APP_ID } from '../../config';
import { withRouter } from 'next/router';

const Blogs = ({ blogs, tags, size, categories, router }) => {
  const head = () => (
    <Head>
      <title>Programming blog | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming blogs and tutorial on React JS, Node JS, Next JS, TypeScript, Nest JS"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:description"
        content="Programming blogs and tutorial on React JS, Node JS, Next JS, TypeScript, Nest JS"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:image" content={`${DOMAIN}/static/image/banner.png`} />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/image/banner.png`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="fb:app_id" content={`${APP_ID}`} />
    </Head>
  );

  const showAllBlogs = () => {
    return blogs?.map((blog, i) => {
      return <Card blog={blog} i={i} />;
    });
  };

  const showAllCategories = () => {
    return categories?.map((c, i) => (
      <Link key={i} href={`/categories/${c.name}`}>
        <a className="btn btn-info btn-sm ml-1 mr-1 mt-3">{c.name}</a>
      </Link>
    ));
  };
  const showAllTags = () => {
    return tags?.map((t, i) => (
      <Link key={i} href={`/tags/${t.name}`}>
        <a className="btn btn-outline-info btn-sm ml-1 mr-1 mt-3">{t.name}</a>
      </Link>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-6 font-weight-bold text-center">
                  Programming blogs and tutorials
                </h1>
              </div>
              <section className="pb-5 text-center">
                {showAllCategories()}
                <br />
                {showAllTags()}
              </section>
            </header>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">{showAllBlogs()}</div>
            </div>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = () => {
  return listAllCategoriesAndTags().then((data) => {
    if (data.error) {
      toast.error(error);
    } else {
      return {
        blogs: data.blogs,
        tags: data.tags,
        categories: data.categories,
        size: data.size,
      };
    }
  });
};

export default withRouter(Blogs);
