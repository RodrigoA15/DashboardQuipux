/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Icon } from "@mui/material";
import axios from "axios";
import { show_alert } from "functions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function Notifications() {
  const [Direcciones, setDirecciones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const direcciones = async () => {
    if (searchTerm.trim() === "") {
      show_alert("El término de búsqueda está vacío", "error");
      return;
    }
    try {
      const response = await axios.get(`http://127.0.0.1:3500/api/direcciones/${searchTerm}`);

      if (response.data.length > 0) {
        setDirecciones(response.data);
      } else {
        show_alert("No se encontro el usuario :(", "error");
      }
    } catch (error) {
      console.log("Error de servidor", error);
      show_alert("No se encontro el usuario  :(", "error");
    }
  };

  const elimardireccion = async (ID_USUARIO) => {
    const MySwal = withReactContent(Swal);

    try {
      const result = await MySwal.fire({
        title: "¿Está seguro de Eliminar la licencia de conduccion?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, Eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`http://127.0.0.1:3500/api/direcciones/${ID_USUARIO}`);
      }

      MySwal.fire({
        title: "Licencia Eliminada con exito",
        icon: "success",
      });
    } catch (error) {
      show_alert("Error al enviar la solicitud", "error");
      console.log("error al enviar la solicitud", error);
    }
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
                  Direcciones Usuarios Transito
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <div className="containerInput">
                  <input
                    className="form-control inputBuscar"
                    value={searchTerm}
                    placeholder="Busqueda por Numero de identificacion"
                    onChange={handleInputChange}
                    type="number"
                  />
                  <button className="btn btn-success" onClick={direcciones}>
                    <Icon>search</Icon>
                  </button>
                </div>

                <table className="table border">
                  <thead>
                    <tr>
                      <th scope="col">ID USUARIO</th>
                      <th scope="col">Consecutivo Direccion</th>
                      <th scope="col">Direccion</th>
                      <th scope="col">ID municipio</th>
                      <th scope="col">ID Tipo Direccion</th>
                      <th scope="col">Telefono</th>
                      <th scope="col">Acciones </th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {Direcciones.map((item) => (
                      <tr key={item.id}>
                        <td>{item.ID_USUARIO}</td>
                        <td>{item.CONSECUTIVO_DIRECCION}</td>
                        <td className="table-secondary">{item.DIRECCION}</td>
                        <td>{item.ID_MUNICIPIO}</td>
                        <td>{item.ID_TIPO_DIRECCION}</td>
                        <td>{item.TELEFONO}</td>

                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => elimardireccion(item.ID_USUARIO)}
                          >
                            Eliminar Direcciones
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
