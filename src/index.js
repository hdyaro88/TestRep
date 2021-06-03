import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ContextProvider from "./Components/Context/ContextProvider";
import Usercontextprovider from "./Components/Context/Usercontextprovider";
ReactDOM.render(
  <Usercontextprovider>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Usercontextprovider>,
  document.getElementById("root")
);
