import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Card, CardContent } from "@mui/material";
import Confetti from "react-confetti"; // Подключаем библиотеку для салютов
import videoBg from "../homePage/assets/videoBg.mp4"; // Путь к видео
import natureKR from "../homePage/assets/natureKR.mp4"; // Путь к видео
// import "./MainPage.css";

const MainPage = () => {
  // Состояния для управления отображением элементов и логикой викторины
  const [isVisible, setIsVisible] = useState(false); // Отвечает за анимацию появления контента
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Хранит выбранный пользователем ответ
  const [isCorrect, setIsCorrect] = useState(null); // Определяет правильность ответа
  const [showConfetti, setShowConfetti] = useState(false); // Для отображения салютов
  const [isWrongAnswer, setIsWrongAnswer] = useState(false); // Для отслеживания неправильного ответа
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Индекс текущего вопроса
  const [score, setScore] = useState(0); // Количество правильных ответов
  const [quizFinished, setQuizFinished] = useState(false); // Флаг завершения викторины

  // Обработчик прокрутки, который включает анимацию появления контента
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Вопросы викторины
  const questions = [
    {
      question: "Какой самый высокий пик в Кыргызстане?",
      answers: ["Пик Ленина", "Пик Победы", "Пик Манас", "Пик Корона"],
      correctAnswer: "Пик Победы",
    },
    {
      question: "Какой цвет преобладает на флаге Кыргызстана?",
      answers: ["Синий", "Красный", "Зелёный", "Жёлтый"],
      correctAnswer: "Красный",
    },
    {
      question: "Какое национальное блюдо кыргызов?",
      answers: ["Бешбармак", "Лагман", "Манты", "Борщ"],
      correctAnswer: "Бешбармак",
    },
    {
      question: "Какой напиток является традиционным для кыргызов?",
      answers: ["Кумыс", "Айран", "Шубат", "Чай"],
      correctAnswer: "Кумыс",
    },
    {
      question: "Когда Кыргызстан объявил свою независимость?",
      answers: ["1991 год", "1995 год", "1989 год", "2000 год"],
      correctAnswer: "1991 год",
    },
    {
      question: "Какая столица Кыргызстана?",
      answers: ["Бишкек", "Ош", "Нарын", "Талас"],
      correctAnswer: "Бишкек",
    },
    {
      question: "Какой язык является государственным в Кыргызстане?",
      answers: ["Русский", "Казахский", "Кыргызский", "Таджикский"],
      correctAnswer: "Кыргызский",
    },
    {
      question: "Какая валюта используется в Кыргызстане?",
      answers: ["Тенге", "Рубль", "Сом", "Доллар"],
      correctAnswer: "Сом",
    },
    {
      question:
        "Как называется национальный праздник Кыргызстана, посвящённый независимости?",
      answers: ["Нооруз", "День независимости", "Манас", "Ош"],
      correctAnswer: "День независимости",
    },
    {
      question:
        "Какая горная система занимает большую часть территории Кыргызстана?",
      answers: ["Горы Тянь-Шаня", "Кавказ", "Урал", "Альпы"],
      correctAnswer: "Горы Тянь-Шаня",
    },
  ];

  // Обработчик клика по ответу
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    setIsWrongAnswer(!correct);

    if (correct) {
      setScore((prevScore) => prevScore + 1); // Увеличиваем счёт за правильный ответ
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Салют будет отображаться 5 секунд
    } else {
      setTimeout(() => setIsWrongAnswer(false), 1500); // Убираем анимацию через 1.5 секунды
    }

    // Переключаем на следующий вопрос через 3 секунды
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setQuizFinished(true); // Завершаем викторину
      }
    }, 3000); // Увеличиваем задержку
  };

  // Обработчик перезапуска викторины
  const handleRestartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setIsWrongAnswer(false);
  };

  const { question, answers } = questions[currentQuestionIndex];

  return (
    <Box
      className="home-main-page"
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Видео фон */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <video
          className="background-video"
          src={videoBg}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.9))",
          }}
        ></div>
      </Box>

      {/* Контент с анимацией */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
          padding: "20px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease-out",
        }}
      >
        <Box sx={{ maxWidth: "800px" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: "48px",
              marginBottom: "15px",
              fontWeight: "bold",
              fontFamily: "Georgia, serif",
              letterSpacing: "1px",
            }}
          >
            Спортсмены Кыргызстана
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "clamp(16px, 2vw, 22px)",
              fontWeight: "500",
              lineHeight: "1.6",
              maxWidth: "90%",
              margin: "0 auto",
            }}
          >
            Спортсмены Кыргызстана завоевывают признание на международной арене
            в таких видах спорта, как борьба, дзюдо, бокс и легкая атлетика. Эти
            атлеты становятся символами силы, упорства и решимости. Их
            достижения вдохновляют новое поколение, показывая, что стремление к
            победе и трудолюбие открывают путь к вершинам.
          </Typography>
        </Box>
      </Box>

      {/* Блок с изображением с эффектом параллакса */}
      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#121212",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img
          src="https://data.kaktus.media/image/big/2024-08-11_19-52-39_202865.jpg"
          alt="Кыргызстан"
          style={{
            width: "90%",
            maxWidth: "1400px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(255, 255, 255, 0.1)",
            transition: "transform 0.3s ease, filter 0.3s ease",
            transform: "scale(1)",
            filter: "brightness(80%)",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.03)";
            e.target.style.filter = "brightness(100%)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.filter = "brightness(80%)";
          }}
        />
      </Box>

      {/* Викторина с фоновым видео */}
      <Box
        sx={{
          position: "relative",
          padding: "40px 20px",
          color: "white",
          textAlign: "center",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(255, 255, 255, 0.1)",
        }}
      >
        <video
          className="quiz-background-video"
          src={natureKR}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover", // Измени objectFit
            filter: "none",
            zIndex: -1,
          }}
        />
        <Card
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Затемнённый полупрозрачный фон
            borderRadius: "10px", // Скругление углов
            padding: "20px",
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto",
            boxShadow: "0 4px 15px rgba(255, 255, 255, 0.2)", // Тень для карточки
            // backdropFilter: "blur(10px)", // Эффект размытия для лучшей интеграции с видеофоном
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "white", marginBottom: "20px" }}
          >
            {question}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {answers.map((answer, index) => (
              <Card
                key={index}
                onClick={() => handleAnswerClick(answer)}
                sx={{
                  cursor: "pointer",
                  margin: "10px",
                  width: "100%",
                  transition: "all 0.3s ease",
                  backgroundColor:
                    selectedAnswer === answer
                      ? isCorrect
                        ? "rgba(0, 150, 0, 0.7)" // Полупрозрачный зелёный для верного ответа
                        : "rgba(150, 0, 0, 0.7)" // Полупрозрачный красный для неверного ответа
                      : "rgba(255, 255, 255, 0.1)", // Лёгкий прозрачный цвет для карточек
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  filter: "brightness(1.2)", // Яркость для подсветки
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor:
                      selectedAnswer === answer
                        ? isCorrect
                          ? "rgba(0, 150, 0, 0.8)" // Оставляем зеленый цвет при наведении, если ответ правильный
                          : "rgba(150, 0, 0, 0.8)" // Оставляем красный цвет при наведении, если ответ неправильный
                        : "rgba(255, 255, 255, 0.3)", // Подсветка при наведении для невыбранных ответов
                    filter: "brightness(1.2)", // Яркость для подсветки
                  },
                  animation: isWrongAnswer ? "shake 0.6s ease-out" : "none", // Анимация при неправильном ответе
                }}
                className={isWrongAnswer ? "shake" : ""}
              >
                <CardContent>
                  <Typography>{answer}</Typography>
                </CardContent>
              </Card>
            ))}
            {selectedAnswer && (
              <Typography
                sx={{
                  marginTop: "20px",
                  color: isCorrect ? "lightgreen" : "red",
                }}
              >
                {isCorrect ? "Верно!" : "Неверно! Попробуйте ещё раз."}
              </Typography>
            )}
          </Box>
        </Card>
        {showConfetti && <Confetti />}{" "}
        {/* Отображение конфетти при правильном ответе */}
        {quizFinished && (
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="h5" sx={{ color: "white" }}>
              Ваш результат: {score} из {questions.length}
            </Typography>
            <Button
              onClick={handleRestartQuiz}
              sx={{
                marginTop: "20px",
                color: "#fff",
                backgroundColor: "#4CAF50",
                "&:hover": { backgroundColor: "#45a049" },
              }}
            >
              Пройти викторину заново
            </Button>
          </Box>
        )}
      </Box>

      {/* Добавляем CSS для анимации */}
      <style>
        {`
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      50% { transform: translateX(10px); }
      75% { transform: translateX(-10px); }
      100% { transform: translateX(0); }
    }
  `}
      </style>
    </Box>
  );
};

export default MainPage;

// Courier New, monospace

{
  /* <div className="main">
<div className="overlay"></div>
<video className="background-video" src={videoBg} autoPlay loop muted />
<div className="content">
  <h4>
    Recipes, books, establishments - everything for chefs and cooking
    lovers. Let's discover new tastes of the world together!
  </h4>
</div>
</div> */
}
// анимации, красивый дизайн и взаимодействие для привлечения внимания пользователя, в этом коде исправь викторину сделай намного лучше и
