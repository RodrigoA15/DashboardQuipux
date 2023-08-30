import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardActionArea, CardContent } from "@mui/material";
import { Line, Bar } from "react-chartjs-2";

function GraficaActividadAclt() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/actividadAclt");
      setData(response.data);
    } catch (error) {
      console.log(Error);
    }
  };

  const chartData = {
    labels: data.map((item) => item.MES),
    datasets: [
      {
        label: "Actividad Dashboard Aclaratorio",
        fill: false,
        data: data.map((item) => item.MODIFICACIONES),
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
    </div>
  );
}

export default GraficaActividadAclt;
