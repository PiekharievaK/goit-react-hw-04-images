import s from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onLoadMore, restResults }) => {
  return (
    <button type="button" onClick={onLoadMore} className={s.Button}>
      Load more <br />
      {restResults} images left
    </button>
  );
};
Button.propTypes = {
  onLoadMore: PropTypes.func,
  restResults: PropTypes.number,
};
export default Button;
