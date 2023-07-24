import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { show_alert } from "functions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ProtectedAdmin({ children }) {
  const MySwal = withReactContent(Swal);
  const userFound = localStorage.getItem("usuario");

  if (!userFound || (userFound != "admin" && userFound != "user")) {
    MySwal.fire({
      title: "No Tienes Accesso",
      text: "Por Favor Inicia Sesion",
      icon: "warning",
    });
    return <Navigate to="/authentication/sign-in" />;
  }

  return children ? children : <Outlet />;
}

ProtectedAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};
