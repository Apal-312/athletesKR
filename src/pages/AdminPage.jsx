import React from "react";
import AddAthletes from "../components/products/AddAthletes";
import AddCategory from "../components/products/AddCategory";

const AdminPage = () => {
  return (
    <div
      style={{
        position: "relative", // Позиционирование для родительского контейнера
        backgroundImage: "url(/images/AdminPage.jpeg)", // Устанавливаем фон страницы
        backgroundSize: "cover", // Фон растягивается на весь контейнер
        backgroundPosition: "center", // Центрируем фон
        height: "100vh", // Высота контейнера на всю высоту экрана
        width: "100vw", // Ширина контейнера на всю ширину экрана
        marginTop: "-100px", // Отступ сверху для корректного отображения фона
      }}
    >
      {/* Черная полупрозрачная обводка сверху */}
      <div
        style={{
          position: "absolute", // Абсолютное позиционирование для перекрытия
          top: 0, // Расположение от верхней части контейнера
          left: 0, // Расположение от левой части контейнера
          width: "100%", // Ширина на весь экран
          height: "100%", // Высота на весь экран
          backgroundColor: "rgba(0, 0, 0, 0.2)", // Черный цвет с полупрозрачностью
          zIndex: 1, // Устанавливаем zIndex, чтобы фон был ниже контента
        }}
      ></div>

      {/* Карточки AddAthletes и AddCategory */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Устанавливаем zIndex для карточек, чтобы они отображались выше обводки */}
        <AddAthletes /> {/* Компонент для добавления атлетов */}
        <AddCategory /> {/* Компонент для добавления категории */}
      </div>
    </div>
  );
};

export default AdminPage;
