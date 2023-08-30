import { Button, Icon } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import ModeIcon from "@mui/icons-material/Mode";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function PendienteAclt() {
  const [pendienteAclt, setPendienteAclt] = useState([]);
  const [handleInputChange, setHandleInputChnge] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    setHandleInputChnge(e.target.value);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const consumoApiget = async () => {
    try {
      const pendientes = await axios.get(
        `http://localhost:3500/api/pendienteAclt/${handleInputChange}`
      );
      console.log(pendientes);
      if (pendientes.data.length > 0) return setPendienteAclt(pendientes.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("No se encontro el usuarioSSSS");
      } else {
        toast.error("Error de servidor");
      }
    }
  };

  const consumoApiput = async (CONSECUTIVO_MODIFICACION, DESCRIPCION_MODIFICACION) => {
    const MySwal = withReactContent(Swal);
    try {
      const alerta = await MySwal.fire({
        title: "Esta seguro de actualizar?",
        text: "Actualizar a pendiente Aclaratorio",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si actualizar",
        cancelButtonText: "Cancelar",
      });

      if (alerta.isConfirmed) {
        await axios.put(`http://localhost:3500/api/pendienteAclt/${CONSECUTIVO_MODIFICACION}`, {
          DESCRIPCION_MODIFICACION:
            DESCRIPCION_MODIFICACION + "  PENDIENTE ACLARATORIO " + "RLMFDS",
        });
        toast.success("Actualizado Correctamente");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Toaster position="top-center" richColors expand={true} offset="80px" />
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={handleInputChange}
          placeholder="Busqueda por Numero de identificacion"
          onChange={handleChange}
          type="text"
        />
        <button className="btn btn-success" onClick={consumoApiget}>
          <Icon>search</Icon>
        </button>
      </div>
      <div className="table-responsive">
        <table className="table ">
          <thead className="h6">
            <tr>
              <th scope="col">IDENTIFICADOR MODIFICADO</th>
              <th scope="col">FECHA COMPARENDO</th>
              <th scope="col">PLACA AG</th>
              <th scope="col">NOMBRE AG</th>
              <th scope="col">COD SIMIT</th>
              <th scope="col">ESTADO COMP</th>
              <th scope="col">DESC ESTADO</th>
              <th scope="col">CONSECUTIVO MOD</th>
              <th scope="col">USUARIO QX</th>
              <th scope="col">FECHA MOD</th>
              <th scope="col">DESCR MOD</th>
              <th scope="col">OBS COMP</th>
              <th scope="col">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {pendienteAclt.map((data) => (
              <tr key={data.CONSECUTIVO_MODIFICACION}>
                <td>{data.IDENTIFICADOR_MODIFICADO}</td>
                <td>{data.FECHACOMPARENDO}</td>
                <td>{data.PLACA_AGENTE}</td>
                <td>{data.NOMBRES}</td>
                <td>{data.COD_SIMIT}</td>
                <td>{data.ESTADO_COMPARENDO}</td>
                <td>{data.DESCRIPCION_ESTADO}</td>
                <td>{data.CONSECUTIVO_MODIFICACION}</td>
                <td>{data.ID_USUARIO_QX}</td>
                <td>{data.FECHA_MODIFICACION}</td>
                <td>
                  {isExpanded
                    ? data.DESCRIPCION_MODIFICACION
                    : data.DESCRIPCION_MODIFICACION.slice(0, 100) + "..."}
                  <br />
                  <button className="btn btn-primary" onClick={handleExpand}>
                    {isExpanded ? "Ver menos" : "Ver más"}
                  </button>
                </td>

                <td>{data.OBSERVACIONES_COMPARENDO}</td>
                <td>
                  <Button
                    startIcon={<ModeIcon />}
                    onClick={() =>
                      consumoApiput(data.CONSECUTIVO_MODIFICACION, data.DESCRIPCION_MODIFICACION)
                    }
                  >
                    Actualizar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PendienteAclt;
