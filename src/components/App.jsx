import './App.css';
import { useState, useEffect } from 'react';
import fechImages from './Api/Api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
// BASE_URL= 'https://pixabay.com/api/';
// KEY= '24814635-98ab646e956d73723bbfbc5eb';

function App() {
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeUrl, setLargeUrl] = useState('');
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!query) {return}
      fechImages(page, query).then(res => {
        if (res.total === 0) {
          Notify.failure('There is no results');
          setImages({});
          return;
        }
        setImages(page > 1 ? [...images, ...res.hits] : res.hits);
        setIsPending(false);
        setTotalResults(res.total);

        if (res.total > 0 && res.total !== totalResults) {
          Notify.info(`We find ${res.total} results`);
          return;
        }
      });
    
  }, [page, query, ]);

  const onSubmit = async inputQuery => {
    if (query === inputQuery) {
      setIsPending(false);
      Notify.info(`you have already find this query`);
      return;
    }
    setIsPending(true);
    setPage(1);
    setQuery(inputQuery);
      
  };

  const onLoadMore = () => {
    setIsPending(true);
    setPage(prevState => prevState + 1);
  };

  const handleToggleModal = largeUrl => {
    setIsModalOpen(prevState => !prevState);
    setLargeUrl(largeUrl ? largeUrl : '');
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      {!!images.length && (
        <>
          <ImageGallery galleryData={images} toggleModal={handleToggleModal} />
          {isPending && <Loader />}
          {images.length < totalResults && (
            <Button
              onLoadMore={onLoadMore}
              restResults={totalResults - images.length}
            />
          )}
          {isModalOpen && (
            <Modal modalToggle={handleToggleModal} largeUrl={largeUrl} />
          )}
        </>
      )}
    </div>
  );
}
export default App;
