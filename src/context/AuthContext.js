import React, {
  useState,
  useEffect,
  forwardRef,
  createContext,
  useContext,
  useImperativeHandle,
} from "react";
import { useQuery } from "@apollo/react-hooks";

import { CHECK_TOKEN } from "../graphql/queries";

import { SocketContext } from "./SocketContext";

export const AuthContext = createContext(null);

const AuthContextProvider = forwardRef((props, ref) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const { socket } = useContext(SocketContext);

  useImperativeHandle(ref, () => ({
    setAuthenticatedUser,
  }));

  const token = localStorage.getItem("userToken") || "";

  const { loading, error, data } = useQuery(CHECK_TOKEN, {
    variables: { token },
  });

  useEffect(() => {
    if (!loading && socket) {
      setAuthenticatedUser(data.checkToken ? data.checkToken : null);

      console.log(data.checkToken);

      if (!data.checkToken) {
        socket.emit("leave");
        return;
      }

      socket.emit("join", {
        hashId: data.checkToken.hashId,
        firstName: data.checkToken.firstName,
        lastName: data.checkToken.lastName,
      });

      return;
    }
  }, [loading, error, data, socket]);

  if (error) throw new Error(error);

  return (
    <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
      {loading ? null : props.children}
    </AuthContext.Provider>
  );
});

export default AuthContextProvider;
