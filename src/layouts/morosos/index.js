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

function Tables() {
  const [post, setpost] = React.useState([]);
  const [NRO_COMPARENDO_MOROSO, setNroComparendo] = React.useState("");
  const [id_usuario, setId_usuario] = React.useState("");
  const [ESTADO_MOROSO, setEstado] = React.useState("");
  const [FECHA, setFecha_COMPARENDO] = React.useState("");
  const [OBSERVACION, setOBSERVACION] = React.useState("");
  const [factura, setFactura] = React.useState("");
  const [fecha_pago, setFecha_pago] = React.useState("");
  const [check1, setCheck1] = React.useState(true);
  const [check2, setCheck2] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [formattedDate, setFormattedDate] = React.useState("");
  const textareaRef = React.useRef(null);

  React.useEffect(() => {
    const concatenation =
      "usuario: " +
      "5415641" +
      " Modificó el estado moroso del Comparendo No: " +
      NRO_COMPARENDO_MOROSO +
      " Con número de Factura: " +
      factura +
      " Con fecha de pago: " +
      fecha_pago +
      " Fecha de modificacion: " +
      formattedDate;

    textareaRef.current.value = concatenation;
    console.log("Fecha y hora de la solicitud:", formattedDate);
  }, [formattedDate]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      show_alert("El término de búsqueda está vacío", "error");
      return;
    }
    try {
      const response = await axios.get(`http://127.0.0.1:3500/api/compa/${searchTerm}`);

      if (response.data.length > 0) {
        setpost(response.data);
      } else {
        show_alert("No se encontro el comparendo  :(", "error");
      }
    } catch (error) {
      console.log("Error de servidor", error);
      show_alert("error de servidor", "error");
    }
  };

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

  const openmodal = (NRO_COMPARENDO_MOROSO, id_usuario, ESTADO_MOROSO, FECHA, OBSERVACION) => {
    setNroComparendo(NRO_COMPARENDO_MOROSO);
    setId_usuario(id_usuario);
    setEstado(ESTADO_MOROSO);
    // const formato_fecha = new Date(FECHA).toLocaleDateString();
    setFecha_COMPARENDO(FECHA);
    setOBSERVACION(OBSERVACION);
  };
  //////////////////Validacion de campos
  const validar = () => {
    const MySwal = withReactContent(Swal);
    if (!NRO_COMPARENDO_MOROSO || NRO_COMPARENDO_MOROSO.trim() === "") {
      show_alert("Escribe el Numero de comparendo", "warning");
    } else if (!id_usuario || id_usuario.trim() === "") {
      show_alert("Escribe la identifiacion del usuario", "warning");
    } else if (!searchTerm || searchTerm.trim() === "") {
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
      const fecha_comparendo = new Date(FECHA);
      const fecha2 = new Date(fecha_pago);

      if (fecha_comparendo > fecha2) {
        MySwal.fire({
          title: "Fecha no valida",
          text: "La fecha de pago no puede ser inferior a la fecha del comparendo",
          icon: "error",
        });
      } else {
        updateCompa();
        validateDate(fecha_pago);
      }
    }
  };
  //Funciones a ejecutar con el Button
  const handleButtonClick = () => {
    handlePutRequest();
    validar();
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
              "5415641" +
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
            axios.put(`http://127.0.0.1:3500/api/compa/${NRO_COMPARENDO_MOROSO}`, data);
            console.log("siuaaaaaaaaaaaa", setOBSERVACION);
            console.log(data);
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

                <table className="table border">
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
                            disabled={item.ESTADO_MOROSO === "3"}
                          >
                            Editar
                          </button>
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
                          value={id_usuario}
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
                            value={FECHA}
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
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
