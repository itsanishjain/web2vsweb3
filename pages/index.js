import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../src/components/Form';
import ImageCard from '../src/components/ImageCard';

import { useState, useEffect } from 'react';

import Gun from 'gun'
const gun = Gun(['https://discord-gun-node.herokuapp.com/gun'])

const DB_NAME = 'NEW'

export default function Home() {

  const [items, setItems] = useState([]);

  const formattedMessagesArray = (_items) => {
    console.log(_items, "!!!!!!!!!!!!!!!!!!!!!!!");
    const uniqueArray = _items.filter((value, index) => {
      const _value = JSON.stringify(value)
      return (
        index ===
        _items.messages.findIndex(obj => {
          return JSON.stringify(obj) === _value
        })
      )
    })
    return uniqueArray;
  }

  const getDataFromGun = () => {
    console.log("DB NAME", DB_NAME)
    const dataRef = gun.get(DB_NAME);

    // console.log(dataRef)
    dataRef.map().once((data, key) => {
      // update items state
      setItems(prevItems => [...prevItems, data]);

      // setItems([...items, data])
      console.log(data, key)
    })

    // dataRef.map((item, index) => {
    //   if (item.web3Avatar) {
    //     let d = {
    //       web2Avatar: item.web2Avatar,
    //       web3Avatar: item.web3Avatar,
    //       createdAt: item.createdAt,
    //       messageId: item.messageId,
    //     }
    //     setItems([...items, d])
    //   }
    // })
  }

  useEffect(() => {
    getDataFromGun();
  }, [])


  console.log("items: ", items.length);


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

        <div>
          {items.length > 0 ? (
            <div>
              {items.map((item, index) => (
                <div key={index} className='flex justify-between space-x-8'>
                  <ImageCard url={item.web2Avatar} voteCount={100} />
                  <ImageCard url={item.web3Avatar} voteCount={100} />
                </div>
              ))}
            </div>
          ) : "NO ITEMS"}
        </div>

        <div className='flex justify-between space-x-8'>
          <ImageCard url="https://image.shutterstock.com/image-vector/cool-beard-man-vector-logo-260nw-1719020434.jpg" voteCount={100} />

          <ImageCard url="https://image.winudf.com/v2/image1/Y29tLmJ1bnR5YXBweC5hdnRhcm1ha2VyX3NjcmVlbl8wXzE1NjM0OTUwODFfMDg3/screen-0.jpg?h=500&fakeurl=1&type=.jpg" voteCount={100} />
        </div>



      </div>
    </div>
  );
}
