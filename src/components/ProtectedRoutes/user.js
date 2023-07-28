// import { Navigate, Outlet } from "react-router-dom";
// import PropTypes from "prop-types";
// import { show_alert } from "functions";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// export default function ProtectedUser({ children }) {
//   const MySwal = withReactContent(Swal);
//   const userFound = localStorage.getItem("usuario");

//   if (!userFound || userFound != "user") {
//     MySwal.fire({
//       title: "No Tienes Permiso",
//       text: "Por Favor Inicia Sesion",
//       icon: "warning",
//     });
//     // return <Navigate to="/authentication/sign-in" />;
//   }

//   return children ? children : <Outlet />;
// }

// ProtectedUser.propTypes = {
//   children: PropTypes.node.isRequired,
// };
