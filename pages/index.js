import React, { useContext, useState, useEffect } from "react";
import { VoidNerdContext } from "../context/VoidNerd";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GradientButton from '../src/components/GradientButton'
import Button from '../src/components/Button'
import NFTCard from '../src/components/NFTCard'
import Loader from '../src/components/Loader'
import RenderVoidNerd from '../src/components/RenderVoidNerd'



// ethers
import { Contract, utils } from 'ethers'
import { VOIDNERD_CONTRACT_ADDRESS, VOIDNERD_ABI } from '../src/constants';



export default function Home() {

  return (
    <div className="bg-gradient-to-b from-black h-screen w-screen overflow-auto">
      <div className=" flex justify-end mx-4 ">
        <GradientButton text={!isWalletConnected ? "Connect Wallet" : shortenAddress(account)} onClick={connectWallet} />
      </div>

      <div className="max-w-lg mx-auto p-2">
        <ToastContainer />
        <div className="bg-white shadow-md rounded-lg mt-4 p-4 ">
          <p className="flex flex-col text-center text-2xl font-bold ">
            Hola 👻 Welcome to the <span className="text-4xl ">Void Nerd</span>
          </p>
        </div>

        {!mintLoading ? <Button text="Mint" onClick={() => createRandomVoidNerd("LFG")} /> : <Loader />}


      </div>

      {
        !getLoading ? (
          <div className="mb-4" >
            {
              results && results.map((item, index) => (

                <NFTCard key={index} id={item.id} name={item.name} dna={item.dna} rarity={item.rarity} level={item.level} />
              ))}

          </div>
        ) : <Loader />

      }



    </div>
  );
}
