import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Dashboard/Sidebar/Sidebar";
import useRole from "../Hooks/useRole";

const DashboardLayout = () => {
   const [role, isLoading] = useRole();
   console.log("user role: ", role);
   return (
      <div className="relative min-h-screen lg:flex">
         {/* sidebar */}

         <Sidebar role={role} isLoading={isLoading}></Sidebar>

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
