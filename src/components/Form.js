import React from "react";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { nftDotStorage, fetchDataFromIPFS } from "../../utitls";

import Gun from 'gun'
const gun = Gun(['https://discord-gun-node.herokuapp.com/gun'])

const DB_NAME = 'NEW'


export default function Form() {

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState([]);
  const [formErrors, setFormErrors] = useState('please upload 2 images of your web2 vs web3 version');

  const validateForm = (_formValues) => {
    const errors = '';
    if (_formValues.length < 2) {
      errors = "please upload an 2 image";
    }
    return errors;
  };

  // create a function which set the values of form field
  const handleOnChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e) => {
    console.log(e.target.files);
    setFormValues([...formValues, e.target.files[0], e.target.files[1]]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let _errors = validateForm(formValues);
    setFormErrors(_errors);
    if (_errors.length === 0) {
      console.log("NO ERRORs");
      setLoading(true);
      const metadata1 = await nftDotStorage(formValues[0]);
      const metadata2 = await nftDotStorage(formValues[1]);

      console.log("UPLOADED IMAGE TO IPFS");
      console.log("GETTING IMAGE URL FROM IPFS");
      const web2AvatarImageUrl = await fetchDataFromIPFS(metadata1.url);
      const web3AvatarImageUrl = await fetchDataFromIPFS(metadata2.url);

      console.log("FETCHED IMAGE URL FROM IPFS");



      const DataRef = gun.get(DB_NAME);
      
      const newMessage = {
        web2Avatar: web2AvatarImageUrl,
        web3Avatar: web3AvatarImageUrl,
        createdAt: Date().substring(4, 11),
        messageId: Date.now(),
      }
      DataRef.set(newMessage);
      console.log("SAVED DATA TO GUN");


      setLoading(false);

    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white shadow-lg rounded-md p-4">
      <form>
        <p className="text-red-800 font-bold text-md">
          {formErrors && formErrors}
        </p>
        <input
          className="mt-2"
          type="file"
          multiple
          name={Object.keys(formValues)[0]}
          onChange={handleFileInput}
        ></input>
      </form>
      {!loading ? (
        <button
          className="mt-2 border bg-yellow-400 p-4 rounded-lg"
          onClick={handleSubmit}
        >
          UPLOAD
        </button>
      ) : (
        <Loader />
      )}
    </div>
  );
}
