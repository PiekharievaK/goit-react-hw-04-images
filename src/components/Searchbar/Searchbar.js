import s from './Searchbar.module.css';
import { useState } from 'react';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

function Searchbar(props) {
  const [query, setQuery] = useState('');

  const onInput = ({ target: { name, value } }) => {
    setQuery(value);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      Notify.failure('Please fill the field');
      return;
    }
    props.onSubmit(e.target.query.value);

    // setQuery('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={s.Button}>
          <span className={s.ButtonLabel}>Search</span>
        </button>

        <input
          name="query"
          value={query}
          className={s.Input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInput}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
