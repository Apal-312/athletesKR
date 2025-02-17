import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import "./MedalTable.css";
import PhotoGallery from "./PhotoGallery"; // Используем импортированный компонент

const MedalTable = () => {
  // Массив с данными для таблицы медального зачета
  const medalData = [
    {
      rank: 1,
      country: "США",
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
      gold: 40,
      silver: 44,
      bronze: 42,
      total: 126,
      totalRank: 1,
    },
    {
      rank: 2,
      country: "Китай",
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/500px-Flag_of_the_People%27s_Republic_of_China.svg.png",
      gold: 40,
      silver: 27,
      bronze: 24,
      total: 91,
      totalRank: 2,
    },
    {
      rank: 3,
      country: "Япония",
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg",
      gold: 20,
      silver: 12,
      bronze: 13,
      total: 45,
      totalRank: 3,
    },
    {
      rank: 4,
      country: "Австралия",
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/500px-Flag_of_Australia_%28converted%29.svg.png",
      gold: 18,
      silver: 19,
      bronze: 16,
      total: 53,
      totalRank: 4,
    },
    {
      rank: "....",
      country: "....",
      gold: "....",
      silver: "....",
      bronze: "....",
      total: "....",
      totalRank: "....",
    },
    {
      rank: 68,
      country: "Кыргызстан",
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Flag_of_Kyrgyzstan.svg/500px-Flag_of_Kyrgyzstan.svg.png",
      gold: 0,
      silver: 2,
      bronze: 4,
      total: 6,
      totalRank: 68,
    },
  ];

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url('https://i.pinimg.com/736x/70/67/3c/70673c1d5d6dab431a6c1a26a4a628c5.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Заголовок */}
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: "90%",
          margin: "0 auto",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          position: "relative",
          overflowX: "auto", // Горизонтальный скролл
        }}
      >
        <Table sx={{ width: "100%", minWidth: "800px" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ffebcd" }}>
              <TableCell
                align="center"
                colSpan={7}
                sx={{
                  fontWeight: "bold",
                  color: "#fff", // Цвет текста, как в заголовке таблицы
                  backgroundColor: "#06244e",
                  fontFamily: "Arial, sans-serif",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
                  padding: "16px",
                  marginBottom: "0",
                  marginTop: "130px",
                }}
              >
                Медальный зачет
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      {/* Таблица */}
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: "90%",
          margin: "0 auto",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          position: "relative",
          overflowX: "auto", // Горизонтальный скролл
        }}
      >
        <Table sx={{ width: "100%", minWidth: "800px" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ffebcd" }}>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Рейтинг
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Страна
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#F28F00" }}
              >
                Золото
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#6c757d" }}
              >
                Серебро
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#CD7F32" }}
              >
                Бронза
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Всего
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Рейтинг по количеству
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medalData.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                  "&:hover": { backgroundColor: "#caf0f8" },
                }}
              >
                <TableCell align="center">{row.rank}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={row.countryFlag}
                      style={{ width: "30px", marginRight: "8px" }}
                    />
                    {row.country}
                  </Box>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "#F28F00" }}
                >
                  {row.gold}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "#6c757d" }}
                >
                  {row.silver}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "#CD7F32" }}
                >
                  {row.bronze}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  {row.total}
                </TableCell>
                <TableCell align="center">{row.totalRank}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          padding: "20px",
          textAlign: "center",
          paddingLeft: { xs: "20px", sm: "50px", md: "150px" },
          paddingRight: { xs: "20px", sm: "50px", md: "150px" },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "fantasy",
            fontWeight: "bold",
            marginTop: "20px",
            fontSize: "1.35rem",
            color: "#fff",
            "&:hover": {
              color: "#2196f3",
              transition: "color 0.3s ease",
            },
          }}
        >
          Спортивные достижения Кыргызстана на Олимпийских играх в Париже 2024
          года
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" }, // Адаптивный размер текста
            lineHeight: "1.8", // Увеличиваем межстрочный интервал
            color: "#fff", // Белый цвет текста
            marginTop: "16px",
            letterSpacing: "0.5px", // Немного увеличим интервал между буквами
            textAlign: "justify", // Выравниваем текст по ширине для лучшего восприятия
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)", // Легкая тень для выделения
            textAlign: "center",
          }}
        >
          Сборная Кыргызстана показала свой лучший результат на Олимпийских
          играх, завоевав <strong>две серебряные</strong> и{" "}
          <strong>одну бронзовую медаль</strong>. Эти медали стали историческими
          для страны, так как они стали первыми с 2008 года. Олимпийские игры в
          Париже стали важным этапом для кыргызстанских спортсменов, которые
          продемонстрировали высокий уровень мастерства и упорства.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontFamily: "fantasy",
            fontWeight: "bold",
            marginTop: "40px",
            fontSize: "1.4rem",
            color: "#fff",
            "&:hover": {
              color: "#2196f3",
            },
          }}
        >
          🥈 Спортсмены и медали Кыргызстана:
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" }, // Адаптивный размер текста
            lineHeight: "1.8", // Увеличиваем межстрочный интервал
            color: "#fff", // Белый цвет текста
            marginTop: "16px",
            letterSpacing: "0.5px", // Немного увеличим интервал между буквами
            textAlign: "center",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)", // Легкая тень для выделения
          }}
        >
          <strong>1. Акжол Махмудов</strong> (борьба): -{" "}
          <strong>Бронзовая медаль</strong>. Акжол Махмудов стал бронзовым
          призером в соревнованиях по борьбе, показав отличную подготовку и
          выдержку. Это был важный успех для борцов Кыргызстана на Олимпийских
          играх.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" }, // Адаптивный размер текста
            lineHeight: "1.8", // Увеличиваем межстрочный интервал
            color: "#fff", // Белый цвет текста
            marginTop: "16px",
            letterSpacing: "0.5px", // Немного увеличим интервал между буквами
            textAlign: "center",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)", // Легкая тень для выделения
          }}
        >
          <strong>2. Мээрим Джуманазарова</strong> (женская борьба): -{" "}
          <strong>Серебряная медаль</strong>. Мээрим Жуманазарова стала первой
          спортсменкой в истории Кыргызстана, завоевавшей две медали на
          Олимпийских играх (серебро в 2024 году, бронза в 2020 году).
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
            lineHeight: "1.8",
            color: "#fff",
            marginTop: "16px",
            letterSpacing: "0.5px",
            textAlign: "center",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <strong>3. Айсулуу Тыныбекова</strong> (женская борьба): -{" "}
          <strong>Бронзовая медаль</strong>. Айсулуу Тыныбекова, чемпионка мира,
          завоевала бронза в своей весовой категории. Это стало для нее второй
          олимпийской наградой на Олимпийских играх и подтверждением её высокого
          мастерства и конкурентоспособности на мировом уровне.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
            lineHeight: "1.8",
            color: "#fff",
            marginTop: "16px",
            letterSpacing: "0.5px",
            textAlign: "center",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <strong>4. Мунарбек Сейитбек уулу</strong> (бокс): -{" "}
          <strong>Серебряная медаль</strong>. Мунарбек Сейитбек уулу, выдающийся
          боксер Кыргызстана, завоевал серебряную медаль на Олимпийских играх в
          Париже 2024 года. Его победа стала исторической для страны, и он
          подтвердил свою репутацию одного из лучших борцов в своей категории.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
            lineHeight: "1.8",
            color: "#fff",
            marginTop: "16px",
            letterSpacing: "0.5px",
            textAlign: "center",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <strong>5. Жоломан Шаршенбеков</strong> (борьба): -{" "}
          <strong>Бронзовая медаль</strong>. Жоломан Шаршенбеков
          продемонстрировал невероятную технику и стойкость, завоевав бронзовую
          медаль в греко-римской борьбе на Олимпиаде 2024 года. Его победа стала
          ярким примером силы воли и преданности своему делу.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
            lineHeight: "1.8",
            color: "#fff",
            marginTop: "16px",
            letterSpacing: "0.5px",
            textAlign: "center",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <strong>6. Узур Джузупбеков</strong> (борьба): -{" "}
          <strong>Бронзовая медаль</strong> Узур Джузупбеков стал бронзовым
          призером в соревнованиях по вольной борьбе на Олимпиаде 2024 года. Его
          скорость и упорство позволили ему показать лучший результат в своей
          карьере на мировом уровне.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontFamily: "fantasy",
            fontWeight: "bold",
            marginTop: "40px",
            fontSize: "1.4rem",
            color: "#fff",
            "&:hover": {
              color: "#2196f3",
            },
          }}
        >
          🏅 Общие результаты и контекст:
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" }, // Адаптивный размер текста
            lineHeight: "1.8", // Увеличиваем межстрочный интервал
            color: "#fff", // Белый цвет текста
            marginTop: "16px",
            letterSpacing: "0.5px", // Немного увеличим интервал между буквами
            textAlign: "justify", // Выравниваем текст по ширине для лучшего восприятия
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)", // Легкая тень для выделения
            textAlign: "center",
          }}
        >
          Кыргызстан занял <strong>68-е место</strong> в медальном зачете на
          Олимпийских играх 2024 года.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" }, // Адаптивный размер текста
            lineHeight: "1.8", // Увеличиваем межстрочный интервал
            color: "#fff", // Белый цвет текста
            marginTop: "16px",
            letterSpacing: "0.5px", // Немного увеличим интервал между буквами
            textAlign: "justify", // Выравниваем текст по ширине для лучшего восприятия
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)", // Легкая тень для выделения
            textAlign: "center",
          }}
        >
          Сборная США лидировала в общем зачете с 113 медалями (39 золотых, 41
          серебряная и 33 бронзовые).
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" }, // Адаптивный размер текста
            lineHeight: "1.8", // Увеличиваем межстрочный интервал
            color: "#fff", // Белый цвет текста
            marginTop: "16px",
            letterSpacing: "0.5px", // Немного увеличим интервал между буквами
            textAlign: "justify", // Выравниваем текст по ширине для лучшего восприятия
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)", // Легкая тень для выделения
            textAlign: "center",
          }}
        >
          Сборная Китая заняла второе место с 88 медалями, а Япония замкнула
          тройку лидеров с 58 медалями.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontFamily: "fantasy",
            fontWeight: "bold",
            marginTop: "40px",
            fontSize: "1.4rem",
            color: "#fff",
            "&:hover": {
              color: "#2196f3",
            },
          }}
        >
          🌍 Дополнительная информация:
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.1rem" }, // Адаптивный размер текста
            lineHeight: "1.8", // Увеличиваем межстрочный интервал
            color: "#fff", // Белый цвет текста
            marginTop: "16px",
            letterSpacing: "0.5px", // Немного увеличим интервал между буквами
            textAlign: "justify", // Выравниваем текст по ширине для лучшего восприятия
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)", // Легкая тень для выделения
            textAlign: "center",
          }}
        >
          Это были исторические Игры для Кыргызстана, и спортсмены страны
          продолжат усердно тренироваться, готовясь к новым достижениям на
          международных аренах.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" }, // Адаптивный размер текста
            lineHeight: "1.8", // Увеличиваем межстрочный интервал
            color: "#fff", // Белый цвет текста
            marginTop: "16px",
            letterSpacing: "0.5px", // Немного увеличим интервал между буквами
            textAlign: "justify", // Выравниваем текст по ширине для лучшего восприятия
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)", // Легкая тень для выделения
            textAlign: "center",
          }}
        >
          Важно отметить, что несмотря на небольшой итоговый результат, успехи
          спортсменов Кыргызстана имеют большое значение для развития спорта в
          стране.
        </Typography>
      </Box>
      <PhotoGallery />
    </Box>
  );
};
export default MedalTable;
