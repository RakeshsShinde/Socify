import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {

  const [Socket, setSocket] = useState(null);
  const [isSocketConnected, setisSocketConnected] = useState(false);
  const ENDPOINT = "http://localhost:4000";

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ Socket, setSocket, isSocketConnected, setisSocketConnected }}>
      {children}
    </SocketContext.Provider>
  )
}

const useSocket = () => {
  return useContext(SocketContext);
}

export { SocketProvider, useSocket };