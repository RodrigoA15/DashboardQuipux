import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { show_alert } from "functions";

export default function ProtectedAdmin({ children }) {
  const userFound = localStorage.getItem("usuario");

  if (!userFound || (userFound != "admin" && userFound != "user")) {
    show_alert("Inicie sesion ome terco", "warning");
    return <Navigate to="/authentication/sign-in" />;
  }

  return children ? children : <Outlet />;
}

ProtectedAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};
