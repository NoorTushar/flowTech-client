import { Navigate } from "react-router-dom";

import PropTypes from "prop-types";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import useRole from "../Hooks/useRole";
const HRRoute = ({ children }) => {
   const [role, isLoading] = useRole();

   if (isLoading) return <LoadingSpinner />;
   if (role === "hr") return children;
   return <Navigate to="/dashboard" />;
};

export default HRRoute;

HRRoute.propTypes = {
   children: PropTypes.element,
};
