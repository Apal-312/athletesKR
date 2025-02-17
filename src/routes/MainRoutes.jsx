import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../components/homePage/MainPage";
import AdminPage from "../pages/AdminPage";
import SportsPage from "../pages/SportsPage";
import AthletesPage from "../pages/AthletesPage";
import EditAthletes from "../components/products/EditAthletes";
import Auth from "../auth/Auth";
import MedalTable from "../pages/MedalTable";

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    { id: 1, link: "/", element: <MainPage /> },
    { id: 2, link: "/athletes", element: <AthletesPage /> },
    { id: 3, link: "/edit/:id", element: <EditAthletes /> },
    { id: 4, link: "/athletesPage", element: <AthletesPage /> },
    { id: 5, link: "/sports", element: <SportsPage /> },
    { id: 6, link: "/admin", element: <AdminPage /> },
    { id: 7, link: "/register", element: <Auth /> },
    { id: 8, link: "/medal-table", element: <MedalTable /> },
  ];
  return (
    <Routes>
      {PUBLIC_ROUTES.map((elem) => (
        <Route key={elem.id} path={elem.link} element={elem.element} />
      ))}
    </Routes>
  );
};

export default MainRoutes;
