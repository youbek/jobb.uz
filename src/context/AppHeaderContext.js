import React, { useState, createContext } from "react";

import AppHeader from "../components/AppHeader/AppHeader";

export const AppHeaderContext = createContext({});
export const BreadcrumbContext = createContext({ path: [] });

function AppHeaderContextProvider({ children }) {
  const [appHeaderState, setAppHeaderState] = useState({
    title: undefined,
    path: [{ title: "" }],
  });

  return (
    <AppHeaderContext.Provider value={{ appHeaderState, setAppHeaderState }}>
      <AppHeader appHeaderState={appHeaderState} />
      {children}
    </AppHeaderContext.Provider>
  );
}

export default AppHeaderContextProvider;
