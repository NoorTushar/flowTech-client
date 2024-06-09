import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
   return (
      <div className="relative min-h-screen lg:flex">
         {/* sidebar */}

         <Sidebar></Sidebar>

         {/* Outlet */}

         <div className="flex-1 min-h-[calc(100vh-72px)] lg:ml-64 bg-ourBlack">
            <div className="p-5">
               <Outlet />
            </div>
         </div>
      </div>
   );
};

export default DashboardLayout;
