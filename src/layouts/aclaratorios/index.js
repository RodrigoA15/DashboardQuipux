import { TabContext, TabList, TabPanel } from "@mui/lab";
import ApiAclaratorio from "./comparendos/apiAclt";
import PendienteAclt from "./PendienteAclt/pendienteAclt";
import { Box, Card, Grid, Icon, Tab } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import Aclaratorio from "./Aclaratorios/aclaratorio";

function Aclaratorios() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
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
                Aclaratorios
              </MDTypography>
            </MDBox>
            {/* Tabs */}
            <MDBox pt={3}>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Pendientes" value="1" />
                      {/* <Tab label="Modificar Comparendo" value="2" /> */}
                      <Tab label="Aclaratorio" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <PendienteAclt />
                  </TabPanel>
                  {/* <TabPanel value="2">
                    <ApiAclaratorio />
                  </TabPanel> */}
                  <TabPanel value="3">
                    <Aclaratorio />
                  </TabPanel>
                </TabContext>
              </Box>
            </MDBox>
            {/* <MDBox pt={3}>
              
            </MDBox> */}
          </Card>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Aclaratorios;
