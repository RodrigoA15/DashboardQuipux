import {
  Button,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { show_alert } from "functions";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModalAclt from "./modal";
import BasicModal from "./modal";

const { useState } = require("react");

function ApiAclaratorio() {
  const [open, setOpen] = useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  const [aclaratorio, setAclaratorio] = useState("");
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [Data, setData] = useState([]);

  const handleOpen = (rowData) => {
    setSelectedRowData(rowData);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedRowData(null);
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setAclaratorio(event.target.value);
  };

  const consumo = async () => {
    if (aclaratorio.trim() === "") {
      show_alert("El termino busqueda no puede estar vacio");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3500/api/aclaratorios/${aclaratorio}`);
      if (response.data.length > 0) {
        setData(response.data);
      } else {
        show_alert("No se encontro el usuario");
      }
    } catch (error) {
      console.log("Error: " + error);
      show_alert("Error de server");
    }
  };

  return (
    <div>
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={aclaratorio}
          placeholder="Busqueda por Numero de identificacion"
          onChange={handleInputChange}
          type="number"
        />
        <button className="btn btn-success" onClick={consumo}>
          <Icon>search</Icon>
        </button>
      </div>

      <TableContainer component={Paper} sx={{ border: 1 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableRow>
            <TableCell>
              <b>ID_USUARIO</b>
            </TableCell>
            <TableCell>
              <b>NRO_COMPARENDO</b>
            </TableCell>
            <TableCell>
              <b>NOMBRE_USUARIO</b>
            </TableCell>
            <TableCell>
              <b>APELLIDO_USUARIO</b>
            </TableCell>
            <TableCell>
              <b>FECHA</b>
            </TableCell>
            <TableCell>
              <b>DIRECCION</b>
            </TableCell>
            <TableCell>
              <b>NUMERO_PLACA</b>
            </TableCell>
            <TableCell>
              <b>OBSERVACIONES_COMPARENDO</b>
            </TableCell>
            <TableCell>
              <b>ACCIONES</b>
            </TableCell>
          </TableRow>

          <TableBody>
            {Data.map((row) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope={row}>
                  {row.ID_USUARIO}
                </TableCell>
                <TableCell align="center">{row.NRO_COMPARENDO}</TableCell>
                <TableCell align="center">{row.NOMBRE_USUARIO}</TableCell>
                <TableCell align="center">{row.APELLIDO_USUARIO}</TableCell>
                <TableCell align="center">{row.FECHA}</TableCell>
                <TableCell align="">{row.DIRECCION}</TableCell>
                <TableCell align="center">{row.NUMERO_PLACA}</TableCell>
                <TableCell align="center">{row.OBSERVACIONES_COMPARENDO}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpen(row)}>
                    <RemoveRedEyeIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <BasicModal open={open} handleClose={handleClose} rowData={selectedRowData} />
        </Table>
      </TableContainer>
    </div>
  );
}
export default ApiAclaratorio;
