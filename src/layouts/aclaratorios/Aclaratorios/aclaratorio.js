import { Icon, IconButton } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModalAclt from "./modalAclt";
function Aclaratorio() {
  const [data, setData] = useState([]);
  const [consecutivo, setCosecutivo] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleOpen = (data) => {
    setSelected(data);
    setOpen(true);
  };

  const handleClose = () => {
    setSelected(null);
    setOpen(false);
  };

  const handleInput = (e) => {
    setCosecutivo(e.target.value);
  };

  const getAclaratorio = async () => {
    if (consecutivo.trim() === "") {
      toast.error("El termino busqueda no puede estar Vacio");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3500/api/aclaratorio/${consecutivo}`);

      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log("Error: " + error);
      if (error.response && error.response.status === 404) {
        toast.error("Este comparendo no tiene Aclaratorios Pendientes");
      } else {
        toast.error("Error de servidor");
      }
    }
  };
  return (
    <div>
      <Toaster position="top-right" richColors expand={true} offset="80px" />
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={consecutivo}
          placeholder="Busqueda por Numero de identificacion"
          onChange={handleInput}
          type="text"
        />
        <button className="btn btn-success" onClick={getAclaratorio}>
          <Icon>search</Icon>
        </button>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead className="h6">
            <tr>
              <th scope="col">IDENTIFICADOR MODIFICADO</th>
              <th scope="col">DESCRIPCION MODIFICADO</th>
              <th scope="col">CONSECUTIVO_MODIFICACION</th>
              <th scope="col">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {data.map((aclaratorio) => (
              <tr key={aclaratorio.CONSECUTIVO_MODIFICACION}>
                <td>{aclaratorio.IDENTIFICADOR_MODIFICADO}</td>
                <td>{aclaratorio.DESCRIPCION_MODIFICACION}</td>
                <td>{aclaratorio.CONSECUTIVO_MODIFICACION}</td>
                <td>
                  <IconButton onClick={() => handleOpen(aclaratorio)}>
                    <RemoveRedEyeIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
          <ModalAclt open={open} handleClose={handleClose} data={selected} />
        </table>
      </div>
    </div>
  );
}

export default Aclaratorio;
