function ValidationInputs({
  NRO_COMPARENDO_MOROSO,
  factura,
  fecha_pago,
  formattedDate,
  ESTADO_MOROSO,
  OBSERVACION,
  setOBSERVACION,
}) {
  const updateCompa = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Esta Seguro de Modificar el Estado?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, modificar",
      cancelButtonText: "Cancelar",
    })
      .then(async (result) => {
        try {
          if (result.isConfirmed) {
            const updatedObservacion =
              "usuario: " +
              "5415641" +
              " Modificó el estado moroso del Comparendo No: " +
              NRO_COMPARENDO_MOROSO +
              " Con número de Factura: " +
              factura +
              " Con fecha de pago: " +
              fecha_pago +
              " Fecha de modificacion: " +
              formattedDate;

            setOBSERVACION(updatedObservacion);
            const data = {
              ESTADO_MOROSO: ESTADO_MOROSO,
              OBSERVACION: updatedObservacion,
            };
            axios.put(`http://127.0.0.1:3500/api/compa/${NRO_COMPARENDO_MOROSO}`, data);
            console.log("siuaaaaaaaaaaaa", setOBSERVACION);
            console.log(data);
            MySwal.fire({
              title: "Estado Actualizado correctamente",
              icon: "success",
            });
          }
        } catch (error) {
          console.log("error al enviar la solicitud: ", error);
          MySwal.fire({
            title: "Error al actualizar el estado",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.log("PAILA", error);
      });
  };
}

export default ValidationInputs;
