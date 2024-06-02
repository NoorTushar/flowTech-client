import PropTypes from "prop-types";

const Title = ({ suptitle, title, textAlign }) => {
   return (
      <div className={`text-${textAlign || "start"} mb-12`}>
         <h4 className="text-[14px] tracking-[5px] text-ourPrimary uppercase mb-2">
            {suptitle}
         </h4>
         <h2 className="text-white tracking-[5px] uppercase font-medium text-[50px]">
            {title}
         </h2>
      </div>
   );
};

Title.propTypes = {
   suptitle: PropTypes.string,
   title: PropTypes.string,
   textAlign: PropTypes.string,
};

export default Title;