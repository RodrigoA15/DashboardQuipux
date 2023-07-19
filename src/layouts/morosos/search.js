import axios from "axios";
import { show_alert } from "functions";
import { useState } from "react";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

function Search({ setpost }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm === "") {
      show_alert("El termino busqueda no puede estar Vacio", "warning");
      return;
    }

    try {
      const morosos = await axios.get(`http://127.0.0.1:3500/api/compa/${searchTerm}`);

      if (morosos.data.length > 0) {
        setpost(morosos.data);
      } else {
        show_alert("No se encontro el comparendo  :(", "error");
      }
    } catch (error) {
      console.log("Error de servidor", error);
      show_alert("error de servidor", "error");
    }
  };

  return (
    <div className="containerInput">
      <input
        className="form-control inputBuscar"
        value={searchTerm}
        placeholder="Busqueda por Numero de comparendo"
        onChange={handleInputChange}
      />
      <button className="btn btn-success" onClick={handleSearch}>
        <Icon>search</Icon>
      </button>
    </div>
  );
}

export default Search;

Search.propTypes = {
  setpost: PropTypes.func.isRequired,
};
