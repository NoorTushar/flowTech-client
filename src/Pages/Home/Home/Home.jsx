import { Helmet } from "react-helmet-async";
import Banner from "../../../Components/Banner/Banner";

const Home = () => {
   return (
      <div>
         <Helmet>
            <title>Home | FlowTech</title>
         </Helmet>
         {/* Banner Section */}
         <Banner />
         {/* About Us */}
         <h2>About us</h2>
         {/* Services */}
         <h2>Services</h2>
      </div>
   );
};

export default Home;
