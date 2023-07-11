import axios from "axios";
import "./consumo.css";
import Icon from "@mui/material/Icon";
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import { Pagination } from "@mui/material";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [ID_USUARIO_MOROSO, setNroComparendo_moroso] = useState([]);

  const getUsers = async () => {
    await axios.get(`http://127.0.0.1:3500/api/compa/1002808089`).then((response) => {
      console.log(response.data);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
};

export default Search;
