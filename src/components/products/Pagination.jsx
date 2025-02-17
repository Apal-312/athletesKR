import { Pagination, Stack, Typography } from "@mui/material";
import React from "react";

const PaginationControlled = ({ page, count, handleChange }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}
    >
      <Stack spacing={2}>
        {/* Отображение текущей страницы */}
        <Typography sx={{ color: "white", textAlign: "center" }}>
          Страница: {page}
        </Typography>
        <Pagination
          count={count} // Количество страниц
          variant="outlined" // Окружность пагинации с рамкой
          color="primary" // Основной цвет для пагинации
          onChange={handleChange} // Функция для изменения страницы
          shape="rounded" // Скругленные углы для элементов пагинации
          sx={{
            "& .MuiPaginationItem-page": {
              color: "#14213d", // Цвет текста для страниц
              backgroundColor: "#ffffff", // Белый фон для страниц
              "&:hover": {
                backgroundColor: "#1976d2", // Синий фон при наведении на страницу
                color: "#ffffff", // Белый цвет текста при наведении
              },
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#1976d2", // Синий фон для выбранного элемента
              color: "#ffffff", // Белый текст для выбранного элемента
              "&:hover": {
                backgroundColor: "#1565c0", // Темно-синий фон при наведении на выбранный элемент
              },
            },
            "& .MuiPaginationItem-previousNext": {
              color: "#ffffff", // Белый цвет для стрелок
              "&:hover": {
                backgroundColor: "#1565c0", // Синий фон при наведении на стрелку
                color: "#ffffff", // Белый цвет текста для стрелки при наведении
              },
            },
          }}
        />
      </Stack>
    </div>
  );
};

export default PaginationControlled;
