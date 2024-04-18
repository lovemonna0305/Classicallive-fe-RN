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
    streaming:{
      name:'Test User',
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2YzU4Zjg2Zi0zNWUyLTQxZGQtOTZiOC00YzZlZjg1ZmNlMmEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMzI4OTU0NSwiZXhwIjoxNzEzODk0MzQ1fQ.3hEz2HdkP0PC2CE4wUCztbNeouGEzmkjwndBXfeh0UM',
      meetingId:'',
      micEnabled:'',
      webcamEnabled:'',
      mode:'CONFERENCE',
    },
    iscomplete:false,
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