import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";
import "moment/locale/es";

// function Grafica() {
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     moment.locale("es");
//     // Función para obtener los datos de la API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3500/api/fecha?startDate=2023-01-01 00:00:00&endDate=2023-03-28 23:59:00"
//         );
//         const data = response.data;
//         console.log(data);

//         // if (Array.isArray(data) && data.length > 0) {
//         //   const chartLabels = data.map((item) =>
//         //     moment(item.FECHA_MODIFICA_BD).format("DD MMM YYYY")
//         //   );
//         //   const Values = chartLabels.map((label, index) => {
//         //     const count = chartLabels.filter((l) => l === label).length;
//         //     return count;
//         //   });

//         const groupedData = data.reduce((accumulator, current) => {
//           const date = moment(current.FECHA_MODIFICA_BD).format("DD-MMM-YYYY");
//           accumulator[date] = (accumulator[date] || 0) + 1;
//           return accumulator;
//         }, {});

//         // Crear los arrays de fechas y valores para la gráfica
//         const chartLabels = Object.keys(groupedData);
//         const Values = Object.values(groupedData);

//         const chartDataset = {
//           labels: chartLabels,
//           datasets: [
//             {
//               label: "Comparendos Actualizados",
//               data: Values,
//               fill: false,
//               borderColor: "rgb(75, 192, 192)",
//               tension: 0.1,
//             },
//           ],
//         };
//         setChartData(chartDataset);
//       } catch (error) {
//         console.error("Error al obtener los datos de la API", error);
//       }
//     };

//     const timer = setInterval(() => {
//       fetchData();
//     }, 5000); // Actualiza cada 5 segundos

//     // Limpia el temporizador cuando el componente se desmonta
//     return () => clearInterval(timer);
//   }, []);

//   const chartOptions = {};

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Grid container spacing={4}>
//         <Grid item xs={12}>
//           <MDBox mt={4}>
//             {chartData.labels && chartData.datasets ? (
//               <Bar data={chartData} options={chartOptions} />
//             ) : (
//               <p>Cargando datos...</p>
//             )}
//           </MDBox>
//         </Grid>
//       </Grid>
//     </DashboardLayout>
//   );
// }

const Grafica = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/fecha");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = {
    labels: data.map((item) => item.ANIO),
    datasets: [
      {
        label: "Número de observaciones",
        data: data.map((item) => item.NUM_OBSERVACIONES),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MDBox mt={4}>
            {chartData.labels && chartData.datasets ? (
              <Line data={chartData} />
            ) : (
              <h1>Cargando...</h1>
            )}
          </MDBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Grafica;
