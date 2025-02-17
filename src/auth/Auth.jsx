import React, { useState } from "react";
import { useAuth } from "../components/context/AuthContextProvider";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import "../pages/Auth.css";

const Auth = () => {
  // Извлекаем необходимые функции и состояния из контекста авторизации
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    handleLogin,
  } = useAuth();

  const [isRegister, setIsRegister] = useState(true); // Состояние для переключения между регистрацией и входом
  const [name, setName] = useState(""); // Состояние для имени пользователя при регистрации
  const [confirmPassword, setConfirmPassword] = useState(""); // Состояние для подтверждения пароля
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Ошибка для несовпадения паролей
  const [emailError, setEmailError] = useState(""); // Ошибка для неверной почты
  const [passwordError, setPasswordError] = useState(""); // Ошибка для неверного пароля

  const navigate = useNavigate(); // Инициализируем useNavigate для навигации по страницам

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    // Проверка совпадения паролей
    if (isRegister && password !== confirmPassword) {
      setConfirmPasswordError("Пароли не совпадают");
      return; // Если пароли не совпадают, прекращаем выполнение функции
    }
    setConfirmPasswordError(""); // Сброс ошибки, если пароли совпадают

    // Очистка ошибок
    setEmailError("");
    setPasswordError("");

    // Если есть значения в полях email и password
    if (email && password) {
      if (isRegister) {
        handleRegister(); // Если регистрация, вызываем функцию handleRegister
      } else {
        handleLogin(); // Если вход, вызываем функцию handleLogin
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="left-section">
        <video autoPlay loop muted preload="auto">
          <source src="/video/Flag_of_the_KR.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </div>

      <div className="right-section">
        <div className="auth-form">
          <h2 className="auth-title">{isRegister ? "Регистрация" : "Вход"}</h2>
          <form onSubmit={handleSubmit}>
            {isRegister && (
              // Поле для имени пользователя отображается только при регистрации
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Обновляем состояние имени
                />
              </div>
            )}
            <div className="input-group">
              <input
                type="email"
                placeholder="Электронная почта"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Обновляем состояние email
              />
              <p className="error-msg">{emailError}</p>{" "}
              {/* Отображение ошибки email */}
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Пароль"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Обновляем состояние пароля
              />
              <p className="error-msg">{passwordError}</p>{" "}
              {/* Отображение ошибки пароля */}
            </div>
            {isRegister && (
              // Поле для подтверждения пароля отображается только при регистрации
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Подтвердите пароль"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} // Обновляем состояние confirmPassword
                />
                <p className="error-msg">{confirmPasswordError}</p>{" "}
                {/* Отображение ошибки подтверждения пароля */}
              </div>
            )}
            <div className="btn-container">
              <button type="submit">
                {isRegister ? "Регистрация" : "Вход"}
              </button>
              <p>
                {/* Переключение между формами регистрации и входа */}
                {isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
                <span onClick={() => setIsRegister(!isRegister)}>
                  {isRegister ? "Вход" : "Регистрация"}
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
