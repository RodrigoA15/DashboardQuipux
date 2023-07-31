import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import axios from "axios";
import React from "react";
import "./consumo.css";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Alerts
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { show_alert } from "../../functions";
import Footer from "examples/Footer";
import Search from "./search";
import { useState } from "react";

function Tables() {
  const [FECHA_COMPARENDO, setFECHA_COMPARENDO] = useState("");
  const [ID_USUARIO_MOROSO, setID_USUARIO_MOROSO] = useState("");
  const [ESTADO, setESTADO] = useState("");
  const [post, setpost] = React.useState([]);
  const [NRO_COMPARENDO_MOROSO, setNroComparendo] = React.useState("");
  const [ESTADO_MOROSO, setEstado] = React.useState("");
  const [OBSERVACION, setOBSERVACION] = React.useState("");
  const [factura, setFactura] = React.useState("");
  const [fecha_pago, setFecha_pago] = React.useState("");
  const [check1, setCheck1] = React.useState(true);
  const [check2, setCheck2] = React.useState(true);
  const [formattedDate, setFormattedDate] = React.useState("");

  const textareaRef = React.useRef(null);
  const currentDate = new Date();
  const minDate = new Date(
    currentDate.getFullYear() - 5,
    currentDate.getMonth() - 1,
    currentDate.getDate()
  );

  //Muestra la fecha en la cual se hizo la actualizacion
  const handlePutRequest = async () => {
    const currentDate = new Date();
    const date = currentDate.toLocaleString();
    setFormattedDate(date);

    try {
      await updateCompa();
    } catch (error) {
      console.log(error);
    }
  };

  //Validacion de fecha
  const handleDateChange = ({ target: { value } }) => {
    setFecha_pago(value);
    validateDate(value);
  };

  const validateDate = (value) => {
    const MySwal = withReactContent(Swal);
    const maxDate = new Date("2018-06-12");
    const inputDate = new Date(value);
    if (inputDate > maxDate) {
      MySwal.fire({
        title: "Ingresa una fecha valida",
        text: "Las fechas tienen que ser inferiores al 2018-06-12",
        icon: "error",
      });
    }
  };

  const openmodal = (
    NRO_COMPARENDO_MOROSO,
    ID_USUARIO_MOROSO,
    ESTADO_MOROSO,
    FECHA_COMPARENDO,
    OBSERVACION
  ) => {
    setNroComparendo(NRO_COMPARENDO_MOROSO);
    setID_USUARIO_MOROSO(ID_USUARIO_MOROSO);
    setEstado(ESTADO_MOROSO);
    // const formato_fecha = new Date(FECHA).toLocaleDateString();
    setFECHA_COMPARENDO(FECHA_COMPARENDO);
    setOBSERVACION(OBSERVACION);
  };
  //////////////////Validacion de campos
  const validar = () => {
    const MySwal = withReactContent(Swal);
    if (!NRO_COMPARENDO_MOROSO || NRO_COMPARENDO_MOROSO.trim() === "") {
      show_alert("Escribe el Numero de comparendo", "warning");
    } else if (!ID_USUARIO_MOROSO || ID_USUARIO_MOROSO.trim() === "") {
      show_alert("Escribe la identifiacion del usuario", "warning");
    } else if (!ESTADO_MOROSO || ESTADO_MOROSO.trim() === "") {
      show_alert("Escribe el estado del usuario", "warning");
    } else if (ESTADO_MOROSO != 3) {
      MySwal.fire({
        title: "Estado no valido",
        text: "Recuerda que solo puedes actualizar un comparendo a estado pagado  (3)",
        icon: "error",
      });
    } else if (!factura || factura.trim() === "") {
      show_alert("Escribe Factura", "warning");
    } else if (!fecha_pago || fecha_pago.trim() === "") {
      show_alert("Escribe la fecha de pago", "warning");
    } else {
      const fecha_comparendo = new Date(FECHA_COMPARENDO);
      const fecha2 = new Date(fecha_pago);

      if (fecha_comparendo > fecha2) {
        MySwal.fire({
          title: "Fecha no valida",
          text: "La fecha de pago no puede ser inferior a la fecha del comparendo",
          icon: "error",
        });

        return false;
      } else {
        return true;
      }
    }
  };
  //Funciones a ejecutar con el Button de actualizar (admin)
  const handleButtonClick = () => {
    //Update
    handlePutRequest();
    //Validaciones
    validar();
  };

  const buttonnUser = async () => {
    const validacion = await validar();

    if (validacion) {
      createNotification();
    }
  };
  //  Enviar solicitud al Admin
  const createNotification = async () => {
    try {
      const response = await axios.post("http://localhost:3500/api/moroso", {
        NRO_COMPARENDO_MOROSO: NRO_COMPARENDO_MOROSO,
        ID_USUARIO_MOROSO: ID_USUARIO_MOROSO,
        ESTADO_MOROSO: ESTADO_MOROSO,
        FECHA_COMPARENDO: FECHA_COMPARENDO,
        OBSERVACION:
          "usuario: " +
          usuario +
          " Envio una solicitud de actualizacion de  estado moroso del Comparendo No: " +
          NRO_COMPARENDO_MOROSO +
          " Con número de Factura: " +
          factura +
          " Con fecha de pago: " +
          fecha_pago +
          " Fecha de modificacion: " +
          formattedDate,
        ESTADO: 1,
      });

      if (response.data) {
        show_alert("Solicitud enviada", "success");
      } else {
        show_alert("No se pudo enviar la solicitud", "error");
      }
    } catch (error) {
      show_alert("error de servidor", "error");
      console.log(error);
    }
  };

  /////////////////////////////////// Metodo put
  const updateCompa = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Esta Seguro de Modificar el Estado?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, modificar",
      cancelButtonText: "Cancelar",
    })
      .then(async (result) => {
        try {
          if (result.isConfirmed) {
            const updatedObservacion =
              "usuario: " +
              usuario +
              " Modificó el estado moroso del Comparendo No: " +
              NRO_COMPARENDO_MOROSO +
              " Con número de Factura: " +
              factura +
              " Con fecha de pago: " +
              fecha_pago +
              " Fecha de modificacion: " +
              formattedDate;

            setOBSERVACION(updatedObservacion);
            const data = {
              ESTADO_MOROSO: ESTADO_MOROSO,
              OBSERVACION: updatedObservacion,
            };
            const sapa = axios.put(
              `http://127.0.0.1:3500/api/compa/${NRO_COMPARENDO_MOROSO}`,
              data
            );
            console.log("siuaaaaaaaaaaaa", setOBSERVACION);
            console.log(sapa);
            MySwal.fire({
              title: "Estado Actualizado correctamente",
              icon: "success",
            });
          }
        } catch (error) {
          console.log("error al enviar la solicitud: ", error);
          MySwal.fire({
            title: "Error al actualizar el estado",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.log("PAILA", error);
      });
  };

  const user = localStorage.getItem("usuario");
  const usuario = localStorage.getItem("user");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Morosos
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* Buscador */}
                <Search setpost={setpost} />
                {/* Tabla */}
                <table className="table border responsive">
                  <thead>
                    <tr>
                      <th scope="col">Numero Comparendo</th>
                      <th scope="col">Cedula</th>
                      <th scope="col">Estado Comparendo</th>
                      <th scope="col">Fecha Comparendo</th>
                      <th scope="col">OBSERVACION</th>
                      <th scope="col">Acciones </th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {post.map((item) => (
                      <tr key={item.id}>
                        <td>{item.NRO_COMPARENDO_MOROSO}</td>
                        <td>{item.ID_USUARIO_MOROSO}</td>
                        <td className="table-secondary">{item.ESTADO_MOROSO}</td>
                        <td>{item.FECHA}</td>
                        <td>{item.OBSERVACION}</td>

                        <td>
                          {user === "admin" ? (
                            <button
                              onClick={() =>
                                openmodal(
                                  item.NRO_COMPARENDO_MOROSO,
                                  item.ID_USUARIO_MOROSO,
                                  item.ESTADO_MOROSO,
                                  item.FECHA,
                                  item.OBSERVACION
                                )
                              }
                              className="btn btn-warning"
                              data-bs-toggle="modal"
                              data-bs-target="#modalEdit"
                              disabled={item.ESTADO_MOROSO != "1" && item.ESTADO_MOROSO != "28"}
                            >
                              Editar
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                openmodal(
                                  item.NRO_COMPARENDO_MOROSO,
                                  item.ID_USUARIO_MOROSO,
                                  item.ESTADO_MOROSO,
                                  item.FECHA,
                                  item.OBSERVACION
                                )
                              }
                              data-bs-toggle="modal"
                              data-bs-target="#modalEdit"
                              className="btn btn-success"
                              disabled={item.ESTADO_MOROSO === "3"}
                            >
                              Solicitar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/**************************************************** modal **************************************/}
              </MDBox>

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
                            onChange={(e) => setEstado(e.target.value)}
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
                          className="form-control"
                          placeholder="Numero Factura"
                          value={factura}
                          onChange={(e) => setFactura(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label className="h6" htmlFor="fecha">
                          Fecha de pago
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <Icon>calendar_today</Icon>
                          </span>
                          <input
                            type="date"
                            id="fecha"
                            className="form-control"
                            value={fecha_pago}
                            onChange={handleDateChange}
                            max={minDate.toISOString().split("T")[0]}
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
                            ref={textareaRef}
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
                        {user === "admin" ? (
                          <button
                            onClick={() => handleButtonClick()}
                            className="btn btn-success"
                            disabled={check1 || check2}
                          >
                            Guardar Cambios
                          </button>
                        ) : (
                          <button
                            onClick={() => buttonnUser()}
                            className="btn btn-success"
                            disabled={check1 || check2}
                          >
                            Enviar
                          </button>
                        )}
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
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
