import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
const ImageGalleryItem = ({ largeUrl, alt, src, toggleModal }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItemImage}
        
        src={src}
        alt={alt}
        onClick={() => {
          toggleModal(largeUrl);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
  toggleModal: PropTypes.func,
};

export default ImageGalleryItem;
