import PropTypes from "prop-types";

const ServiceCard = ({ title, description, icon: Icon, index }) => {
   return (
      <div className="bg-ourLighterBlack p-10 group hover:bg-[#d55b48] duration-300 flex flex-col">
         <Icon className="text-ourPrimary text-4xl mb-4 group-hover:text-white duration-300" />
         <h3 className="font-light text-white uppercase text-xl tracking-[3px] duration-300">
            {title}
         </h3>
         <div className="bg-ourAsh h-[0.3px] w-[70px] group-hover:w-full my-3 group-hover:bg-white duration-500"></div>
         <p className="text-ourAsh leading-[28px] group-hover:text-white duration-300 flex-1 font-didact normal-case">
            {description}
         </p>
         <h5 className="text-3xl text-ourPrimary text-end duration-300 group-hover:text-white">
            {index + 1}
         </h5>
      </div>
   );
};

ServiceCard.propTypes = {
   title: PropTypes.string.isRequired,
   description: PropTypes.string.isRequired,
   icon: PropTypes.elementType.isRequired,
   index: PropTypes.number.isRequired,
};

export default ServiceCard;
