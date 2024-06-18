import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LinkButton = ({ name, to, width = "auto" }) => {
   return (
      <Link
         to={to}
         className="px-5 py-2 relative bg-ourPrimary group  overflow-hidden  text-white border-2 border-ourPrimary mr-2 hover:border-white hover:text-ourPrimary flex justify-center items-center"
         style={{ width }}
      >
         <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full"></span>
         <span className="relative tracking-widest uppercase">{name}</span>
      </Link>
   );
};

LinkButton.propTypes = {
   name: PropTypes.string,
   to: PropTypes.string,
   width: PropTypes.string,
};

export default LinkButton;
