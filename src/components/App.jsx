import './App.css';
import { Component } from 'react';
import fechImages from './Api/Api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

class App extends Component {
  state = {
    BASE_URL: 'https://pixabay.com/api/',
    KEY: '24814635-98ab646e956d73723bbfbc5eb',
    totalResults: 0,
    query: '',
    page: 1,
    images: [],
    isModalOpen: false,
    largeUrl: '',
    isPending: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.isPending) {
      const res = await fechImages(this.state.page, this.state.query);

      this.setState(prevState => ({
        images:
          this.state.page > 1 ? [...prevState.images, ...res.hits] : res.hits,
        isPending: false,
        totalResults: res.total,
      }));

      if (res.total === 0) {
        Notify.failure('There is no results');
        return;
      }

      if (res.total > 0 && res.total !== prevState.totalResults) {
        Notify.info(`We find ${res.total} results`);
        return;
      }

      if (this.state.images.length === this.state.totalResults) {
        Notify.success('This is all results');
      }
    }
  }

  onSubmit = async query => {
    this.setState({ isPending: true, page: 1, query });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      isPending: true,
      page: prevState.page + 1,
    }));
  };

  handleToggleModal = largeUrl => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
      largeUrl: largeUrl ? largeUrl : '',
    }));
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        {!!this.state.images.length && (
          <>
            <ImageGallery
              galleryData={this.state.images}
              toggleModal={this.handleToggleModal}
            />
            {this.state.isPending && <Loader />}
            {this.state.images.length < this.state.totalResults && (
              <Button
                onLoadMore={this.onLoadMore}
                restResults={this.state.totalResults - this.state.images.length}
              />
            )}
            {this.state.isModalOpen && (
              <Modal
                modalToggle={this.handleToggleModal}
                largeUrl={this.state.largeUrl}
              />
            )}
          </>
        )}
      </div>
    );
  }
}
export default App;
