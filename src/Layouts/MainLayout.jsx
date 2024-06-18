import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";
import { IoIosArrowUp } from "react-icons/io";

const goTopOfPage = () => {
   window.scrollTo({
      top: 0,
      behavior: "smooth",
   });
};

const MainLayout = () => {
   return (
      <div>
         <Navbar />
         <Outlet />
         <Footer />
         <button
            onClick={goTopOfPage}
            className="rounded-full fixed bottom-8 right-8 border-white border p-3 z-50 bg-white"
         >
            <IoIosArrowUp className="text-ourPrimary text-2xl" />
         </button>
      </div>
   );
};

export default MainLayout;
