import React, { createContext } from 'react'

export const Context = createContext();

export const MainContextProvider = ({ children }) => {
  return (
    <Context.Provider value={{}}>
      {children}
    </Context.Provider>
  )
}