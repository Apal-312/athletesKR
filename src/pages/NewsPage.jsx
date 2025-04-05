import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import "./NewsPage.css";

const StyledCard = styled(Card)({
  marginBottom: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px",
    backgroundColor: "dimgray",
  },
});

const Title = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.2rem",
  color: "#fff",
});

const DateText = styled(Typography)({
  color: "#bbb",
  fontSize: "0.9rem",
  marginBottom: "8px",
});

// const ReadMoreButton = styled(Button)({
//   backgroundColor: "#ff4d6d",
//   color: "#fff",
//   padding: "8px 16px",
//   borderRadius: "20px",
//   "&:hover": {
//     backgroundColor: "#ff1a47",
//   },
// });

const placeholderImage = "https://via.placeholder.com/300";

const NewsCard = ({ news, sx = {} }) => {
  const [imgSrc, setImgSrc] = useState(news.image);
  const navigate = useNavigate(); // Хук navigate

  const handleReadMore = () => {
    // Переход на папку или страницу новости
    navigate(`/detail-news/${news.id}`);
  };

  return (
    <StyledCard sx={{ backgroundColor: "#333" }}>
      <CardMedia
        component="img"
        height="200"
        image={imgSrc}
        alt={news.title}
        onError={() => setImgSrc(placeholderImage)}
        sx={{
          width: "100%",
          height: "300px",
        }}
      />
      <CardContent>
        <Title>{news.title}</Title>
        <DateText>{news.date}</DateText>
        {news.description && (
          <Typography variant="body2" color="#ddd" paragraph>
            {news.description}
          </Typography>
        )}
        <Button
          onClick={handleReadMore}
          sx={{
            backgroundColor: "#bd2828 ",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "#e91818",
            },
          }}
        >
          Читать далее
        </Button>
      </CardContent>
    </StyledCard>
  );
};

const newsData = [
  {
    id: 1,
    title: "Чемпионат Азии по борьбе-2025: у Эрназара Акматалиева - золото!",
    description: "Впервые в своей карьере!!!",
    date: "21:59,  30.03.2025",
    image:
      "https://prosports.kg/upload/news/main//202503/254179_51d2d45eff3b9e8645a242d95de7a921.webp",
  },
  {
    id: 2,
    title: "КПЛ-2025: «Мурас Юнайтед» и «Алай» - лидеры после третьего  тура",
    description:
      "«Мурас Юнайтед» и «Алай» делят первое место в КПЛ-2025 после третьего тура.",
    date: "14:01, 30.03.2025",
    image:
      "https://sport.kg/uploads/posts/2025-03/medium/1743321694_ikonka.jpeg",
  },
  {
    id: 3,
    title: "Сборная Кыргызстана впервые обыграла действующих чемпионов Азии",
    description: "Двухкратный чемпион Азии бит в Бишкеке со счетом 3:1!",
    date: "10:17, 30.03.2025",
    image:
      "https://prosports.kg/upload/news/content//202503/204165_af5400550094fb8511d1361405ab2930.webp?v=29056305",
  },
  {
    id: 4,
    title: "Сестру Валентины Шевченко уволили из UFC",
    description: "Она делает карьеру пилота",
    date: "10:02, 28.03.2025",
    image:
      "https://prosports.kg/upload/news/content//202503/204165_0cc4ccdea0189d29349d1d5cd2ec5d07.webp?v=1743138044548",
  },
  {
    id: 5,
    title: "Еще один борец из Кыргызстана завоевал серебро чемпионата Азии",
    description: "В финале проиграл казахстанцу со счетом 1:2",
    date: "09:02, 31.03.2025",
    image:
      "https://prosports.kg/upload/news/content//202503/254179_9b70a6e41fc74cfe0199e90c32c065c4.webp?v=1743393490459",
  },
  {
    id: 6,
    title: "Калмира Билимбек кызы завоевала бронзу чемпионата Азии",
    description: "Уложила казахстанку на лопатки в схватке за бронзу",
    date: "21:39, 28.03.2025",
    image:
      "https://prosports.kg/upload/news/content//202503/254179_c4c301bc81b36cde74164c64863de587.webp?v=29062637",
  },
  {
    id: 7,
    title: "Айпери Медет кызы — трехкратная чемпионка Азии",
    description:
      "В финале вырвала победу за несколько секунд до финального свистка!!!",
    date: "23:19, 27.03.2025",
    image:
      "https://prosports.kg/upload/news/content//202503/204165_98fbb430d3a2e07824818599f39dea03.webp",
  },
  {
    id: 8,
    title: "Чемпионат Азии по борьбе-2025: у Раззака Бейшекеева - серебро",
    description:
      "Борцы из Кыргызстана продолжают выступление на чемпионате Азии, который проходит в городе Амман (Иордания) с 25 по 30 марта.",
    date: "15:12, 27.03.2025",
    image:
      "https://sport.kg/uploads/posts/2025-03/medium/1743066758_borcy-azija-26-marta.jpg",
  },
  {
    id: 9,
    title:
      "Бронза - в первый день! Борцы из Кыргызстана стартовали на чемпионате Азии",
    description:
      "Борцы из Кыргызстана продолжают выступление на чемпионате Азии, который проходит в городе Амман (Иордания) с 25 по 30 марта.",
    date: "14:09, 26.03.2025",
    image:
      "https://sport.kg/uploads/posts/2025-03/medium/1742976629_borcy-azija-start.jpg",
  },
  {
    id: 10,
    title: "Борцы завоевали 6 медалей на чемпионате Азии в Иордании",
    description:
      "Спортсмены из Кыргызстана завоевали 6 медалей на чемпионате Азии по спортивной борьбе в Иордании. Турнир прошел 25-30 марта в городе Амман, всего разыгрывались 30 комплектов мед...",
    date: "10:00, 01.04.2025",
    image:
      "https://prosports.kg/upload/news/content//202504/254179_8296ca40d6f69f66efa5040605f4cd24.webp?v=29063020",
  },
  {
    id: 11,
    title: "Денис Петрашов выиграл золото на турнире в США",
    date: "15:37, 03.04.2025",
    image:
      "https://cdn-1.aki.kg/cdn-st-0/qf1/1/2762416.a4a14d90eac5c92fe79e8ae209bfd15e.jpg",
  },
  {
    id: 12,
    title: "Рейтинг ФИФА: Кыргызстан - 103-й в апреле 2025 года",
    date: "17:18, 03.04.2025",
    image:
      "https://sport.kg/uploads/posts/2025-04/medium/1743679191_rejting-fifa-aprel.jpg",
  },
];

const NewsPage = () => {
  return (
    <div
      style={{
        position: "relative",
        padding: "20px",
        minHeight: "100vh",
        backgroundImage: `url("https://i.pinimg.com/736x/b6/11/3b/b6113b83c5e8fbfa35062b6de55f9102.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      {/* Затемнение фона */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Полупрозрачный черный слой
          zIndex: 0,
        }}
      ></div>

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        className="news-title" // Добавьте этот класс
        style={{
          marginBottom: "40px",
          color: "#fff",
          padding: "10px",
          borderRadius: "10px",
          position: "relative",
          zIndex: 1,
          fontFamily: "Noto Sans, sans-serif",
          fontWeight: "normal",
        }}
      >
        Новости о спортсменах Кыргызстана (2024-2025)
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        style={{ position: "relative", zIndex: 1 }}
      >
        {newsData.map((news) => (
          <Grid item xs={12} md={6} key={news.id}>
            <NewsCard news={news} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NewsPage;
