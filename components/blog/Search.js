import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { searchBlog } from '../../actions/blog';

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: '',
    message: '',
  });
  const { search, results, searched, message } = values;

  console.log(message);
  console.log(results);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchBlog({ search }).then((data) => {
      console.log(data);
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data?.length} blogs found`,
      });
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
    });
  };

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-9">
          <input
            required
            type="text"
            className="form-control"
            placeholder="Search blogs"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-block btn-outline-primary">
            Search
          </button>
        </div>
      </div>
    </form>
  );

  const searchedBlog = (results = []) => {
    return (
      <div className="jumbotron bg-white">
        {message && <p className="pt-4 font-italic text-muted"> {message}</p>}
        {results?.length > 0 &&
          results?.map((blog, i) => (
            <div key={i}>
              <Link href={`/blogs/${blog?.slug}`}>
                <a className="text-primary">{blog.title}</a>
              </Link>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="pt-3 pb-3">{searchForm()}</div>
      {searched && (
        <div style={{ marginTop: '-95px', marginBottom: '-80px' }}>
          {searchedBlog(results)}
        </div>
      )}
    </div>
  );
};
export default Search;
