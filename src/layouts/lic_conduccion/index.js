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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@mui/material";
import { show_alert } from "functions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Billing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [Licencia, setLicencia] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      show_alert("El término de búsqueda está vacío", "error");
      return;
    }
    try {
      const response = await axios.get(`http://127.0.0.1:3500/api/lic_conduccion/${searchTerm}`);

      if (response.data.length > 0) {
        setLicencia(response.data);
      } else {
        show_alert("No se encontro el usuario  :(", "error");
      }
    } catch (error) {
      console.log("Error de servidor", error);
      show_alert("No se encontro el usuario  :(", "error");
    }
  };

  const EliminarLicencia = async (ID_USUARIO) => {
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
        const response = await axios.delete(
          `http://127.0.0.1:3500/api/lic_conduccion/${ID_USUARIO}`
        );
        console.log(response.data);

        MySwal.fire({
          title: "Licencia Eliminada correctamente",
          icon: "success",
        });
      }
    } catch (error) {
      show_alert("Error al enviar la solicitud", "error");
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
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
                  Licencias de conduccion
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
                  <button className="btn btn-success" onClick={handleSearch}>
                    <Icon>search</Icon>
                  </button>
                </div>

                <table className="table border">
                  <thead>
                    <tr>
                      <th scope="col">ID USUARIO</th>
                      <th scope="col">Categoria</th>
                      <th scope="col">Fecha Expedicion</th>
                      <th scope="col">Tramite</th>
                      <th scope="col">Poliza</th>

                      <th scope="col">Acciones </th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {Licencia.map((item) => (
                      <tr key={item.id}>
                        <td>{item.ID_USUARIO}</td>
                        <td>{item.ID_CATEGORIA}</td>
                        <td className="table-secondary">{item.FECHA_EXPEDICION}</td>
                        <td>{item.ID_TRAMITE}</td>
                        <td>{item.FECHA_POLIZA}</td>

                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => EliminarLicencia(item.ID_USUARIO)}
                          >
                            Eliminar Licencia
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

export default Billing;
