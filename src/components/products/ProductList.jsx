import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard"; // Компонент для отображения карточки продукта
import SideBar from "./SideBar"; // Компонент для отображения бокового меню
import PaginationControlled from "./Pagination"; // Компонент для пагинации
import { useProduct } from "../context/ProductContextProvider"; // Хук для доступа к контексту продуктов

const ProductList = () => {
  const { getAthletes, athletes: athleteData } = useProduct(); // Получаем функцию getAthletes и данные спортсменов (athletes)

  const [page, setPage] = useState(1); // Состояние для текущей страницы пагинации

  // Эффект для загрузки данных при первом рендере компонента
  useEffect(() => {
    getAthletes(); // Загружаем список спортсменов
  }, []);

  const itemPerPage = 8; // Количество элементов на одной странице

  // Вычисляем количество страниц для пагинации
  const count = Math.ceil(athleteData.length / itemPerPage);

  // Функция для получения данных для текущей страницы
  const currentData = () => {
    const beginIndex = (page - 1) * itemPerPage; // Индекс начала текущей страницы
    const endIndex = beginIndex + itemPerPage; // Индекс конца текущей страницы
    return athleteData.slice(beginIndex, endIndex); // Возвращаем данные для текущей страницы
  };

  // Функция для изменения страницы при клике на пагинацию
  const handleChange = (event, value) => {
    setPage(value); // Обновляем состояние текущей страницы
  };

  return (
    <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Box sx={{ display: "flex", width: "100%" }}>
        <SideBar /> {/* Отображаем боковую панель для фильтрации или поиска */}
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center", // Центрируем карточки продуктов
          marginTop: "20px", // Отступ сверху
        }}
      >
        {/* Отображаем карточки продуктов для текущей страницы */}
        {currentData().map((athlete) => (
          <ProductCard key={athlete.id} product={athlete} /> // Для каждого спортсмена отображаем его карточку
        ))}
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {/* Отображаем пагинацию с текущей страницей и количеством страниц */}
        <PaginationControlled
          page={page} // Текущая страница
          count={count} // Количество страниц
          handleChange={handleChange} // Функция изменения страницы
        />
      </Box>
    </Box>
  );
};

export default ProductList;
