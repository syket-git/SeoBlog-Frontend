import React, { useEffect } from 'react';
import Layout from '../../../components/Layout';
import Admin from '../../../components/Admin';
import CreateBlog from '../../../components/crud/CreateBlog/CreateBlog';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { categories } from '../../../actions/category';
import { tags } from '../../../actions/tag';

const blog = ({ categories, tags }) => {
  useEffect(() => {
    categories();
    tags();
  }, []);

  return (
    <Layout>
      <Admin>
        <CreateBlog />
      </Admin>
    </Layout>
  );
};

blog.prototype = {
  categories: PropTypes.func.isRequired,
  tags: PropTypes.func.isRequired,
};

export default connect(null, { categories, tags })(blog);
