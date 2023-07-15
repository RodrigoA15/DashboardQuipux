import { useEffect, useState } from "react";
// react-router-dom components
import { Link, Navigate, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/cristiiano.webp";
import axios from "axios";
import { show_alert } from "functions";

function Basic() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://192.168.28.3/json/ValidacionIntranet.aspx?id=" + id + "&pwd=" + pwd,
        {
          method: "POST",
        }
      );
      const respuesta = await response.json();
      console.log(respuesta);
      console.log(respuesta[0].USUARIO);
      console.log(respuesta[0].ROL);

      if (respuesta[0].USUARIO != "NULL" && respuesta[0].ROL != "NULL") {
        if (respuesta[0].USUARIO === "ADM.RODRIGOPAPAMIJA" && respuesta[0].ROL === "001") {
          show_alert("Inicio de sesion como admin", "success");
          navigate("/tables");
          console.log("Inicio de sesion");
        } else {
          show_alert("Inicio de sesion como usuario", "success");
          navigate("/dashboard");
          console.log("Inicio de sesion");
        }
      } else {
        show_alert("Usuario o contraseña incorrectos", "error");
      }

      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Inicio Sesion
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={login}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Numero de identificacion"
                value={id}
                onChange={(e) => setId(e.target.value)}
                fullWidth
                required
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                required
                type="password"
                label="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                fullWidth
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Iniciar Sesion
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
