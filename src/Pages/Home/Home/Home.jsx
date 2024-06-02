import { Helmet } from "react-helmet-async";

const Home = () => {
   return (
      <div>
         <Helmet>
            <title>Home | FlowTech</title>
         </Helmet>
         {/* Banner Section */}
         <h2>Banner</h2>
         {/* About Us */}
         <h2>About us</h2>
         {/* Services */}
         <h2>Services</h2>
      </div>
   );
};

export default Home;
