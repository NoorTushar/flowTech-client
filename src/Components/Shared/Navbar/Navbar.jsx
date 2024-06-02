import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../../assets/FlowTech-Logo.png";
import Swal from "sweetalert2";
import "./Navbar.css";
import useAuth from "../../../Hooks/useAuth";
import LinkButton from "../Button/LinkButton";

const NavBar = () => {
   const { user, logoutUser } = useAuth();
   const navigate = useNavigate();

   const navItem = (
      <>
         <li>
            <NavLink exact to={"/"}>
               Home
            </NavLink>
         </li>
         <li>
            <NavLink exact to={"/dashboard"}>
               Dashboard
            </NavLink>
         </li>
         <li>
            <NavLink exact to={"/contact-us"}>
               Contact Us
            </NavLink>
         </li>

         {user?.email && (
            <>
               <li>
                  <NavLink to={"/add-food"}>Add Food</NavLink>
               </li>
            </>
         )}
      </>
   );

   const handleLogOut = async (e) => {
      e.preventDefault();
      try {
         await logoutUser();
         Swal.fire({
            title: "See you soon!",
            text: "Logged out successfully!",
            icon: "success",
            confirmButtonText: "Ok",
         });
         navigate("/");
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="navbar bg-ourBlack bg-opacity-80 fixed top-0 left-0 z-50">
         <div className="navbar-start">
            <div className="dropdown z-50">
               <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost  lg:hidden"
               >
                  <GiHamburgerMenu className="text-xl font-bold text-ourPrimary" />
               </div>
               <ul
                  tabIndex={0}
                  className="menu bg-ourBlack bg-opacity-80 menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52"
               >
                  {navItem}
               </ul>
            </div>
            {/* logo */}
            <Link to={"/"} className="flex items-center gap-1">
               <img className="size-10" src={logo} alt="" />
               <span
                  to={"/"}
                  className="text-2xl uppercase tracking-widest font-medium text-white"
               >
                  Flow<span className="text-ourPrimary">Tech</span>
               </span>
            </Link>
         </div>
         <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal px-1">{navItem}</ul>
         </div>

         <div className="navbar-end">
            {user?.email ? (
               <div
                  className="dropdown dropdown-end z-50"
                  title={user.displayName}
               >
                  <div
                     tabIndex={0}
                     role="button"
                     className="btn btn-ghost btn-circle avatar"
                  >
                     <div className="w-10 rounded-full">
                        <img
                           referrerPolicy="no-referrer"
                           alt="User Avatar"
                           src={user?.photoURL}
                        />
                     </div>
                  </div>
                  <ul
                     tabIndex={0}
                     className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                     <li>
                        <button onClick={handleLogOut}>Logout</button>
                     </li>
                  </ul>
               </div>
            ) : (
               <LinkButton to={"/login"} name={"login"}></LinkButton>
            )}
         </div>
      </div>
   );
};

export default NavBar;
