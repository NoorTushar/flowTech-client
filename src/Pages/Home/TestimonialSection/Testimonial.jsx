import PropTypes from "prop-types";

const Testimonial = ({ name, designation, testimonial, image }) => {
   return (
      <>
         <p className="tracking-wider font-extralight">{testimonial}</p>
         <div className="flex gap-4 items-center py-10">
            <img className="size-14 rounded-full" src={image} alt="" />
            <div>
               <h4 className="tracking-[3px] font-light">{name}</h4>
               <h5 className="tracking-[3px] font-extralight">{designation}</h5>
            </div>
         </div>
      </>
   );
};

Testimonial.propTypes = {
   name: PropTypes.string.isRequired,
   designation: PropTypes.string.isRequired,
   testimonial: PropTypes.string.isRequired,
   image: PropTypes.string.isRequired,
};

export default Testimonial;
