import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTag, tags, removeTag } from '../../../actions/tag';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const TagComponent = ({ createTag, tags, removeTag }) => {
  const { handleSubmit, register, errors, reset } = useForm();
  const [reload, setReload] = useState(false);
  const submit = (data) => {
    createTag({ name: data.tag });
    reset();
    setTimeout(() => {
      setReload(!reload);
    }, [1000]);
  };

  useEffect(() => {
    tags();
  }, [reload]);

  const tag = useSelector((state) => state.tag);

  const handleDoubleClick = (slug) => {
    const answer = window.confirm('Are you sure you want to delete this tag?');
    if (answer) {
      removeTag(slug);
      setTimeout(() => {
        setReload(!reload);
      }, [1000]);
    }
  };
  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item text-center">Tag </li>
      </ul>
      <div className="my-2">
        <form onSubmit={handleSubmit(submit)}>
          <label htmlFor="tag">Add new tag </label>
          <input
            ref={register({ required: true })}
            id="tag"
            name="tag"
            type="text"
            placeholder="Tag name"
            className="form-control"
          />
          {errors.tag && (
            <p className="text-danger my-2">Tag name is required.</p>
          )}
          <button type="submit" className="btn btn-primary my-2">
            Add Tag
          </button>
        </form>
      </div>
      <div className="my-2">
        {!tag?.loading && tag?.tags?.length > 0 && (
          <span className="text-muted text-small d-block">
            Press double click to delete tag
          </span>
        )}

        {tag.loading ? (
          'Loading...'
        ) : tag?.tags?.length > 0 ? (
          tag?.tags?.map((t, i) => (
            <button
              onDoubleClick={() => handleDoubleClick(t.slug)}
              title="Double click to delete"
              key={i}
              className="btn btn-outline-primary mx-1 mt-3"
            >
              {t.name}
            </button>
          ))
        ) : (
          <p>No tag add yet</p>
        )}
      </div>
    </div>
  );
};

TagComponent.prototype = {
  createTag: PropTypes.func.isRequired,
  tags: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
};

export default connect(null, { createTag, tags, removeTag })(TagComponent);
