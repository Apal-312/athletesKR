import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { API_PRODUCTS, API_CATEGORIES } from "../../helpers/const";
import { useNavigate } from "react-router-dom";

// Создание контекста для продуктов
export const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext);

// Начальное состояние для редюсера
const INIT_STATE = {
  athletes: [], // Состояние для списка спортсменов
  oneAthlete: {}, // Состояние для данных одного спортсмена
  sports: [], // Состояние для списка видов спорта
  categories: [], // Добавлено состояние для категорий
};

// Редюсер для управления состоянием
const productReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_ATHLETES": // Получение списка спортсменов
      return { ...state, athletes: action.payload };
    case "GET_ONE_ATHLETE": // Получение данных одного спортсмена
      return { ...state, oneAthlete: action.payload };
    case "GET_SPORTS": // Получение списка видов спорта
      return { ...state, sports: action.payload };
    case "GET_CATEGORIES": // Добавлен case для категорий
      return { ...state, categories: action.payload };
    default:
      return state; // Возвращаем неизмененное состояние, если нет соответствующего типа действия
  }
};

const ProductContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(productReducer, INIT_STATE);

  // Создание нового спортсмена
  const createAthlete = async (newAthlete) => {
    await axios.post(API_PRODUCTS, newAthlete); // Отправляем запрос на создание спортсмена
    getAthletes(); // Обновление списка спортсменов после добавления
    navigate("/athletes"); // Перенаправляем на страницу со списком спортсменов
  };

  // Получение всех спортсменов
  const getAthletes = (params = {}) => {
    const searchParams = new URLSearchParams(params); /// Добавляем параметры для запроса
    axios
      .get(`${API_PRODUCTS}?${searchParams}`) // Запрашиваем список спортсменов с параметрами
      .then((response) => {
        dispatch({ type: "GET_ATHLETES", payload: response.data }); // Обновляем список спортсменов в состоянии
      })
      .catch((error) => {
        console.error("Error fetching athletes:", error); // Логируем ошибку при запросе
      });
  };

  // Удаление спортсмена
  const deleteAthlete = async (id) => {
    await axios.delete(`${API_PRODUCTS}/${id}`); // Отправляем запрос на удаление спортсмена
    getAthletes(); // Обновление списка после удаления
  };

  // Получение одного спортсмена
  const getOneAthlete = async (id) => {
    try {
      const { data } = await axios.get(`${API_PRODUCTS}/${id}`); // Запрашиваем данные одного спортсмена
      dispatch({ type: "GET_ONE_ATHLETE", payload: data }); // Обновляем данные одного спортсмена в состоянии
    } catch (error) {
      console.error("Error fetching athlete details:", error); // Логируем ошибку при запросе данных
    }
  };

  // Редактирование данных спортсмена
  const editAthlete = async (id, editedAthlete) => {
    await axios.patch(`${API_PRODUCTS}/${id}`, editedAthlete); // Отправляем запрос на редактирование данных спортсмена
    getAthletes(); // Обновление списка спортсменов после редактирования
    navigate("/athletes"); // Перенаправляем на страницу со списком спортсменов
  };

  // Создание новой категории (вида спорта)
  const createSport = async (newSport) => {
    await axios.post(API_CATEGORIES, newSport); // Отправляем запрос на создание новой категории
    getSports(); // Обновление списка видов спорта после добавления
    navigate("/athletes"); // Перенаправляем на страницу спортсменов
  };

  // Получение всех категорий (видов спорта)
  const getSports = async () => {
    try {
      const { data } = await axios.get(API_CATEGORIES); // Запрашиваем список видов спорта
      dispatch({ type: "GET_SPORTS", payload: data }); // Обновляем список видов спорта в состоянии
      dispatch({ type: "GET_CATEGORIES", payload: data }); // Использование одной и той же функции для категорий
    } catch (error) {
      console.error("Error fetching sports:", error); // Логируем ошибку при запросе данных видов спорта
    }
  };

  // Фильтрация по параметрам
  const fetchByParams = (query, value) => {
    const search = new URLSearchParams(window.location.search); // Получаем параметры из URL
    if (value === "all") {
      // Убираем параметр, если выбран "все"
      search.delete(query);
    } else {
      search.set(query, value); // Добавляем или изменяем параметр
    }
    const url = `${window.location.pathname}?${search}`; // Формируем новый URL
    navigate(url); // Перенаправляем на новый URL
    getAthletes(Object.fromEntries(search.entries())); // Обновляем список с учетом новых параметров
  };

  // Получение данных одного спортсмена
  const fetchOneProduct = async (id) => {
    try {
      const { data } = await axios.get(`${API_PRODUCTS}/${id}`); // Запрашиваем данные одного спортсмена
      dispatch({ type: "GET_ONE_ATHLETE", payload: data }); // Обновляем данные одного спортсмена в состоянии
    } catch (error) {
      console.error("Error fetching product details:", error); // Обновляем данные одного спортсмена в состоянии
    }
  };

  // Объект значений, передаваемых через контекст
  const values = {
    createAthlete,
    getAthletes,
    athletes: state.athletes, // Список спортсменов
    deleteAthlete,
    getOneAthlete,
    oneAthlete: state.oneAthlete, // Данные одного спортсмена
    editAthlete,
    createSport,
    getSports,
    sports: state.sports, // Список видов спорта
    categories: state.categories, // Список категорий (видов спорта)
    fetchByParams,
    fetchOneProduct,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export default ProductContextProvider;
