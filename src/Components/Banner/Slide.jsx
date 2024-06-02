import PropTypes from "prop-types";
import LinkButton from "../Shared/Button/LinkButton";

const Slide = ({ bgImg, swiperRef }) => {
   return (
      <div
         className="hero min-h-[calc(100vh)]"
         style={{
            backgroundImage: `url(${bgImg})`,
         }}
      >
         <div className="hero-overlay bg-opacity-80"></div>
         <div className="hero-content text-start ">
            <div className="max-w-3xl">
               <h4 className="text-ourPrimary text-lg mb-2 tracking-[5px] uppercase font-medium">
                  welcome to flowtech agency
               </h4>
               <h1 className="mb-5 text-[56px] lg:text-[86px] text-white font-semibold text-ourOrange tracking-[3px] md:leading-[60px] uppercase">
                  digital agency
                  <br /> <span className="text-stroke">solutions</span>
               </h1>

               <div className="flex justify-start">
                  <LinkButton name={"our services"} width="160px"></LinkButton>
               </div>
               <div className="custom-navigation">
                  <button
                     onClick={() => swiperRef.current?.slidePrev()}
                     className="custom-prev"
                  >
                     Prev
                  </button>
                  <button
                     onClick={() => swiperRef.current?.slideNext()}
                     className="custom-next"
                  >
                     Next
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

Slide.propTypes = {
   bgImg: PropTypes.string.isRequired,
   swiperRef: PropTypes.object.isRequired,
};

export default Slide;
