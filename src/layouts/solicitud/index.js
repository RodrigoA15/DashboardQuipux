import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import MDTypography from "components/MDTypography";
import Pendientes from "./pendientes";
import { useState } from "react";
import Realizados from "./realizados";
import AccesDenied from "assets/images/accessdenied.png";

export default function Solicitud() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getallpend = async (data) => {
    console.log(data);
  };

  const getallsucc = async (data) => {
    console.log(data);
  };

  const user = localStorage.getItem("usuario");

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
                  Solicitudes
                </MDTypography>
              </MDBox>
              {user === "admin" ? (
                <MDBox pt={3}>
                  <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: "grey.500", borderRadius: "16px" }}>
                        <TabList
                          onChange={handleChange}
                          textColor="secondary"
                          indicatorColor="success"
                          aria-label="secondary tabs example"
                        >
                          <Tab label="Pendientes" value="1" />
                          <Tab label="Realizados" value="2" />
                        </TabList>
                      </Box>
                      <TabPanel value="1">
                        <Pendientes datos={getallpend} />
                      </TabPanel>
                      <TabPanel value="2">
                        <Realizados datos={getallsucc} />
                      </TabPanel>
                    </TabContext>
                  </Box>
                </MDBox>
              ) : (
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item>
                    <CardMedia
                      component="img"
                      alt="accessdenied"
                      height="340"
                      image={AccesDenied}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        <p>NO tienes permiso :/</p>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Solo los administradores pueden ingresar a este espacio :D
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
