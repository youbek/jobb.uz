import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";

export const SocketContext = React.createContext(undefined);

const socket = io.connect("http://localhost:8080");

function SocketContextProvider({ children }) {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
