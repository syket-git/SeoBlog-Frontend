import moment from 'moment';
import renderHTML from 'react-render-html';
import Link from 'next/link';
import { API } from '../../config';

const Card = ({ blog, i }) => {
  //Show Categories and Tags
  const showCategories = (blog) => {
    return blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-info btn-sm ml-1 mr-1 mt-3">{c.name}</a>
      </Link>
    ));
  };
  const showTags = (blog) => {
    return blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-info btn-sm ml-1 mr-1 mt-3">{t.name}</a>
      </Link>
    ));
  };

  return (
    <article key={i} className="mb-5">
      <div>
        <header>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h4 className="pt-3 pb-3 font-weight-bold ">{blog.title}</h4>
            </a>
          </Link>
        </header>
        <section>
          <div className="mark ml-1 pt-2 pb-2">
            Written by {blog?.postedBy?.name} | Published{' '}
            {moment(blog.updatedAt).fromNow()}
          </div>
        </section>
        <section>
          {showCategories(blog)}
          {showTags(blog)}
          <br />
          <br />
        </section>
        <div className="row">
          <div className="col-md-4">
            <section>
              <img
                className="img img-fluid"
                style={{ maxHeight: 'auto', width: '100%' }}
                src={`${API}/blog/photo/${blog.slug}`}
                alt={blog.title}
              />
            </section>
          </div>
          <div className="col-md-8">
            <section>
              {renderHTML(blog.excerpt)}
              <Link href={`/blogs/${blog.slug}`}>
                <a className="btn btn-primary pt-2 btn-sm">Read more</a>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
};
export default Card;
