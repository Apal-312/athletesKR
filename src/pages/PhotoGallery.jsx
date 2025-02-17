import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";
import "./PhotoGallery.css";

const PhotoGallery = () => {
  // Массив с ссылками на фотографии
  const photos = [
    "https://static.tildacdn.one/tild6565-6165-4366-a431-653131376134/_.jpg",
    "https://static.tildacdn.one/tild3833-3535-4334-b637-306530313933/_2_.jpg",
    "https://static.tildacdn.one/tild3362-6265-4361-b061-343166643130/_1_.jpg",
    "https://static.tildacdn.one/tild3932-3539-4535-b931-353963373935/_4_.jpg",
    "https://static.tildacdn.one/tild3365-3162-4666-b266-346135336235/1053419459.jpg",
    "https://static.tildacdn.one/tild6238-6366-4837-b863-623733306162/221914.jpg",
    "https://static.tildacdn.one/tild6232-3561-4563-b830-633334323066/2021-08-02_17-34-46_.jpg",
    "https://static.tildacdn.one/tild3664-3439-4039-a364-666332623238/IMG_3159.JPG",
    "https://static.tildacdn.one/tild6466-3261-4265-b966-383133633063/_3_.jpg",
    "https://static.tildacdn.one/tild3566-3566-4332-b832-643261356266/IMG_3142.JPG",
    "https://static.tildacdn.one/tild3765-3430-4137-b838-373034643061/_5_.jpg",
    "https://i.ytimg.com/vi/XE4z8HE3bgY/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGH8gEygpMA8=&rs=AOn4CLCIlhbO-gqiCZxM3eRpP1sW7VS5xQ",
    "https://sputnik.kg/img/07e6/04/15/1063823864_461:473:2559:2047_1920x0_80_0_0_f1f99b438de1c687f68d4767060545d3.jpg",
    "https://sputnik.kg/img/07e8/08/07/1087675379_92:124:1505:919_1920x0_80_0_0_df16e50200ac5a22bc77e66dcc7ae8bd.jpg",
    "https://gdb.rferl.org/01000000-0a00-0242-5239-08dcaa2779f2_w1200_r1.jpg",
  ];

  // Состояние для текущего индекса фото
  const [currentIndex, setCurrentIndex] = useState(0);
  // Состояние для открытия/закрытия модального окна
  const [open, setOpen] = useState(false);
  // Состояние для анимации
  const [animationClass, setAnimationClass] = useState("");

  // Функция для открытия модального окна с конкретным фото
  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  // Функция для закрытия модального окна
  const handleClose = () => setOpen(false);

  // Функция для перехода к следующему фото
  const handleNext = () => {
    setAnimationClass("slide-in-left"); // Устанавливаем анимацию
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length); // Переводим к следующему фото
      setAnimationClass(""); // Снимаем анимацию
    }, 300); // Задержка, чтобы анимация завершилась
  };

  // Функция для перехода к предыдущему фото
  const handlePrev = () => {
    setAnimationClass("slide-in-right"); // Устанавливаем анимацию
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length); // Переводим к предыдущему фото
      setAnimationClass(""); // Снимаем анимацию
    }, 300); // Задержка, чтобы анимация завершилась
  };

  // Обработчик событий нажатия клавиш на клавиатуре
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext(); // Переход к следующему фото
      else if (e.key === "ArrowLeft") handlePrev(); // Переход к предыдущему фото
    };
    window.addEventListener("keydown", handleKeyDown); // Добавляем слушателя события
    return () => window.removeEventListener("keydown", handleKeyDown); // Убираем слушателя при размонтировании компонента
  }, []);

  return (
    <Box className="gallery-container">
      {/* Заголовок галереи */}
      <Typography className="gallery-title">Фотогалерея</Typography>
      {/* Сетка изображений для миниатюр */}
      <Box className="gallery-grid">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Photo ${index + 1}`}
            className="gallery-thumbnail"
            onClick={() => handleOpen(index)} // Открыть модальное окно с выбранным фото
          />
        ))}
      </Box>
      {/* Модальное окно с текущим фото */}
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-container">
          <Box className="modal-image-wrapper">
            {/* Кнопка для перехода к предыдущему фото */}
            <IconButton className="modal-prev-btn" onClick={handlePrev}>
              <ArrowBack fontSize="large" />
            </IconButton>

            {/* Текущее фото с применением анимации */}
            <img
              src={photos[currentIndex]}
              alt={`Photo ${currentIndex + 1}`}
              className={`modal-image ${animationClass}`} // Добавляем анимацию
            />

            {/* Кнопка для перехода к следующему фото */}
            <IconButton className="modal-next-btn" onClick={handleNext}>
              <ArrowForward fontSize="large" />
            </IconButton>

            {/* Кнопка для закрытия модального окна */}
            <IconButton className="modal-close-btn" onClick={handleClose}>
              <Close fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PhotoGallery;
