import { BeatLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <BeatLoader color="#c672f3" loading={true} />
    </div>
  );
};

export default Loading;
