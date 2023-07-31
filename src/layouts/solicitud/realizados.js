import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Realizados({ datos }) {
  const [realizado, setRealizado] = useState([]);
  useEffect(() => {
    getall();
  }, [datos]);

  const getall = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/states");
      const data = response.data;
      setRealizado(data);
      datos(data);
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
              <b>ESTADO_COMPARENDO</b>
            </TableCell>
            <TableCell>
              <b>FECHA_COMPARENDO</b>
            </TableCell>
            <TableCell>
              <b>FECHA_PAGO</b>
            </TableCell>
            <TableCell>
              <b>OBSERVACIONES</b>
            </TableCell>
          </TableRow>

          <TableBody>
            {realizado.map((row) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.NRO_COMPARENDO_MOROSO}
                </TableCell>
                <TableCell align="center">{row.ID_USUARIO_MOROSO}</TableCell>
                <TableCell align="center">{row.ESTADO_MOROSO}</TableCell>
                <TableCell align="center">{row.FECHA_COMPARENDO}</TableCell>
                <TableCell align="center">{row.FECHA_PAGO}</TableCell>
                <TableCell align="center">{row.OBSERVACIONES}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

Realizados.propTypes = {
  datos: PropTypes.func.isRequired,
};
