import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { LuFileSpreadsheet } from "react-icons/lu";

import logo from "../../../assets/FlowTech-Logo.png";

import { AiOutlineBars } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import MenuItem from "../../../Components/Dashboard/Sidebar/MenuItem/MenuItem";
import EmployeeMenu from "../../../Components/Dashboard/Sidebar/EmployeeMenu/EmployeeMenu";

const Sidebar = () => {
   const { logOut } = useAuth();
   const [isActive, setActive] = useState(false);

   // Sidebar Responsive Handler
   const handleToggle = () => {
      setActive(!isActive);
   };
   return (
      <>
         {/* Small Screen Navbar */}
         <div className="bg-ourLighterBlack text-gray-800 flex justify-between lg:hidden">
            <div>
               <div className="block cursor-pointer p-4 font-bold">
                  <Link to="/">
                     <img
                        // className='hidden md:block'
                        src={logo}
                        alt="logo"
                        className="size-10"
                     />
                  </Link>
               </div>
            </div>

            <button
               onClick={handleToggle}
               className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
            >
               <AiOutlineBars className="h-5 w-5 text-ourPrimary " />
            </button>
         </div>

         {/* Sidebar */}
         <div
            className={`z-10 lg:fixed flex flex-col justify-between overflow-x-hidden bg-ourLighterBlack w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
               isActive && "-translate-x-full"
            }  lg:translate-x-0  transition duration-200 ease-in-out`}
         >
            <div>
               <div>
                  <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center mx-auto">
                     <Link to="/">
                        <img
                           // className='hidden md:block'
                           src={logo}
                           alt="logo"
                           className="size-10"
                        />
                     </Link>
                  </div>
               </div>

               {/* Nav Items */}
               <div className="flex flex-col justify-between flex-1 mt-6">
                  {/*  Menu Items */}
                  <nav>
                     {/* Statistics */}

                     <EmployeeMenu />

                     {/* Work Sheet */}
                     <MenuItem
                        label={"Work Sheet"}
                        icon={LuFileSpreadsheet}
                        address={"work-sheet"}
                     />

                     {/* Payment History */}
                     <MenuItem
                        label={"Payment History"}
                        icon={LuFileSpreadsheet}
                        address={"payment-history"}
                     />

                     {/* Payment History */}
                     <MenuItem
                        label={"Employee List"}
                        icon={LuFileSpreadsheet}
                        address={"employee-list"}
                     />

                     {/* Progress */}
                     <MenuItem
                        label={"Employee Progress"}
                        icon={LuFileSpreadsheet}
                        address={"progress"}
                     />

                     {/* All Employee List */}
                     <MenuItem
                        label={"All Employee List"}
                        icon={LuFileSpreadsheet}
                        address={"all-employee-list"}
                     />

                     {/* All Messages */}
                     <MenuItem
                        label={"All Messages"}
                        icon={LuFileSpreadsheet}
                        address={"all-messages"}
                     />
                  </nav>
               </div>
            </div>

            <div>
               <hr />

               {/* Profile Menu */}
               <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                     `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                           ? "bg-gray-300  text-gray-700"
                           : "text-gray-600"
                     }`
                  }
               >
                  <FcSettings className="w-5 h-5" />

                  <span className="mx-4 font-medium">Profile</span>
               </NavLink>
               <button
                  onClick={logOut}
                  className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
               >
                  <GrLogout className="w-5 h-5" />

                  <span className="mx-4 font-medium">Logout</span>
               </button>
            </div>
         </div>
      </>
   );
};

export default Sidebar;
