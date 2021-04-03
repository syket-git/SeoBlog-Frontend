import React from 'react';
import Layout from '../../components/Layout';
import { singleTag } from '../../actions/tag';
import Card from '../../components/blog/Card';

const Tags = ({ tag, blogs }) => {
  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="text-center">{tag.name}</h1>
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

Tags.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { tag: data.tag, blogs: data.blogs };
    }
  });
};

export default Tags;
