import { Helmet } from "react-helmet-async";
import Banner from "../../../Components/Banner/Banner";
import ServiceSection from "../../../Components/ServiceSection/ServiceSection";
import VerticalSectionLine from "../../../Components/Shared/VerticalSectionLine/VerticalSectionLine";
import AboutUs from "../AboutUs/AboutUs";

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
      </div>
   );
};

export default Home;
