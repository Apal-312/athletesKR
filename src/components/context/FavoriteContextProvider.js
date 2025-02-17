import React, { createContext, useContext, useEffect, useReducer } from "react";

// Создаем контекст для избранных атлетов
const FavoriteContext = createContext();

// Хук для использования контекста избранных атлетов
export const useFavorite = () => useContext(FavoriteContext);

// Начальное состояние для редьюсера избранных атлетов
const INIT_STATE = {
  favoriteAthletes: [], // Пустой массив избранных атлетов
};

// Редьюсер для управления состоянием избранных атлетов
const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      // Добавление атлета в избранные
      return {
        ...state,
        favoriteAthletes: [...state.favoriteAthletes, action.payload],
      };
    case "REMOVE_FROM_FAVORITE":
      // Удаление атлета из избранных
      return {
        ...state,
        favoriteAthletes: state.favoriteAthletes.filter(
          (athlete) => athlete.id !== action.payload
        ),
      };
    case "SET_FAVORITES":
      // Установка всех избранных атлетов
      return {
        ...state,
        favoriteAthletes: action.payload,
      };
    default:
      return state;
  }
};

// Провайдер контекста для избранных атлетов
const FavoriteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoriteReducer, INIT_STATE);

  // Загрузка избранных атлетов из локального хранилища при инициализации
  useEffect(() => {
    const favoritesFromStorage = JSON.parse(
      localStorage.getItem("favoriteAthletes")
    );
    if (favoritesFromStorage) {
      dispatch({ type: "SET_FAVORITES", payload: favoritesFromStorage });
    }
  }, []);

  // Сохранение избранных атлетов в локальное хранилище при обновлении состояния
  useEffect(() => {
    localStorage.setItem(
      "favoriteAthletes",
      JSON.stringify(state.favoriteAthletes)
    );
  }, [state.favoriteAthletes]);

  // Функция для добавления атлета в избранные
  const addAthleteToFavorite = (athlete) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: athlete });
  };

  // Функция для удаления атлета из избранных
  const removeAthleteFromFavorite = (id) => {
    dispatch({ type: "REMOVE_FROM_FAVORITE", payload: id });
  };

  // Функция для проверки, есть ли атлет в избранных
  const isAthleteInFavorite = (id) => {
    return state.favoriteAthletes.some((athlete) => athlete.id === id);
  };

  // Значения контекста, доступные для компонентов
  const values = {
    addAthleteToFavorite,
    removeAthleteFromFavorite,
    isAthleteInFavorite,
    favoriteAthletes: state.favoriteAthletes,
  };

  // Возвращаем провайдер контекста с доступными значениями
  return (
    <FavoriteContext.Provider value={values}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
