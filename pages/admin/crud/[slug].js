import React, { useEffect } from 'react';
import Layout from '../../../components/Layout';
import Admin from '../../../components/Admin';
import UpdateBlog from '../../../components/crud/UpdateBlog/UpdateBlog';
import { connect } from 'react-redux';
import { categories } from '../../../actions/category';
import { tags } from '../../../actions/tag';
import PropTypes from 'prop-types';

const updateBlog = ({ categories, tags }) => {
  useEffect(() => {
    categories();
    tags();
  }, []);

  return (
    <Layout>
      <Admin>
        <UpdateBlog />
      </Admin>
    </Layout>
  );
};

updateBlog.prototype = {
  categories: PropTypes.func.isRequired,
  tags: PropTypes.func.isRequired,
};

export default connect(null, { categories, tags })(updateBlog);
