import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = async (page, query) => {
  const images = await axios.get(
    `?q=${query}&page=${page}&key=24814635-98ab646e956d73723bbfbc5eb&image_type=photo&orientation=horizontal&per_page=12`
  );
  return images.data;
};

export default fetchImages;
