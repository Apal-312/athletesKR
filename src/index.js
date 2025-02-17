import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ProductContextProvider from "./components/context/ProductContextProvider";
import FavoriteContextProvider from "./components/context/FavoriteContextProvider";
import AuthContextProvider from "./components/context/AuthContextProvider";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <FavoriteContextProvider>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </FavoriteContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
