import Layout from '../../components/Layout';
import Admin from '../../components/Admin';
import Link from 'next/link';

const Index = () => {
  return (
    <Layout>
      <Admin>
        <h3 className="text-center py-4">Admin Dashboard</h3>
        <div className="row mx-3">
          <div className="col-md-4">
            <ul className="list-group">
              <li className="list-group-item">
                <Link href="/admin/crud/category-tag">Create category</Link>
              </li>
              <li className="list-group-item">
                <Link href="/admin/crud/category-tag">Create tag</Link>
              </li>
              <li className="list-group-item">
                <Link href="/admin/crud/blog">Create blog</Link>
              </li>
              <li className="list-group-item">
                <Link href="/admin/crud/blogs">Update / Delete blog</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-8"></div>
        </div>
      </Admin>
    </Layout>
  );
};
export default Index;
