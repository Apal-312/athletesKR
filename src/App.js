import React from "react";
import Navbar from "./components/homePage/Navbar";
import MainRoutes from "./routes/MainRoutes";
import Footer from "./components/Footer";
import ProductContextProvider from "./components/context/ProductContextProvider";

const App = () => {
  return (
    <ProductContextProvider>
      <div>
        <Navbar />
        <MainRoutes />
        <Footer />
      </div>
    </ProductContextProvider>
  );
};

export default App;
