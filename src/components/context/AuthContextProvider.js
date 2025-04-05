import React, { createContext, useContext, useState, useEffect } from "react";
import fire from "../../fire";
import { useNavigate } from "react-router-dom";

// Создаем контекст авторизации
const authContext = createContext();

// Кастомный хук для использования контекста авторизации
export const useAuth = () => useContext(authContext);

// Компонент провайдера контекста авторизации
const AuthContextProvider = ({ children }) => {
  // Состояния для email, password, пользователя, загрузки и ошибок
  const [email, setEmail] = useState(""); // Состояние для хранения email
  const [password, setPassword] = useState(""); // Состояние для хранения пароля
  const [user, setUser] = useState(null); // Состояние для хранения текущего пользователя
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки
  const [emailError, setEmailError] = useState(""); // Состояние для хранения ошибки email
  const [passwordError, setPasswordError] = useState(""); // Состояние для хранения ошибки пароля
  const navigate = useNavigate(); // Используем useNavigate для перенаправления

  // Функция для регистрации пользователя
  const handleRegister = async () => {
    try {
      // Попытка регистрации пользователя с email и password
      await fire.auth().createUserWithEmailAndPassword(email, password);
      setEmail(""); // Сбрасываем значение email
      setPassword(""); // Сбрасываем значение password
      navigate("/"); // Перенаправляем пользователя после успешной регистрации
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use": // Если email уже используется
        case "auth/invalid-email": // Если email невалиден
          setEmailError(error.message); // Устанавливаем ошибку для email
          break;
        case "auth/weak-password": // Если пароль слишком слабый
          setPasswordError(error.message); // Устанавливаем ошибку для пароля
          break;
        default:
          break;
      }
    }
  };

  // Функция для входа пользователя
  const handleLogin = async () => {
    try {
      await fire.auth().signInWithEmailAndPassword(email, password);
      setEmail(""); // Сбрасываем значение email
      setPassword(""); // Сбрасываем значение password
      navigate("/"); // Перенаправляем пользователя после успешного входа
    } catch (error) {
      // Обработка ошибок входа
      switch (error.code) {
        case "auth/user-disabled": // Если аккаунт заблокирован
        case "auth/invalid-email": // Если email невалиден
        case "auth/user-not-found": // Если пользователь не найден
          setEmailError(error.message); // Устанавливаем ошибку для email
          break;
        case "auth/wrong-password": // Если неправильный пароль
          setPasswordError(error.message); // Устанавливаем ошибку для пароля
          break;
        default:
          break;
      }
    }
  };

  // Функция для выхода пользователя
  const handleLogOut = async () => {
    try {
      // Попытка выхода из системы
      await fire.auth().signOut();
      navigate("/"); // Перенаправляем пользователя после выхода
    } catch (error) {
      console.error("Error logging out: ", error.message);
      alert("Ошибка при выходе из системы. Попробуйте снова.");
    }
  };

  // Функция для отслеживания состояния авторизации пользователя
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Если пользователь авторизован, устанавливаем его в состояние
      } else {
        setUser(null); // Если пользователь не авторизован, очищаем состояние
      }
      setLoading(false); // Останавливаем загрузку после получения состояния авторизации
    });
  };

  // Используем useEffect для запуска отслеживания состояния авторизации
  useEffect(() => {
    authListener();
  }, []);

  return (
    <authContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        user,
        loading,
        emailError,
        passwordError,
        handleRegister,
        handleLogin,
        handleLogOut, // Передаем handleLogOut в контекст
      }}
    >
      {children} {/* Отображаем дочерние компоненты */}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
