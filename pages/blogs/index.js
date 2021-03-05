import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Card from '../../components/blog/Card';
import { listAllBlogsCategoriesAndTags } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, APP_ID } from '../../config';
import { withRouter } from 'next/router';

const Blogs = ({
  blogs,
  tags,
  totalBlogs,
  limitBlogs,
  skipBlogs,
  categories,
  router,
}) => {
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

  console.log(limitBlogs);
  console.log(skipBlogs);

  const [limit, setLimit] = useState(limitBlogs);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listAllBlogsCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  console.log('size', size);
  console.log('limit', limit);

  const loadMoreButton = () =>
    size > 0 &&
    size >= limit && (
      <button onClick={loadMore} className="btn btn-outline-primary btn-sm">
        Load more
      </button>
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

  const showLoadedBlogs = () => {
    return loadedBlogs?.map((blog, i) => {
      return <Card blog={blog} i={i} />;
    });
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
          <div className="container-fluid">{showAllBlogs()}</div>
          <div className="container-fluid">{showLoadedBlogs()}</div>
          <div className="text-center pb-5 pt-5">{loadMoreButton()}</div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listAllBlogsCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      toast.error(error);
    } else {
      return {
        blogs: data.blogs,
        tags: data.tags,
        categories: data.categories,
        totalBlogs: data.size,
        limitBlogs: limit,
        skipBlogs: skip,
      };
    }
  });
};

export default withRouter(Blogs);
