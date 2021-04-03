import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { singleCategory } from '../../actions/category';
import Card from '../../components/blog/Card';

const Category = ({ category, blogs }) => {
  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="text-center">{category.name}</h1>
              {blogs.map((b, i) => (
                <Card key={i} blog={b} />
              ))}
            </div>
          </header>
        </div>
      </main>
    </Layout>
  );
};

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, blogs: data.blogs };
    }
  });
};

export default Category;
