import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export default function Pendientes() {
  const [pendiente, setPendiente] = useState([]);
  useEffect(() => {
    getall();
  }, []);

  const getall = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/state");
      const data = response.data;
      setPendiente(data);
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
    }
  };

  return (
    <div>
      <h2>Componente Hijo</h2>
      <TableContainer component={Paper} sx={{ border: 1 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableRow>
            <TableCell>
              <b>NRO_COMPARENDO_MOROSO</b>
            </TableCell>
            <TableCell>
              <b>ID_USUARIO_MOROSO</b>
            </TableCell>
            <TableCell>
              <b>ESTADO_MOROSO</b>
            </TableCell>
            <TableCell>
              <b>FECHA_COMPARENDO</b>
            </TableCell>
            <TableCell>
              <b>OBSERVACIONES</b>
            </TableCell>
            <TableCell>
              <b>Acciones</b>
            </TableCell>
          </TableRow>

          <TableBody>
            {pendiente.map((row) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.NRO_COMPARENDO_MOROSO}
                </TableCell>
                <TableCell align="center">{row.ID_USUARIO_MOROSO}</TableCell>
                <TableCell align="center">{row.ESTADO_MOROSO}</TableCell>
                <TableCell align="center">{row.FECHA_COMPARENDO}</TableCell>
                <TableCell align="center">{row.OBSERVACION}</TableCell>
                <TableCell align="center">
                  <IconButton>
                    <RemoveRedEyeIcon />
                  </IconButton>
                  <IconButton color="warning">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

Pendientes.propTypes = {
  actualizar: PropTypes.element.isRequired,
};
