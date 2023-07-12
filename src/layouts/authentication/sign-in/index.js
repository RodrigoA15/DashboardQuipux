import { useEffect, useState } from "react";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

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

function Basic() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const login = async () => {
    const res = await axios.get(`http://192.168.28.3/json/ValidacionIntranet.aspx?id=${id}&pwd=${pwd}`);

    if(res.status.success){
      
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
          <MDBox component="form" role="form">
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
