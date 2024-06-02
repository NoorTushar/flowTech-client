import { TestimonialData } from "./TestimonialData";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import Testimonial from "./Testimonial";

import "./TestimonialSection.css";

const TestimonialSection = () => {
   return (
      <div className="relative max-w-[1170px] mx-auto w-[88%] md:w-[82%]">
         <div className="w-fit mx-auto max-w-[350px] sm:max-w-[450px] md:ml-auto md:mr-0">
            <div className="bg-ourPrimary p-10 text-white">
               <h3 className="uppercase text-xl tracking-[3px]">
                  WHAT CLIENT`S SAY?
               </h3>
               <div className="bg-white h-[0.3px] mt-3 mb-5 "></div>
               <Swiper
                  autoplay={{
                     delay: 3500,
                     disableOnInteraction: true,
                  }}
                  loop={true}
                  pagination={{
                     clickable: true,
                  }}
                  modules={[Pagination, Autoplay]}
                  className="mySwiper"
               >
                  {TestimonialData.map((item) => (
                     <SwiperSlide key={item.image}>
                        <Testimonial
                           name={item.name}
                           designation={item.designation}
                           image={item.image}
                           testimonial={item.testimonial}
                        />
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </div>
      </div>
   );
};

export default TestimonialSection;
