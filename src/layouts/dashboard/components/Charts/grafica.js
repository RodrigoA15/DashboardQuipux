import { Card, CardActionArea, CardContent, Divider, Grid } from "@mui/material";
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
import GraficaActividadAclt from "./graficaActividadAclt";

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
        label: "Años con mas actualizaciones",
        data: data.map((item) => item.NUM_OBSERVACIONES),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Card sx={{ maxWidth: 545 }}>
        <CardActionArea>
          <CardContent>
            {chartData.labels && chartData.datasets ? (
              <Line data={chartData} />
            ) : (
              <h1>Cargando...</h1>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
      <div className="mt-5">
        <GraficaActividadAclt />
      </div>
    </div>
  );
};

export default Grafica;
