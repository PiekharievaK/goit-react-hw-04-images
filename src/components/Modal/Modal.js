import s from './Modal.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  onModalClose = e => {
    if (e.keyCode === 27) {
      this.props.modalToggle();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onModalClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onModalClose);
  }

  render() {
    const data = this.props;

    return (
      <div
        className={s.Overlay}
        onClick={e => {
          if (e.target === e.currentTarget) {
            data.modalToggle();
          }
        }}
      >
        <div >
          <img className={s.Modal} src={data.largeUrl} alt={data.name} />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  modalToggle: PropTypes.func,
  largeUrl: PropTypes.string,
};
export default Modal;
