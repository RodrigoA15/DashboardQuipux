import axios from "axios";
import { show_alert } from "functions";
import { useState } from "react";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { DisabledByDefault } from "@mui/icons-material";

function Search({ setpost }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    const MySwal = withReactContent(Swal);
    if (searchTerm === "") {
      show_alert("El termino busqueda no puede estar Vacio", "warning");
      return;
    }

    try {
      const morosos = await axios.get(`http://127.0.0.1:3500/api/compa/${searchTerm}`);

      if (morosos.data.length > 0) {
        if (
          morosos.data.some((item) => item.ESTADO_MOROSO === "1" || item.ESTADO_MOROSO === "28")
        ) {
          setpost(morosos.data);
        } else {
          MySwal.fire({
            title: "No se puede Actualizar",
            text: "Este Usuario no cuenta con comparendos para pagar",
            icon: "warning",
          });
        }
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
      <button name="search" className="btn btn-success" onClick={handleSearch}>
        <Icon>search</Icon>
      </button>
    </div>
  );
}

export default Search;

Search.propTypes = {
  setpost: PropTypes.func.isRequired,
};
