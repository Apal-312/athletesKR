const API_URL = "http://localhost:3000";

// Функция для получения всех продуктов
export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json(); // Возвращает JSON с сервера
};

// Функция для добавления нового продукта
export const addProduct = async (product) => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST", // Используем метод POST для создания нового ресурса
    headers: {
      "Content-Type": "application/json", // Устанавливаем заголовок Content-Type для указания типа данных (JSON)
    },
    body: JSON.stringify(product), // Преобразуем объект продукта в JSON и отправляем на сервер
  });
  return response.json(); // Возвращает JSON-ответ с сервера после добавления
};

// Функция для обновления существующего продукта по его ID
export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT", // Используем метод PUT для обновления ресурса
    headers: {
      "Content-Type": "application/json", // Устанавливаем заголовок Content-Type для указания типа данных (JSON)
    },
    body: JSON.stringify(product), // Преобразуем объект продукта в JSON и отправляем на сервер
  });
  return response.json(); // Возвращает JSON-ответ с сервера после обновления
};

// Функция для удаления продукта по его ID
export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE", // Используем метод DELETE для удаления ресурса
  });
  return response.json(); // Возвращает JSON-ответ с сервера после удаления
};
