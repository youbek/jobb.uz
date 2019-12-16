import React, { useState, createContext } from "react";

import AppHeader from "../components/AppHeader/AppHeader";

export const AppHeaderContext = createContext({});

function AppHeaderContextProvider({ children }) {
  const [appHeaderState, setAppHeaderState] = useState({
    title: undefined,
  });
  return (
    <AppHeaderContext.Provider value={{ appHeaderState, setAppHeaderState }}>
      <AppHeader appHeaderState={appHeaderState} />
      {children}
    </AppHeaderContext.Provider>
  );
}

export default AppHeaderContextProvider;
