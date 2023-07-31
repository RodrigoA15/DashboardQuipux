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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import typography from "assets/theme/base/typography";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);

  const removeData = (e) => {
    if (localStorage.getItem("usuario")) {
      localStorage.removeItem("usuario");
    }
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    }
    if (localStorage.getItem("rol")) {
      localStorage.removeItem("rol");
    }
    if (localStorage.getItem("logueado")) {
      localStorage.removeItem("logueado");
    }
    setLoggedIn(false);
    // window.location.reload();
  };

  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, Movit
        <MDBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}></MDBox>
        <Link href={href} target="_blank">
          <MDTypography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </MDTypography>
        </Link>
        Popayán, Carrera 2 con Calle 25 Norte
        {loggedIn ? (
          <Button onClick={removeData} variant="text">
            Cerrar Sesión
          </Button>
        ) : (
          navigate("/authentication/sign-in")
        )}
      </MDBox>

      <MDBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      ></MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { name: "Movilidad Inteligente." },
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
