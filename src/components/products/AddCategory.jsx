import React, { useState } from "react";
import { useProduct } from "../context/ProductContextProvider";
import { Box, TextField, Button } from "@mui/material";

const AddCategory = () => {
  const { createSport } = useProduct();
  const [sport, setSport] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setSport({ ...sport, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSport(sport);
    setSport({ ...sport, name: "" });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "90%",
        maxWidth: "310px",
        padding: 2,
        border: "1px solid black",
        borderRadius: 1,
        backgroundColor: "#b5ffe1",
        color: "#01263a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "100px auto", // Центрируем элемент
        position: "relative",
        top: "420px",
        left: "-150px",

        "@media (max-width: 1200px)": {
          width: "50%",
          left: "-100px",
        },
        "@media (max-width: 1024px)": {
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          top: "-322px",
          left: "300px",
        },
        "@media (max-width: 992px)": {
          width: "60%",
          left: "0px",
          marginLeft: "auto",
          marginRight: "auto",
          top: "-140px",
        },
        "@media (max-width: 768px)": {
          width: "30%",
          top: "-317px",
          left: "200px",
        },
        "@media (max-width: 480px)": {
          width: "50%",
          top: "-140px",
          left: "-55px",
        },
        "@media (max-width: 320px)": {
          width: "50%",
          top: "-132px",
        },
      }}
    >
      <TextField
        type="text"
        name="name"
        value={sport.name}
        onChange={handleChange}
        label="Название вида спорта"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "16px", backgroundColor: "#ADE8FE" }}
      />
      <Button type="submit" variant="contained" color="primary">
        Добавить категорию
      </Button>
    </Box>
  );
};

export default AddCategory;
