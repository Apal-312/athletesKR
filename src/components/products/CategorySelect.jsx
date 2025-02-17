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
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 12px 20px rgba(0, 0, 0, 0.3)",
                transform: "scale(1.05)",
                backgroundColor: "#f0f0f0",
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
                sx={{
                  objectFit: "cover",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
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
              sx={{ px: 2, pb: 2 }}
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
