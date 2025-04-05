import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContextProvider";
import { ADMIN_EMAIL } from "../../helpers/const";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Navbar.css";

// Компонент Navbar
const Navbar = () => {
  const { user, handleLogOut, loading } = useAuth(); // Извлекаем информацию о пользователе и функцию выхода из контекста
  const [isAdmin, setIsAdmin] = useState(false); // Состояние для проверки, является ли пользователь администратором
  const [drawerOpen, setDrawerOpen] = useState(false); // Состояние для управления открытием/закрытием бокового меню (drawer)

  const theme = useTheme(); // Получаем объект темы из Material-UI
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Проверяем, является ли экран мобильным (по размеру)

  // Эффект для проверки, является ли пользователь администратором
  useEffect(() => {
    if (user) {
      setIsAdmin(user.email === ADMIN_EMAIL); // Если email пользователя совпадает с ADMIN_EMAIL, то он администратор
    }
  }, [user]);

  // Список страниц для отображения в навигации
  const pages = [
    { id: 1, title: "Атлеты", link: "/athletes" },
    { id: 2, title: "Виды спорта", link: "/sports" },
    { id: 3, title: "Медальный зачет", link: "/medal-table" },
    { id: 4, title: "Новости", link: "/news" },
  ];

  // Если пользователь является администратором, добавляем пункт "Админ"
  if (isAdmin) {
    pages.push({ id: 5, title: "Админ", link: "/admin" });
  }

  // Функция для переключения состояния бокового меню (drawer)
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <div style={styles.root}>
      <AppBar position="static" style={styles.appBar}>
        <Toolbar style={styles.toolbar}>
          <div style={styles.leftItems}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Kyrgyzstan_%283-2%29.svg/1599px-Flag_of_Kyrgyzstan_%283-2%29.svg.png?20240311163127"
              style={{ ...styles.icon, width: "auto", height: 40 }}
              alt="Flag"
              // loading="eager" // Устанавливаем атрибут для немедленной загрузки изображения
            />
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                style={styles.menuItem}
                onMouseEnter={(e) => (e.currentTarget.style.color = "red")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
              >
                Спортсмены КР
              </Typography>
            </Link>
          </div>

          {!isMobile && (
            <div style={{ ...styles.centerItems, flex: 1 }}>
              {pages.map((page, index) => (
                <IconButton
                  key={page.id}
                  color="inherit"
                  component={Link}
                  to={page.link}
                  style={{
                    ...styles.menuButton,
                    marginLeft: index > 0 ? 10 : 0,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.firstChild.style.color = "red")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.firstChild.style.color = "#ffffff")
                  }
                >
                  <Typography variant="body1" style={styles.menuItem}>
                    {page.title}
                  </Typography>
                </IconButton>
              ))}
            </div>
          )}

          <div
            style={{
              ...styles.rightItems,
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              style={{ color: "#ffffff", marginRight: "15px" }}
            >
              {user
                ? `Добро пожаловать, ${user.displayName || user.email}`
                : "Добро пожаловать, гость"}
            </Typography>

            {user && (
              <IconButton
                onClick={handleLogOut}
                color="inherit"
                style={{
                  color: "white",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "red")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              >
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  Выйти
                </Typography>
              </IconButton>
            )}

            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
              style={styles.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        style={styles.drawer}
        transitionDuration={500}
      >
        <div style={styles.drawerHeader}>
          <IconButton
            onClick={() => toggleDrawer(false)}
            style={styles.closeButton}
            onMouseEnter={(e) => (e.currentTarget.style.color = "red")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#000")}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <List style={styles.drawerList}>
          {!loading && (
            <ListItem button>
              <Typography style={{ color: "#000000" }}>
                {user
                  ? isAdmin
                    ? `Добро пожаловать, ${user.email}`
                    : `Добро пожаловать, ${user.displayName || user.email}`
                  : "Добро пожаловать, гость"}
              </Typography>
            </ListItem>
          )}
          {!loading && !user && (
            <ListItem
              button
              component={Link}
              to="/register"
              onClick={() => toggleDrawer(false)} // Закрытие меню
            >
              <ListItemText primary="Регистрация" />
            </ListItem>
          )}
          {!loading && user && (
            <ListItem
              button
              onClick={() => {
                handleLogOut();
                toggleDrawer(false); // Закрытие меню при выходе
              }}
            >
              <ListItemText primary="Выйти" />
            </ListItem>
          )}
          {pages.map((page) => (
            <ListItem
              button
              key={page.id}
              component={Link}
              to={page.link}
              onClick={() => toggleDrawer(false)} // Закрытие меню
            >
              <ListItemText primary={page.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

// Стили для компонента
const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    height: "auto",
    overflow: "hidden",
  },
  appBar: {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    overflow: "hidden",
    width: "auto",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Тень для AppBar
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    width: "auto",
    overflow: "hidden",
  },
  leftItems: {
    display: "flex",
    alignItems: "center",
    width: "auto",
    height: "40px",
  },
  centerItems: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "40px",
  },
  rightItems: {
    display: "flex",
    alignItems: "center",
    width: "auto",
    height: "40px",
  },
  menuButton: {
    marginRight: 10,
    overflow: "hidden",
  },
  menuItem: {
    color: "#ffffff",
    transition: "color 0.3s",
    fontSize: "1rem", // Немного больший шрифт для лучшей видимости
    fontWeight: "bold", // Одинаковая толщина текста для согласованности
  },
  icon: {
    width: "auto",
    height: 40,
    marginRight: 10,
  },
  drawerList: {
    width: 250,
    // height: "35%",
    transition: "background-color 0.3s ease",
    // backgroundColor: "rgba(0, 0, 0, 0.1)", // Прозрачный фон
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px",
    height: "40px",
  },
  closeButton: {
    color: "#000",
    // transition: "color 0.3s",
  },
  drawer: {
    backgroundColor: "rgba(0, 0, 0, 0.9)", // Темный фон для современного вида
    transition: "background-color 0.3s ease",
    paddingTop: "10px", // Добавляем отступ сверху для лучшего выравнивания
  },
};

export default Navbar;
