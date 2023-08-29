import { Box, Modal, Typography } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function ModalAclt({ open, handleClose, data }) {
  const [agentes, setAgentes] = useState([]);
  const [selectAgente, setSelectAgente] = useState("");
  const [nroAclaratorio, setNroAclaratorio] = useState("");
  useEffect(() => {
    agentesTTO();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = handleSubmit(() => {
    reset();
  });

  const agentesTTO = async () => {
    const response = await axios.get("http://localhost:3500/api/agentes");
    setAgentes(response.data);
  };

  const hola = "Hola " + nroAclaratorio;
  console.log(hola);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        backdrop="static"
      >
        <Box sx={style}>
          {data && (
            <form onSubmit={onSubmit}>
              <Typography color="red ">Modificaciones</Typography>

              <div className="row">
                <div className="mb-3 col">
                  <label className="form-label h6">Agente</label>
                  <select
                    className="form-select mb-4 rounded-pill "
                    aria-label="Default select example"
                    onChange={(e) => setSelectAgente(e.target.value)}
                  >
                    <option disabled selected>
                      Seleccione un agente
                    </option>
                    {agentes.map((ag) => (
                      <option key={ag.id} value={ag.value}>
                        {ag.NOMBRES} {ag.APELLIDOS}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 col">
                  <label className="form-label h6">Motivo Modificacion</label>

                  <select
                    className="form-select mb-4 rounded-pill "
                    aria-label="Default select example"
                  >
                    <option disabled selected>
                      Seleccione motivo de modificacion
                    </option>
                    <option value="numero_identificacion">Numero Identificacion</option>
                    <option value="tipo_infraccion">Tipo Infraccion</option>
                    <option value="placa">Placa</option>
                    <option value="placa">Cambio Infractor</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col">
                  <label htmlFor="nroAclaratorio" className="form-label">
                    Numero Aclaratorio
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="nroAclaratorio"
                    value={nroAclaratorio}
                    onChange={(e) => setNroAclaratorio(e.target.value)}
                  />
                </div>
                <div className="mb-3 col">
                  <label htmlFor="DESCRIPCION_MODIFICACION" className="form-label">
                    Fecha Aclaratorio
                  </label>
                  <input
                    type="date"
                    className="form-control rounded-pill"
                    id="DESCRIPCION_MODIFICACION"
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col">
                  <label htmlFor="DESCRIPCION_MODIFICACION" className="form-label">
                    DESCRIPCION_MODIFICACION
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="observacion"
                    value={data.DESCRIPCION_MODIFICACION || "N/A"}
                  />
                  {errors.DESCRIPCION_MODIFICACION && (
                    <span className="inputForm">{errors.DESCRIPCION_MODIFICACION.message}</span>
                  )}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default ModalAclt;

ModalAclt.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
