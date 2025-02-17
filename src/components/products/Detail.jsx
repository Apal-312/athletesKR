import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import {
  StarBorder,
  Star,
  FavoriteBorder,
  Favorite,
  // Иконка комментариев
} from "@mui/icons-material";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import axios from "axios";
import { API_COMMENTS } from "../../helpers/const";

const Detail = ({ athlete, open, onClose }) => {
  // Состояние для отслеживания состояния "избранного" спортсмена
  const [isFavorite, setIsFavorite] = useState(false);
  // Состояние для отслеживания лайка спортсмена
  const [liked, setLiked] = useState(false);
  // Состояние для хранения количества лайков
  const [likesCount, setLikesCount] = useState(0);
  // Состояние для хранения списка комментариев
  const [comments, setComments] = useState([]);
  // Состояние для нового комментария
  const [newComment, setNewComment] = useState("");
  // Состояние для отображения/скрытия комментариев
  const [showComments, setShowComments] = useState(false);

  // Обработчик для переключения лайка
  const handleLikeToggle = () => {
    setLiked((prevLiked) => !prevLiked); // Переключение состояния лайка
    if (!liked) {
      setLikesCount((prevCount) => prevCount + 1); // Увеличение количества лайков
    } else {
      setLikesCount((prevCount) => prevCount - 1); // Уменьшение количества лайков
    }
  };

  // Обработчик для клика по иконке "избранного"
  const handleFavoriteClick = () => {
    setIsFavorite((prevFavorite) => !prevFavorite); // Переключение состояния избранного
    localStorage.setItem(`favorite_${athlete.id}`, (!isFavorite).toString()); // Сохранение состояния в localStorage
  };

  // Обработчик для добавления комментария
  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      // Проверка на пустой комментарий
      const newCommentData = {
        id: Date.now(), // Уникальный ID для нового комментария
        text: newComment, // Текст комментария
        productId: athlete.id, // ID спортсмена, к которому относится комментарий
      };
      const updatedComments = [...comments, newCommentData]; // Добавление нового комментария в список
      setComments(updatedComments); // Обновление состояния комментариев
      setNewComment(""); // Очистка поля ввода
      try {
        await axios.post(API_COMMENTS, newCommentData); // Отправка комментария на сервер
      } catch (error) {
        console.error("Ошибка при добавлении комментария на сервер:", error); // Ошибка при отправке комментария
      }
    }
  };

  // Обработчик для удаления комментария
  const handleDeleteComment = async (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId // Удаление комментария по ID
    );
    setComments(updatedComments); // Обновление состояния комментариев

    try {
      await axios.delete(`${API_COMMENTS}/${commentId}`); // Удаление комментария с сервера
    } catch (error) {
      console.error("Ошибка при удалении комментария на сервере:", error); // Ошибка при удалении комментария
    }
  };

  // Загрузка комментариев с сервера при изменении спортсмена
  useEffect(() => {
    const fetchCommentsFromServer = async () => {
      try {
        const response = await axios.get(API_COMMENTS); // Получение всех комментариев с сервера
        const productComments = response.data.filter(
          (comment) => comment.productId === athlete.id // Фильтрация комментариев по ID спортсмена
        );
        setComments(productComments); // Обновление состояния комментариев
      } catch (error) {
        console.error("Ошибка при загрузке комментариев с сервера:", error); // Ошибка при загрузке комментариев
      }
    };
    fetchCommentsFromServer(); // Вызов функции загрузки комментариев
  }, [athlete.id]); // Перезапуск useEffect при изменении athlete.id

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        ".MuiPaper-root": {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "530px",
          boxShadow: 24,
          padding: 4,
          backgroundColor: "rgba(0, 0, 0, 0.9)", // Прозрачный фон для модального окна
        },
      }}
    >
      <DialogTitle
        style={{
          fontSize: "28px",
          fontWeight: "400",
          color: "#edf2fb",
          marginLeft: "35px",
        }}
      >
        {athlete.name} {/* Имя спортсмена */}
      </DialogTitle>
      <DialogContent>
        <img
          src={athlete.image}
          alt={athlete.name}
          style={{ width: "100%", borderRadius: "8px", marginBottom: "16px" }}
        />
        <Typography
          variant="h6"
          style={{ fontSize: "20px", color: "#0466c8", marginLeft: "35px" }}
        >
          {athlete.sport} {/* Вид спорта */}
        </Typography>
        <Typography
          variant="h6"
          style={{ fontSize: "23px", color: "red", marginLeft: "35px" }}
        >
          {athlete.country} {/* Страна спортсмена */}
        </Typography>
        <Typography variant="body1">{athlete.details}</Typography>{" "}
        {/* Детали спортсмена */}
        {/* Объединение иконок лайка и комментариев в одном ряду */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <IconButton
            onClick={handleLikeToggle}
            sx={{
              color: liked ? "#d90429" : "grey",
              "&:hover": {
                color: "#d90429", // Цвет при наведении на иконку
              },
            }}
          >
            {liked ? <Favorite /> : <FavoriteBorder />} {/* Иконка лайка */}
          </IconButton>
          <Typography variant="body2" style={{ color: "white" }}>
            ({likesCount} лайков) {/* Количество лайков */}
          </Typography>

          {/* Иконка комментариев */}
          <IconButton
            onClick={() => setShowComments(!showComments)}
            sx={{
              color: "grey",
              "&:hover": {
                color: "#0466c8", // Цвет синий при наведении на иконку
              },
            }}
          >
            <MapsUgcIcon />
          </IconButton>
          <Typography variant="body2" style={{ color: "white" }}>
            {comments.length}{" "}
            {comments.length === 1 ? "комментарий" : "комментариев"}
          </Typography>
        </Stack>
        {/* Отображение комментариев, если showComments true */}
        {showComments && (
          <>
            <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
              Комментарии
            </Typography>
            {comments.length === 0 ? (
              <Typography variant="body2" color="#90caf9">
                Нет комментариев
              </Typography>
            ) : (
              comments.map((comment) => (
                <div key={comment.id}>
                  <Typography variant="body2" color="#cae9ff">
                    {comment.text}
                  </Typography>
                  <Button
                    onClick={() => handleDeleteComment(comment.id)} // Удаление комментария по ID
                    variant="contained"
                    color="error"
                    sx={{
                      ml: 1,
                      flexGrow: 1,
                      "&:hover": {
                        backgroundColor: "#a4133c", // Увеличенная тень при наведении
                      },
                    }}
                  >
                    Удалить {/* Кнопка для удаления комментария */}
                  </Button>
                </div>
              ))
            )}
            <TextField
              label="Добавить комментарий"
              variant="outlined"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)} // Обновление нового комментария
              fullWidth
              multiline
              rows={0.75}
              sx={{
                mt: 0.75,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#0d47a1", // Синий фон для инпута
                  color: "white", // Белый текст в инпуте
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Белый цвет для лейбла
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white", // Белая рамка вокруг инпута
                },
              }}
            />
            <Button
              onClick={handleAddComment}
              variant="contained"
              color="success"
              sx={{ mt: 2, mr: 2 }}
            >
              Добавить {/* Кнопка для добавления комментария */}
            </Button>
          </>
        )}
        {/* Кнопка для закрытия модального окна */}
        <Button
          onClick={onClose}
          variant="contained"
          color="secondary"
          sx={{ mt: 2, display: "block", margin: "40px auto" }}
        >
          Закрыть
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Detail;
