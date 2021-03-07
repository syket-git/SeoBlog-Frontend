import React, { useEffect } from 'react';
import Layout from '../../../components/Layout';
import Admin from '../../../components/Admin';
import ReadBlog from '../../../components/crud/ReadBlog/ReadBlog';

const AllBlogs = () => {
  //   useEffect(() => {
  //     categories();
  //     tags();
  //   }, []);

  return (
    <Layout>
      <Admin>
        <ReadBlog />
      </Admin>
    </Layout>
  );
};

// AllBlogs.prototype = {
//   categories: PropTypes.func.isRequired,
//   tags: PropTypes.func.isRequired,
// };
// connect(null, { categories, tags })

export default AllBlogs;
