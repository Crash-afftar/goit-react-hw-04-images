import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from './Utilities/Pixabay';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);

    fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        if (!totalHits) {
          toast.error('There are no images for your request');
          return;
        }
        const results = hits.map(({ tags, id, webformatURL, largeImageURL }) => ({
          tags,
          id,
          smallImage: webformatURL,
          largeImage: largeImageURL,
        }));

        setImages((prevImages) => [...prevImages, ...results]);
        setTotalHits(totalHits);
      })
      .catch((error) => {
        toast.error('There are no images for your request');
      })
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const submitHandler = (newQuery) => {
    if (!newQuery.trim() || newQuery === query) {
      toast.warn('You are already viewing results for this query');
      return;
    }
    window.scrollTo({ behavior: 'smooth', top: 0 });
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setTotalHits(0);
  };

  const onLoadMoreButton = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onImageClick = (newActiveImage = null) => {
    setActiveImage(newActiveImage);
  };

  return (
    <div>
      <Searchbar onSubmit={submitHandler} />
      <ImageGallery images={images} openModal={onImageClick} />
      {totalHits > images.length && !isLoading && (
        <Button onLoadMoreButton={onLoadMoreButton} />
      )}
      {isLoading && <Loader wrapperStyle={{ margin: '0 auto' }} />}
      {activeImage && <Modal image={activeImage} onClose={onImageClick} />}
      <ToastContainer />
    </div>
  );
};

export default App;