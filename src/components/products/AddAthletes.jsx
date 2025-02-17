import React, { useState } from "react";
import { useProduct } from "../context/ProductContextProvider";
import { Box, TextField, Button } from "@mui/material";

const AddAthletes = () => {
  // Получаем функцию createAthlete из контекста
  const { createAthlete } = useProduct();

  // Локальный стейт для хранения данных о спортсмене
  const [athlete, setAthlete] = useState({
    name: "",
    sport: "",
    country: "",
    image: "",
  });

  // Функция обработки изменений в полях ввода
  const handleChange = (e) => {
    setAthlete({ ...athlete, [e.target.name]: e.target.value });
  };

  // Функция отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    createAthlete(athlete); // Вызываем функцию создания спортсмена
    // Очищаем форму после добавления
    setAthlete({
      name: "",
      sport: "",
      country: "",
      image: "",
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "420px",
        height: "350px",
        padding: 2,
        border: "1px solid black",
        borderRadius: 1,
        margin: "180px",
        backgroundColor: "#ADE8FE",
        color: "#01263a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: "300px",
        float: "left",
        "@media (max-width: 1200px)": {
          width: "350px",
          marginLeft: "200px",
        },
        "@media (max-width: 992px)": {
          width: "300px",
          marginLeft: "50px",
        },
        "@media (max-width: 768px)": {
          width: "270px",
          marginLeft: "20px",
        },
        "@media (max-width: 480px)": {
          width: "220px",
          marginLeft: "10px",
        },
        "@media (max-width: 320px)": {
          width: "200px",
          marginLeft: "5px",
        },
      }}
    >
      {/* Поле ввода имени спортсмена */}
      <TextField
        fullWidth
        type="text"
        name="name"
        value={athlete.name}
        onChange={handleChange}
        label="Имя"
        sx={{ marginBottom: "16px", backgroundColor: "#b5ffe1" }}
      />
      {/* Поле ввода вида спорта */}
      <TextField
        fullWidth
        type="text"
        name="sport"
        value={athlete.sport}
        onChange={handleChange}
        label="Вид спорта"
        sx={{ marginBottom: "16px", backgroundColor: "#b5ffe1" }}
      />
      {/* Поле ввода страны спортсмена */}
      <TextField
        fullWidth
        type="text"
        name="country"
        value={athlete.country}
        onChange={handleChange}
        label="Страна"
        sx={{ marginBottom: "16px", backgroundColor: "#b5ffe1" }}
      />
      {/* Поле ввода URL изображения спортсмена */}
      <TextField
        fullWidth
        minRows={3}
        name="image"
        value={athlete.image}
        onChange={handleChange}
        label="Ссылка URL на изображение"
        sx={{ marginBottom: "16px", backgroundColor: "#b5ffe1" }}
      />
      {/* Кнопка для добавления спортсмена */}
      <Button type="submit" variant="contained" color="success">
        Добавить спортсмена
      </Button>
    </Box>
  );
};

export default AddAthletes;
