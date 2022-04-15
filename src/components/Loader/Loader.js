import s from './Loader.module.css';
import { BallTriangle } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const loader = () => {
  return (
    <div className={s.loader}>
      {<BallTriangle color="#00BFFF" height={80} width={80} />}
    </div>
  );
};
export default loader;
