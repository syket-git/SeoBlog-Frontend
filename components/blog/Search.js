import React, { useState, useEffect } from 'react';
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

  return (
    <div className="container-fluid">
      <div className="pt-3 pb-3">{searchForm()}</div>
    </div>
  );
};
export default Search;
