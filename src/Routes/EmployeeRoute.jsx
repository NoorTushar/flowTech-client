import { Navigate } from "react-router-dom";

import PropTypes from "prop-types";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import useRole from "../Hooks/useRole";
const EmployeeRoute = ({ children }) => {
   const [role, isLoading] = useRole();

   if (isLoading) return <LoadingSpinner />;
   if (role === "employee") return children;
   return <Navigate to="/dashboard" />;
};

export default EmployeeRoute;

EmployeeRoute.propTypes = {
   children: PropTypes.element,
};
