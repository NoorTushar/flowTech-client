import { useRef } from "react";
import bg1 from "../../assets/a12-bg-1.jpg";
import bg2 from "../../assets/a12-bg-2.jpg";
import bg3 from "../../assets/a12-bg-3.jpg";
import "./Banner.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import Slide from "./Slide";

const Banner = () => {
   const swiperRef = useRef(null);

   return (
      <>
         <Swiper
            onSwiper={(swiper) => {
               swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            effect={"fade"}
            loop={true}
            autoplay={{
               delay: 3500,
               disableOnInteraction: false,
            }}
            modules={[Pagination, Navigation, Autoplay, EffectFade]}
            className="mySwiper"
         >
            <SwiperSlide>
               <Slide bgImg={bg1} swiperRef={swiperRef}></Slide>
            </SwiperSlide>

            <SwiperSlide>
               <Slide bgImg={bg2} swiperRef={swiperRef}></Slide>
            </SwiperSlide>

            <SwiperSlide>
               <Slide bgImg={bg3} swiperRef={swiperRef}></Slide>
            </SwiperSlide>
         </Swiper>
      </>
   );
};

export default Banner;
