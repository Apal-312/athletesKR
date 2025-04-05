import React from "react";
import { Box, Typography, Link, Grid, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./Footer.css";

const Footer = () => {
  return (
    <Box
      sx={{ backgroundColor: "#1a1a1a", color: "#ffffff", padding: "40px 0" }}
    >
      {/* Контейнер для всех элементов с выравниванием по центру */}
      <Grid container justifyContent="center" spacing={4}>
        {/* Первый блок с ссылками и изображением */}
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ textAlign: "center", padding: "10px", height: "280px" }}>
            {/* Заголовок с эффектом при наведении */}
            <Typography
              variant="h6"
              sx={{
                marginBottom: "10px",
                margin: "20px",
                "&:hover": {
                  color: "#2196f3", // Синий цвет при наведении
                },
              }}
            >
              Олимпийские игры
            </Typography>
            {/* Ссылки для навигации */}
            <Link
              href="/medal-table"
              color="inherit"
              underline="none"
              sx={{
                display: "block",
                marginBottom: "5px",
                margin: "20px",
                fontSize: "18px",
              }}
            >
              Результаты и медали
            </Link>
            <Link
              href="/athletes"
              color="inherit"
              underline="none"
              sx={{
                display: "block",
                marginBottom: "5px",
                margin: "20px",
                fontSize: "18px",
              }}
            >
              Повторы и лучшие моменты
            </Link>
            <Link
              href="/sports"
              color="inherit"
              underline="none"
              sx={{ display: "block", marginBottom: "5px", fontSize: "18px" }}
            >
              Все Олимпийские игры
            </Link>
            {/* Изображение флага Кыргызстана */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Kyrgyzstan_%283-2%29.svg/1599px-Flag_of_Kyrgyzstan_%283-2%29.svg.png?20240311163127"
              style={{
                width: "190px",
                height: "auto",
                marginBottom: "20px",
                marginTop: "70px",
              }}
            />
          </Box>
        </Grid>
        {/* Второй блок с ссылками на Олимпийский канал */}
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ textAlign: "center", padding: "10px" }}>
            {/* Заголовок с эффектом при наведении */}
            <Typography
              variant="h6"
              sx={{
                marginBottom: "5px",
                margin: "20px",
                fontSize: "20px",
                "&:hover": {
                  color: "#2196f3", // Синий цвет при наведении
                },
              }}
            >
              Олимпийский канал
            </Typography>
            {/* Ссылки для навигации */}
            <Link
              href="/medal-table"
              color="inherit"
              underline="none"
              sx={{
                display: "block",
                marginBottom: "5px",
                marginTop: "20px",
                margin: "20px",
                fontSize: "18px",
              }}
            >
              Медальный зачет
            </Link>
            <Link
              href="/register"
              color="inherit"
              underline="none"
              sx={{
                display: "block",
                marginBottom: "5px",
                marginTop: "20px",
                margin: "20px",
                fontSize: "18px",
              }}
            >
              Регистрация
            </Link>
          </Box>
        </Grid>
        {/* Третий блок с дополнительными ссылками */}
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ textAlign: "center", padding: "10px", margin: "20px" }}>
            {/* Заголовок с эффектом при наведении */}
            <Typography
              variant="h6"
              sx={{
                marginBottom: "10px",
                "&:hover": {
                  color: "#2196f3", // Синий цвет при наведении
                },
              }}
            >
              Исследовать
            </Typography>
            {/* Ссылки для навигации */}
            <Link
              href="/news"
              color="inherit"
              underline="none"
              sx={{
                display: "block",
                marginBottom: "5px",
                margin: "20px",
                fontSize: "18px",
              }}
            >
              Новости
            </Link>
            <Link
              href="/athletes"
              color="inherit"
              underline="none"
              sx={{
                display: "block",
                marginBottom: "5px",
                margin: "20px",
                fontSize: "18px",
              }}
            >
              Атлеты
            </Link>
            <Link
              href="/sports"
              color="inherit"
              underline="none"
              sx={{
                display: "block",
                marginBottom: "5px",
              }}
            >
              Виды
            </Link>
          </Box>
        </Grid>
      </Grid>
      {/* Блок с иконками социальных сетей */}
      <Box sx={{ textAlign: "center", marginTop: "30px" }}>
        <IconButton href="https://www.facebook.com/olympic.kg/" color="inherit">
          <FacebookIcon />
        </IconButton>
        <IconButton
          href="https://www.instagram.com/olympic.kg/"
          color="inherit"
        >
          <InstagramIcon />
        </IconButton>
        <IconButton href="https://www.youtube.com/olympickg" color="inherit">
          <YouTubeIcon />
        </IconButton>
      </Box>
      {/* Блок с текстом об авторских правах */}
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Все права защищены.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
