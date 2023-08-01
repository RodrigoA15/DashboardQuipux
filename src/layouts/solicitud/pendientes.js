import axios from "axios";
import { useEffect, useState } from "react";
import {
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
//import AbcIcon from "@mui/icons-material/Abc";

export default function Pendientes() {
  const [pendiente, setPendiente] = useState([]);
  const [ESTADO, setESTADO] = useState("");
  const [_id, setId_moroso] = useState("");
  const [NRO_COMPARENDO_MOROSO, setNRO_COMPARENDO_MOROSO] = useState("");
  const [ID_USUARIO_MOROSO, setID_USUARIO_MOROSO] = useState("");
  const [ESTADO_MOROSO, setESTADO_MOROSO] = useState("");
  const [FECHA_COMPARENDO, setFECHACOMPARENDO] = useState("");
  const [NRO_FACTURA, setFACTURA] = useState("");
  const [FECHA_PAGO, setFecha_pago] = useState("");
  const [OBSERVACION, setOBSERVACION] = useState("");
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(true);
  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
    getall();
  }, []);

  const openModal = (
    _id,
    NRO_COMPARENDO_MOROSO,
    ID_USUARIO_MOROSO,
    ESTADO_MOROSO,
    FECHA_COMPARENDO,
    NRO_FACTURA,
    FECHA_PAGO,
    OBSERVACION
  ) => {
    setId_moroso(_id);
    setNRO_COMPARENDO_MOROSO(NRO_COMPARENDO_MOROSO);
    setID_USUARIO_MOROSO(ID_USUARIO_MOROSO);
    setESTADO_MOROSO(ESTADO_MOROSO);
    setFECHACOMPARENDO(FECHA_COMPARENDO);
    setFecha_pago(FECHA_PAGO);
    setFACTURA(NRO_FACTURA);
    setOBSERVACION(OBSERVACION);
  };

  const getall = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/state");
      const data = response.data;
      const count = response.data.length;
      setDataCount(count);
      setPendiente(data);
      console.log(response.data[0]._id);
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
    }
  };

  const updateState = async () => {
    console.log(_id);
    try {
      const estado = await axios.put(`http://127.0.0.1:3500/api/moroso/${_id}`, {
        ESTADO: 2,
      });
      setId_moroso(estado.data);
      console.log(estado);
    } catch (error) {
      console.log("algo malo", error);
    }
  };
  const usuario = localStorage.getItem("user");
  const updateCompa = async () => {
    // Verificar que todas las variables necesarias estén definidas

    const MySwal = withReactContent(Swal);
    try {
      const result = await MySwal.fire({
        title: "¿Está seguro de modificar el estado?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Si, modificar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const updatedObservacion =
          "usuario: " +
          usuario +
          " Modificó el estado moroso del Comparendo No: " +
          NRO_COMPARENDO_MOROSO +
          " Con número de Factura: " +
          NRO_FACTURA +
          " Con fecha de pago: " +
          FECHA_PAGO;

        setOBSERVACION(updatedObservacion);
        const data = {
          ESTADO_MOROSO: ESTADO_MOROSO,
          OBSERVACION: updatedObservacion,
        };

        const sapa = await axios.put(
          `http://127.0.0.1:3500/api/compa/${NRO_COMPARENDO_MOROSO}`,
          data
        );

        // Verificar que la respuesta sea exitosa antes de mostrar el mensaje de éxito
        if (sapa && sapa.status === 200) {
          console.log("siuaaaaaaaaaaaa", setOBSERVACION);
          console.log(sapa);
          updateState();
          MySwal.fire({
            title: "Estado Actualizado correctamente",
            icon: "success",
          });
        } else {
          throw new Error("Error en la solicitud de actualización.");
        }
      }
    } catch (error) {
      console.log("error al enviar la solicitud: ", error);
      MySwal.fire({
        title: "Error al actualizar el estado",
        icon: "error",
      });
    }
  };

  const handleButtonClick = () => {
    updateCompa();
  };

  return (
    <div>
      <h2>Componente Hijo</h2>
      <p>Notificacion pendientes: {dataCount}</p>
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
              <b>NRO_FACTURA</b>
            </TableCell>
            <TableCell>
              <b>FECHA_PAGO</b>
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
                <TableCell align="center">{row.NRO_FACTURA}</TableCell>
                <TableCell align="center">{row.FECHA_PAGO}</TableCell>
                <TableCell align="center">{row.OBSERVACION}</TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={() =>
                      openModal(
                        row._id,
                        row.NRO_COMPARENDO_MOROSO,
                        row.ID_USUARIO_MOROSO,
                        row.ESTADO_MOROSO,
                        row.FECHA_COMPARENDO,
                        row.NRO_FACTURA,
                        row.FECHA_PAGO,
                        row.OBSERVACION
                      )
                    }
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEdit"
                  >
                    <RemoveRedEyeIcon />
                  </IconButton>
                  <IconButton color="warning"></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div id="modalEdit" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">Editar Estado Comparendo Moroso</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {/************************************** * Inputs ***************************************/}
              <div className="input-group mb-3">
                <br></br>
                <span className="input-group-text">
                  <Icon>numbers</Icon>
                </span>
                <input
                  disabled={true}
                  type="text"
                  id="NRO_COMPARENDO_MOROSO_MOROSO"
                  className="form-control"
                  placeholder="Numero Comparendo"
                  value={NRO_COMPARENDO_MOROSO}
                  // onChange={(e) => setNroComparendo(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <Icon>contact_emergency</Icon>
                </span>
                <input
                  disabled={true}
                  type="text"
                  id="identificacionusuario"
                  className="form-control"
                  placeholder="Identificacion Usuario"
                  value={ID_USUARIO_MOROSO}
                  // onChange={(e) => setId_usuario(e.target.value)}
                />
              </div>

              <div className="input-group mb-3">
                <label className="h6" htmlFor="estado_comparendo">
                  Estado Comparendo
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Icon>clear_all</Icon>
                  </span>
                  <input
                    type="text"
                    id="estado"
                    className="form-control"
                    placeholder="Estado "
                    value={ESTADO_MOROSO}
                    onChange={(e) => setESTADO_MOROSO(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group mb-3">
                <label className="h6" htmlFor="fecha_comparendo">
                  Fecha Comparendo
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Icon>calendar_today</Icon>
                  </span>
                  <input
                    disabled={true}
                    type="text"
                    id="fecha"
                    className="form-control"
                    value={FECHA_COMPARENDO}
                  />
                </div>
              </div>
              <div className="input-group">
                <span className="input-group-text">
                  <Icon>numbers</Icon>
                </span>
                <input
                  type="text"
                  id="factura"
                  disabled={true}
                  className="form-control"
                  value={NRO_FACTURA}
                  onChange={(e) => setFACTURA(e.target.value)}
                />
              </div>

              <div className="input-group mb-3">
                <label className="h6" htmlFor="fecha_comparendo">
                  Fecha Pago
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Icon>calendar_today</Icon>
                  </span>
                  <input
                    disabled={true}
                    type="text"
                    id="fecha_pago"
                    className="form-control"
                    value={FECHA_PAGO}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="h6" htmlFor="observacion">
                  Observaciones
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Icon>visibility</Icon>
                  </span>
                  <textarea
                    className="form-control"
                    id="OBSERVACION"
                    rows="3"
                    placeholder="OBSERVACION"
                    //ref={textareaRef}
                    readOnly
                  />
                </div>
              </div>
              {/**************************************** * CheckBox *****************************************/}
              <div className="form-check">
                <input
                  className="form-check-input bg-secondary"
                  type="checkbox"
                  value=""
                  id="check1"
                  onChange={() => setCheck2(!check2)}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Verificacion Simit
                </label>
              </div>
              <div className="form-check ">
                <input
                  className="form-check-input bg-secondary"
                  type="checkbox"
                  value=""
                  id="check2"
                  onChange={() => setCheck1(!check1)}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Verificacion Start
                </label>
              </div>

              <div className="d-grid col-6 mx-auto">
                <button
                  onClick={() => handleButtonClick()}
                  className="btn btn-success"
                  disabled={check1 || check2}
                >
                  Guardar Cambios
                </button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="btn_cerrar"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
