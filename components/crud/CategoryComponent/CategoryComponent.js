import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  postCategory,
  categories,
  removeCategory,
} from '../../../actions/category';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const CategoryComponent = ({ postCategory, categories, removeCategory }) => {
  const { handleSubmit, register, errors, reset } = useForm();
  const [reload, setReload] = useState(false);
  const submit = (data) => {
    postCategory({ name: data.category });
    reset();
    setTimeout(() => {
      setReload(!reload);
    }, [1000]);
  };

  useEffect(() => {
    categories();
  }, [reload]);

  const category = useSelector((state) => state.category);

  const handleDoubleClick = (slug) => {
    const answer = window.confirm(
      'Are you sure you want to delete this category?'
    );
    if (answer) {
      removeCategory(slug);
      setTimeout(() => {
        setReload(!reload);
      }, [1000]);
    }
  };
  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item text-center">Category </li>
      </ul>
      <div className="my-2">
        <form onSubmit={handleSubmit(submit)}>
          <label htmlFor="category">Add new category </label>
          <input
            ref={register({ required: true })}
            id="category"
            name="category"
            type="text"
            placeholder="Category name"
            className="form-control"
          />
          {errors.category && (
            <p className="text-danger my-2">Category name is required.</p>
          )}
          <button type="submit" className="btn btn-primary my-2">
            Add category
          </button>
        </form>
      </div>
      <div className="my-2">
        {!category?.loading && category?.categories?.length > 0 && (
          <span className="text-muted text-small d-block">
            Press double click to delete category
          </span>
        )}

        {category.loading ? (
          'Loading...'
        ) : category?.categories?.length > 0 ? (
          category?.categories?.map((c, i) => (
            <button
              onDoubleClick={() => handleDoubleClick(c.slug)}
              title="Double click to delete"
              key={i}
              className="btn btn-outline-primary mx-1 mt-3"
            >
              {c.name}
            </button>
          ))
        ) : (
          <p>No category add yet</p>
        )}
      </div>
    </div>
  );
};

CategoryComponent.prototype = {
  postCategory: PropTypes.func.isRequired,
  categories: PropTypes.func.isRequired,
  removeCategory: PropTypes.func.isRequired,
};

export default connect(null, { postCategory, categories, removeCategory })(
  CategoryComponent
);
