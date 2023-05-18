import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ tags, smallImage, largeImage, openModal }) => {
  const handleClick = useCallback(() => {
    openModal({ largeUrl: largeImage, targetAlt: tags });
  }, [openModal, largeImage, tags]);

  return (
    <GalleryItem onClick={handleClick}>
      <GalleryItemImg
        src={smallImage}
        alt={tags}
        loading="lazy"
        width={480}
        height={260}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;