import s from './Modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

function Modal(props) {
  useEffect(() => {
    window.addEventListener('keydown', onModalClose);
    return () => {
      window.removeEventListener('keydown', onModalClose);
    };
  });

  const onModalClose = e => {
    if (e.keyCode === 27) {
      props.modalToggle();
    }
  };

  return (
    <div
      className={s.Overlay}
      onClick={e => {
        if (e.target === e.currentTarget) {
          props.modalToggle();
        }
      }}
    >
      <div>
        <img className={s.Modal} src={props.largeUrl} alt={props.name} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  modalToggle: PropTypes.func,
  largeUrl: PropTypes.string,
};
export default Modal;
