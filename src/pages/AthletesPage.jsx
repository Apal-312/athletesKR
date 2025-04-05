import React, { useEffect } from "react";
import ProductList from "../components/products/ProductList";
import { useProduct } from "../components/context/ProductContextProvider";
import { useNavigate } from "react-router-dom";
import "./AthletesPage.css";

const AthletesPage = () => {
  const { athletes } = useProduct(); // Получаем список продуктов (атлетов) из контекста
  const navigate = useNavigate(); // Хук для навигации между страницами

  useEffect(() => {
    navigate("/athletes"); // При монтировании компонента сразу выполняется переход на страницу /athletes
  }, [navigate]); // useEffect зависит от navigate, чтобы избежать лишних вызовов

  return (
    <div className="container">
      <ProductList products={athletes} />{" "}
      {/* Отображаем список продуктов (атлетов) */}
    </div>
  );
};

export default AthletesPage;
