import ApiAclaratorio from "./apiAclt";
import { Card, Grid, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Aclaratorios() {
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
            <MDBox pt={3}>
              <ApiAclaratorio />
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Aclaratorios;
