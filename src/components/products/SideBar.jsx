import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import { useProduct } from "../context/ProductContextProvider"; // Импортируем контекст для работы с продуктами

const SideBar = () => {
  // Состояние для управления открытием/закрытием меню
  const [anchorEl, setAnchorEl] = useState(null);

  // Использование контекста для получения списка видов спорта и функций для работы с ними
  const { sports, getSports, fetchByParams } = useProduct();

  // Хук для работы с параметрами поиска в URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Состояние для хранения текущего значения поиска
  const [search, setSearch] = useState(searchParams.get("q") || "");

  // Состояние для хранения выбранного вида спорта
  const [selectedSport, setSelectedSport] = useState("");

  // Загрузка списка видов спорта при монтировании компонента
  useEffect(() => {
    getSports(); // Вызываем функцию для получения списка видов спорта
  }, [getSports]);

  // Установка выбранного вида спорта из параметров URL при изменении searchParams
  useEffect(() => {
    setSelectedSport(searchParams.get("sport") || ""); // Устанавливаем значение выбранного вида спорта из параметров
  }, [searchParams]);

  // Обработчик открытия меню
  const handleOpenNavMenu = (event) => {
    setAnchorEl(event.currentTarget); // Открываем меню, устанавливая anchorEl
  };

  // Обработчик закрытия меню
  const handleCloseNavMenu = () => {
    setAnchorEl(null); // Закрываем меню
  };

  // Обработчик изменения текста поиска
  const handleSearchChange = (event) => {
    const searchText = event.target.value; // Получаем значение текста поиска
    setSearch(searchText); // Обновляем состояние для текста поиска

    // Обновление параметров поиска в URL
    const params = new URLSearchParams();
    if (searchText) params.set("q", searchText); // Добавляем параметр q (поиск) в URL
    if (selectedSport) params.set("sport", selectedSport); // Добавляем параметр sport (вид спорта) в URL
    setSearchParams(params); // Обновляем параметры URL

    // Выполнение поиска с новыми параметрами
    fetchByParams(params);
  };

  // Обработчик изменения выбранного вида спорта
  const handleSportChange = (event) => {
    const sport = event.target.value; // Получаем выбранный вид спорта
    setSelectedSport(sport); // Обновляем состояние для выбранного вида спорта

    // Обновление параметров поиска в URL
    const params = new URLSearchParams();
    if (search) params.set("q", search); // Добавляем параметр q в URL
    if (sport) params.set("sport", sport); // Добавляем параметр sport в URL
    setSearchParams(params); // Обновляем параметры URL

    // Выполнение поиска с новыми параметрами
    fetchByParams(params);
  };

  return (
    <Box sx={{ flexGrow: 1, width: "auto", height: "50px" }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleOpenNavMenu} // Открытие меню при клике
        sx={{ color: "white" }}
      >
        <SearchIcon /> {/* Иконка для поиска */}
      </IconButton>

      {/* Меню для поиска и фильтрации */}
      <Menu
        anchorEl={anchorEl} // Привязываем меню к элементу
        open={Boolean(anchorEl)} // Открываем меню, если anchorEl существует
        onClose={handleCloseNavMenu} // Закрытие меню при клике за пределы
        sx={{
          "& .MuiMenu-paper": {
            backgroundColor: "transparent", // Устанавливаем прозрачный фон для меню
          },
        }}
      >
        {/* Поле поиска */}
        <MenuItem>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 270,
              backgroundColor: "#001d3d", // Устанавливаем темный фон для инпута
            }}
          >
            <TextField
              sx={{
                ml: -0.75,
                flex: 1,
                color: "white", // Белый цвет текста
                backgroundColor: "transparent",
                "& .MuiInputBase-input": {
                  color: "white", // Белый цвет текста в инпуте
                  paddingLeft: "15px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white", // Белая рамка по умолчанию
                },
                "& .MuiInputBase-root": {
                  border: "1px solid white", // Белая рамка
                  borderRadius: "4px", // Скругленные углы
                },
                "& .MuiInputBase-root:hover": {
                  borderColor: "#59a5d8", // Цвет рамки при наведении
                  bgcolor: "#001d3d", // Фон при наведении
                },
              }}
              placeholder="Поиск спортсменов..."
              value={search} // Текущее значение поиска
              onChange={handleSearchChange} // Обработчик изменения текста
              variant="standard"
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{ p: "10px", color: "#90e0ef" }} // Цвет кнопки для поиска
                    aria-label="search"
                    onClick={handleCloseNavMenu} // Закрытие меню при клике на кнопку поиска
                  >
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Paper>
        </MenuItem>

        {/* Фильтр по виду спорта */}
        <MenuItem>
          <FormControl sx={{ bgcolor: "#001d3d" }} variant="outlined" fullWidth>
            <InputLabel sx={{ color: "white" }}>Вид спорта</InputLabel>
            <Select
              value={selectedSport} // Текущее выбранное значение вида спорта
              onChange={handleSportChange} // Обработчик изменения вида спорта
              label="Вид спорта"
              sx={{
                "& .MuiInputBase-root": {
                  color: "white", // Белый цвет текста для инпута
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: selectedSport ? "#001d3d" : "white", // Цвет рамки
                },
                "& .MuiSelect-icon": {
                  color: "white", // Белый цвет стрелки
                },
                "& .MuiSelect-select": {
                  color: "white", // Белый текст в выпадающем списке
                },
              }}
            >
              <MenuItem
                sx={{
                  backgroundColor: "#0077b6 !important", // Цвет фона для элемента по умолчанию
                  color: "white !important", // Белый цвет текста
                }}
                value=""
              >
                Все виды спорта
              </MenuItem>
              {/* Перебор видов спорта и отображение каждого элемента */}
              {sports.map((sport) => (
                <MenuItem
                  key={sport.id}
                  value={sport.name}
                  sx={{
                    bgcolor: "#001d3d", // Синий фон для элементов
                    color: sport.name === selectedSport ? "black" : "white", // Черный цвет для выбранного элемента
                    "&:hover": {
                      bgcolor: "#59a5d8", // Цвет фона при наведении
                      color: "black", // Черный текст при наведении
                    },
                  }}
                >
                  {sport.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SideBar;
