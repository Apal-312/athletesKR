import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useProduct } from "../context/ProductContextProvider";

const EditAthletes = () => {
  const { id } = useParams(); // Получаем параметр id из URL с помощью хука useParams
  const { fetchOneProduct, editAthlete, oneAthlete } = useProduct(); // Получаем необходимые функции и состояния из контекста

  // Состояние для хранения данных спортсмена, которые будут изменяться
  const [product, setProduct] = useState({
    name: "",
    sport: "",
    country: "",
    image: "",
    rating: 0,
  });

  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки данных

  // Эффект для загрузки данных спортсмена по id при загрузке компонента
  useEffect(() => {
    fetchOneProduct(id).finally(() => setLoading(false)); // Добавляем setLoading, чтобы прекратить загрузку после получения данных
  }, [id]);

  // Эффект для обновления состояния product при получении данных о спортсмене
  useEffect(() => {
    if (oneAthlete) {
      setProduct(oneAthlete);
    }
  }, [oneAthlete]);

  // Обработчик изменения данных в полях ввода
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Обработчик для обновления данных спортсмена
  const handleUpdateProduct = () => {
    editAthlete(id, product);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
      </Box>
    ); // Показываем индикатор загрузки, пока данные не загружены
  }

  return (
    <Box
      sx={{
        width: "50%",
        margin: "40px auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
            Редактировать спортсмена
          </Typography>

          <TextField
            name="name"
            label="Имя"
            variant="outlined"
            value={product.name || ""} // Используем пустую строку, если значение undefined
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="sport"
            label="Вид спорта"
            variant="outlined"
            value={product.sport || ""}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="country"
            label="Страна"
            variant="outlined"
            value={product.country || ""}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="image"
            label="URL изображения"
            variant="outlined"
            value={product.image || ""}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </CardContent>

        <CardActions sx={{ justifyContent: "center", paddingBottom: 3 }}>
          <Button variant="contained" onClick={handleUpdateProduct}>
            Редактировать спортсмена
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default EditAthletes;
