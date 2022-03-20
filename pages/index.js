import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../src/components/Form';
import ImageCard from '../src/components/ImageCard';

export default function Home() {

  return (
    <div className="bg-gradient-to-b from-black h-screen w-screen overflow-auto">
      <div className="max-w-lg mx-auto p-2">
        <ToastContainer />
        <div className="bg-white shadow-md rounded-lg mt-4 p-4 ">
          <p className="flex flex-col text-center text-2xl font-bold ">
            Hola 👻 Welcome to the <span className="text-4xl ">Web2 VS Web3 Me</span>
          </p>
        </div>
        <Form />
        <div className='flex space-x-12'>
          <ImageCard url="https://image.shutterstock.com/image-vector/cool-beard-man-vector-logo-260nw-1719020434.jpg" voteCount={100} />

          <ImageCard url="https://image.shutterstock.com/image-vector/cool-beard-man-vector-logo-260nw-1719020434.jpg" voteCount={100} />
        </div>
      </div>
    </div>
  );
}
