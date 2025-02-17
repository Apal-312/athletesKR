import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Typography,
  Stack,
  styled,
  Grid, // Добавляем Grid для адаптивного размещения
} from "@mui/material";
import { useProduct } from "../context/ProductContextProvider";
import { useNavigate } from "react-router-dom";
import { StarBorder, Star } from "@mui/icons-material";
import Detail from "./Detail";

// Стилизованная кнопка, меняющая цвет при наведении
const AnimatedIconButton = styled(IconButton)({
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#ff8c00", // Цвет и анимация при наведении
  },
});

const ProductCard = ({ product }) => {
  const { deleteAthlete, getOneAthlete } = useProduct(); // Извлекаем функции из контекста
  const navigate = useNavigate(); // Хук для навигации

  // Состояние для открытия деталей
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => {
    const savedFavorite = localStorage.getItem(`favorite_${product.id}`);
    return savedFavorite === "true"; // Проверка, если продукт сохранен как избранный
  });

  // Открытие и закрытие деталей
  const handleDetailOpen = () => setDetailOpen(true);
  const handleDetailClose = () => setDetailOpen(false);

  // Удаление продукта
  const handleRemoveProduct = () => {
    deleteAthlete(product.id); // Удаляем продукт через функцию из контекста
  };

  // Редактирование продукта
  const handleEditProduct = () => {
    getOneAthlete(product.id); // Получаем данные о продукте
    navigate(`/edit/${product.id}`); // Навигация на страницу редактирования
  };

  // Логика для изменения избранного
  const handleFavoriteClick = () => {
    setIsFavorite((prevFavorite) => {
      const newFavoriteState = !prevFavorite; // Переключаем состояние избранного
      localStorage.setItem(
        `favorite_${product.id}`,
        newFavoriteState.toString() // Сохраняем состояние в localStorage
      );
      return newFavoriteState;
    });
  };

  return (
    <Grid item xs={12} sm={6} md={3} lg={3}>
      {" "}
      {/* Добавляем Grid для адаптивности */}
      <Card
        sx={{
          maxWidth: 320, // Максимальная ширина карточки
          width: "100%", // Устанавливаем 100% ширины карточки для адаптивности
          margin: "16px", // Отступы карточки
          display: "flex", // Используем flexbox для вертикального размещения
          flexDirection: "column", // Элементы располагаются по колонке
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Тень вокруг карточки
          borderRadius: "35px", // Скругленные углы
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Плавные анимации
          "&:hover": {
            transform: "scale(1.05)", // Увеличение карточки при наведении
          },
        }}
      >
        <CardActionArea onClick={handleDetailOpen}>
          {" "}
          {/* Открытие деталей при клике на карточку */}
          <CardMedia
            component="img"
            height="250"
            image={product.image || "https://via.placeholder.com/400"} // Используем изображение продукта или запасное изображение
            alt={product.name}
            sx={{
              objectFit: "cover", // Обеспечиваем заполнение изображения
              borderTopLeftRadius: 8, // Скругление верхнего левого угла
              borderTopRightRadius: 8, // Скругление верхнего правого угла
            }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "center" }} // Выравнивание текста по центру
            >
              {product.name}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ textAlign: "center" }} // Выравнивание текста по центру
            >
              {product.sport} <br />
              {product.country} <br />
              {product.details}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {/* Кнопка редактирования */}
            <Button
              variant="contained"
              size="small"
              color="primary"
              sx={{
                flexGrow: 1, // Растягиваем кнопку по ширине
                mt: "0px",
                "&:hover": {
                  backgroundColor: "#0d47a1", // Увеличенная тень при наведении
                },
              }}
              onClick={handleEditProduct} // Функция редактирования
            >
              Редактировать
            </Button>

            {/* Кнопка удаления */}
            <Button
              variant="contained"
              size="small"
              color="error"
              sx={{
                ml: 1, // Отступ слева
                flexGrow: 1, // Растягиваем кнопку по ширине
                "&:hover": {
                  backgroundColor: "#9b0000", // Увеличенная тень при наведении
                },
              }}
              onClick={handleRemoveProduct} // Функция удаления
            >
              Удалить
            </Button>

            {/* Кнопка избранного */}
            <AnimatedIconButton onClick={handleFavoriteClick} sx={{ ml: 4 }}>
              {isFavorite ? <Star sx={{ color: "#ffb300" }} /> : <StarBorder />}{" "}
              {/* Иконка избранного */}
            </AnimatedIconButton>
          </Stack>
        </CardContent>

        {/* Компонент для отображения подробной информации о продукте */}
        {isDetailOpen && (
          <Detail
            athlete={product} // Передаем продукт в компонент Detail
            open={isDetailOpen} // Состояние открытия деталей
            onClose={handleDetailClose} // Закрытие деталей
          />
        )}
      </Card>
    </Grid>
  );
};

export default ProductCard;
