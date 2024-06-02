import { Helmet } from "react-helmet-async";
import Banner from "../../../Components/Banner/Banner";
import ServiceSection from "../../../Components/ServiceSection/ServiceSection";
import VerticalSectionLine from "../../../Components/Shared/VerticalSectionLine/VerticalSectionLine";
import AboutUs from "../AboutUs/AboutUs";
import TestimonialSection from "../TestimonialSection/TestimonialSection";
import TestiBg from "../TestimonialSection/testi-bg.jpg";

const Home = () => {
   return (
      <div>
         <Helmet>
            <title>Home | FlowTech</title>
         </Helmet>
         {/* Banner Section */}
         <Banner />
         {/* About Us */}
         <section className="bg-ourLighterBlack py-[60px] md:py-[100px] relative">
            <AboutUs />
            <VerticalSectionLine />
         </section>
         {/* Services */}
         <section className="bg-ourBlack py-[60px] md:py-[100px] relative">
            <ServiceSection />
            <VerticalSectionLine />
         </section>
         {/* Testimonials */}
         <section
            style={{ backgroundImage: `url(${TestiBg})` }}
            className="bg-ourBlack py-[60px] md:py-[100px] relative bg-no-repeat bg-center bg-cover bg-fixed"
         >
            <VerticalSectionLine />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20"></div>
            {/* Content */}
            <div className="relative z-10">
               <TestimonialSection />
            </div>
         </section>
      </div>
   );
};

export default Home;
