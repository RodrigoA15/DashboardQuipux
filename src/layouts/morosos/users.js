import axios from "axios";
import { show_alert } from "functions";
import { useEffect, useState } from "react";

export default function SendRequest() {
  const [NRO_COMPARENDO_MOROSO, setNRO_COMPARENDO_MOROSO] = useState("");
  const [ID_USUARIO_MOROSO, setID_USUARIO_MOROSO] = useState("");
  const [ESTADO_MOROSO, setESTADO_MOROSO] = useState("");
  const [FECHA_COMPARENDO, setFECHA_COMPARENDO] = useState("");
  const [OBSERVACION, setOBSERVACION] = useState("");
  const [ESTADO, setESTADO] = useState("");

  const datos = {
    NRO_COMPARENDO_MOROSO: NRO_COMPARENDO_MOROSO,
    ID_USUARIO_MOROSO: ID_USUARIO_MOROSO,
    ESTADO_MOROSO: ESTADO_MOROSO,
    FECHA_COMPARENDO: FECHA_COMPARENDO,
    OBSERVACION: OBSERVACION,
    ESTADO: ESTADO,
  };

  const createNotification = async () => {
    try {
      const response = await axios.post("http://localhost:3500/api/moroso", {
        NRO_COMPARENDO_MOROSO: NRO_COMPARENDO_MOROSO,
        ID_USUARIO_MOROSO: ID_USUARIO_MOROSO,
        ESTADO_MOROSO: ESTADO_MOROSO,
        FECHA_COMPARENDO: FECHA_COMPARENDO,
        OBSERVACION:
          "usuario: " +
          usuario +
          " Modificó el estado moroso del Comparendo No: " +
          NRO_COMPARENDO_MOROSO +
          " Con número de Factura: " +
          factura +
          " Con fecha de pago: " +
          fecha_pago +
          " Fecha de modificacion: " +
          formattedDate,
        ESTADO: 1,
      });

      if (response.data) {
        show_alert("Solicitud enviada", "success");
      } else {
        show_alert("No se pudo enviar la solicitud", "error");
      }
    } catch (error) {
      show_alert("error de servidor", "error");
      console.log(error);
    }
  };
}
