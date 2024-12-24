/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const UiContext = createContext();

function UiProvider({ children }) {
  const [visibleUpload, setVisibleUpload] = useState(false);
  const [extend, setExtend] = useState(false);

  return (
    <UiContext.Provider
      value={{ visibleUpload, setVisibleUpload, extend, setExtend }}
    >
      {children}
    </UiContext.Provider>
  );
}

function useUi() {
  const context = useContext(UiContext);

  if (context === undefined)
    throw new Error("Ui Context was used outside of UI provider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { UiProvider, useUi };
