import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { useFavorite } from "./context/FavoriteContextProvider";
import { API_COMMENTS } from "../helpers/const";

const Favorites = () => {
  // Использование контекста для работы с избранными атлетами
  const { favoriteAthletes, removeAthleteFromFavorite } = useFavorite();

  // Состояние для хранения комментариев об атлетах
  const [athleteComments, setAthleteComments] = useState({});

  // Загрузка комментариев об атлетах при монтировании компонента
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(API_COMMENTS);
        setAthleteComments(response.data);
      } catch (error) {
        console.error(
          "Ошибка при загрузке данных об избранных атлетах:",
          error
        );
      }
    };

    fetchComments();
  }, []); // Пустой массив зависимостей, чтобы useEffect вызывался только один раз при монтировании компонента

  // Обработчик для загрузки комментариев по клику на карточку атлета
  const handleFetchComments = async (athleteId) => {
    try {
      // Здесь можно выполнить дополнительные действия при клике на карточку атлета
      console.log(`Запрос комментариев для атлета с ID ${athleteId}`);
    } catch (error) {
      console.error("Ошибка при загрузке комментариев:", error);
    }
  };

  // Логирование избранных атлетов при их изменении
  useEffect(() => {
    console.log("Избранные атлеты в компоненте Favorites:", favoriteAthletes);
  }, [favoriteAthletes]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {/* Если нет избранных атлетов, отображается сообщение */}
      {favoriteAthletes.length === 0 ? (
        <Typography variant="h6">Нет избранных атлетов</Typography>
      ) : (
        // Иначе отображаются карточки избранных атлетов
        favoriteAthletes.map((athlete) => (
          <Card
            key={athlete.id}
            sx={{
              maxWidth: 300,
              margin: "16px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              borderRadius: 8,
              transition: "box-shadow 0.3s ease, transform 0.3s ease", // Плавное изменение тени и масштаба
              "&:hover": {
                boxShadow: "0 12px 20px rgba(0, 0, 0, 0.3)",
                transform: "scale(1.05)", // Эффект увеличения
                backgroundColor: "#f0f0f0",
                animation: "scaleUp 0.3s ease-in-out", // Плавная анимация при наведении
              },
            }}
          >
            <CardActionArea onClick={() => handleFetchComments(athlete.id)}>
              {/* Изображение атлета */}
              <CardMedia
                component="img"
                height="250"
                image={athlete.image || "https://via.placeholder.com/300"}
                alt={athlete.name}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                  borderRadius: "35px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onClick={() => openModal(book)}
              />

              {/* Информация об атлете */}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {athlete.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {athlete.sport} <br />
                  {athlete.country} <br />
                  {athlete.details}
                </Typography>
              </CardContent>
            </CardActionArea>
            {/* Кнопка удаления из избранных */}
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              sx={{
                px: 2,
                pb: 2,
                opacity: 0,
                animation: "fadeIn 0.3s ease 0.3s forwards", // Плавное появление кнопки
              }}
            >
              <IconButton
                onClick={() => removeAthleteFromFavorite(athlete.id)}
                sx={{ color: "#d62839" }}
              >
                <StarIcon />
              </IconButton>
            </Stack>
          </Card>
        ))
      )}
    </div>
  );
};

export default Favorites;
