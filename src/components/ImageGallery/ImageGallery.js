import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ galleryData, toggleModal }) => {
  const images = galleryData;
  return (
    <ul className={s.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          toggleModal={toggleModal}
          className="gallery-item"
          largeUrl={image.largeImageURL}
          src={image.webformatURL}
          alt={image.tags}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  galleryData: PropTypes.array,
  toggleModal: PropTypes.func,
};

export default ImageGallery;
