import Layout from '../../../components/Layout';
import Admin from '../../../components/Admin';
import CategoryComponent from '../../../components/crud/CategoryComponent/CategoryComponent';
import TagComponent from '../../../components/crud/TagComponent/TagComponent';

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <h3 className="text-center py-4">Manage Category and Tag</h3>
        <div className="row mx-3">
          <div className="col-md-6">
            <CategoryComponent />
          </div>
          <div className="col-md-6">
            <TagComponent />
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
