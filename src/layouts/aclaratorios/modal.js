import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Icon,
  IconButton,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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

export default function BasicModal({ open, handleClose, rowData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          {rowData && (
            // <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            //   <p>ID: {rowData.ID_USUARIO || "N/A"}</p>
            //   <p>Comparendo: {rowData.NRO_COMPARENDO || "N/A"}</p>
            //   <p>Nombre: {rowData.NOMBRE_USUARIO || "N/A"}</p>
            //   <p>Apellido: {rowData.APELLIDO_USUARIO || "N/A"}</p>
            //   <p>Fecha: {rowData.FECHA || "N/A"}</p>
            //   <p>Dirección: {rowData.DIRECCION || "N/A"}</p>
            //   <p>Número de Placa: {rowData.NUMERO_PLACA || "N/A"}</p>
            //   <p>Observaciones: {rowData.OBSERVACIONES_COMPARENDO || "N/A"}</p>
            // </Typography>

            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="mb-3 col">
                  <label htmlFor="name" className="form-label">
                    ID Usuario
                  </label>
                  <input
                    type="number"
                    className="form-control rounded-pill"
                    id="id_usuario"
                    aria-describedby="emailHelp"
                    value={rowData.ID_USUARIO}
                    {...register("id_usuario", {
                      required: {
                        value: true,
                        message: "Name is required",
                      },
                    })}
                  />
                  {errors.name && <span className="inputForm h4">{errors.id_usuario.message}</span>}
                </div>
                {/* Numero Comparendo */}
                <div className="mb-3 col">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Numero Comparendo
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={rowData.NRO_COMPARENDO}
                    {...register("email", {
                      required: {
                        value: true,
                        message: "email is required",
                      },
                    })}
                  />
                  {errors.email && <span className="inputForm">{errors.email.message}</span>}
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col">
                  <label htmlFor="nombre_usuario" className="form-label">
                    Nombre Usuario
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="nombre_usuario"
                    value={rowData.NOMBRE_USUARIO}
                    {...register("nombre_usuario", {
                      required: {
                        value: true,
                        message: "Please enter your Name",
                      },
                    })}
                  />
                  {errors.nombre_usuario && <span>{errors.nombre_usuario.message}</span>}
                </div>
                <div className="mb-3 col">
                  <label htmlFor="apellido_usuario" className="form-label">
                    Apellido Usuario
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="apellido_usuario"
                    value={rowData.APELLIDO_USUARIO}
                    {...register("apellido_usuario", {
                      required: {
                        value: true,
                        message: "Last Name  is required",
                      },
                    })}
                  />
                  {errors.apellido_usuario && <span>{errors.apellido_usuario.message}</span>}
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col">
                  <label htmlFor="fecha_comp" className="form-label">
                    FECHA COMPARENDO
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="fecha_comp"
                    value={rowData.FECHA}
                    {...register("fecha_comp", {
                      required: {
                        value: true,
                        message: "Birthdate is required",
                      },
                    })}
                  />
                  {errors.fecha_comp && <span>{errors.fecha_comp.message}</span>}
                </div>

                <div className="mb-3 col">
                  <label htmlFor="direccion" className="form-label">
                    Direccion Comparendo
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="direccion"
                    value={rowData.DIRECCION}
                    {...register("direccion", {
                      required: {
                        value: true,
                        message: "Please enter your Name",
                      },
                    })}
                  />
                  {errors.direccion && <span>{errors.direccion.message}</span>}
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col">
                  <label htmlFor="numero_placa" className="form-label">
                    Numero Placa
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="numero_placa"
                    value={rowData.NUMERO_PLACA}
                    {...register("numero_placa", {
                      required: {
                        value: true,
                        message: "Birthdate is required",
                      },
                    })}
                  />
                  {errors.numero_placa && <span>{errors.numero_placa.message}</span>}
                </div>

                <div className="mb-3">
                  <label htmlFor="observacion" className="form-label">
                    Observacion Comparendo
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="observacion"
                    value={rowData.OBSERVACIONES_COMPARENDO || "N/A"}
                    {...register("observacion", {
                      required: {
                        value: true,
                        message: "Please enter your Name",
                      },
                    })}
                  />
                  {errors.observacion && <span>{errors.observacion.message}</span>}
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

BasicModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  rowData: PropTypes.object,
};
