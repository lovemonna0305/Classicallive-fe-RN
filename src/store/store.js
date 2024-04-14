import React, { createContext, useState, useContext } from 'react';

const StoreContext = createContext();
export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState({
    isLoggedin: false,
    page: "Home",
    showSplashScreen: true,
    role: '',
    isLoading: false,
    currentUser: {},
    program: {},
    pPendingPoints: 0,
    category:{},
  });

  const changeStore = (newStore) => {
    setStore(newStore);
  };

  return (
    <StoreContext.Provider value={{ store, changeStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);