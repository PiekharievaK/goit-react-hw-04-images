import { Component } from 'react';
import s from './Searchbar.module.css';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    query: '',
  };

  onInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;

    if (this.state.query.trim() === '') {
      Notify.failure('Please fill the field');
      return;
    }

    onSubmit(this.state.query);

    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={s.Button}>
            <span className={s.ButtonLabel}>Search</span>
          </button>

          <input
            name="query"
            value={this.state.query}
            className={s.Input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInput}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
