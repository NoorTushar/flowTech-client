import useAuth from "../../Hooks/useAuth";
import logo from "../../../public/FlowTech-Logo.png";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
// React-Hook-Form: (1)
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import loginBg from "./a12-loginBg.jpg";
import { Helmet } from "react-helmet-async";
import Title from "../../Components/Shared/Title/Title";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
   const axiosPublic = useAxiosPublic();
   // toggle show/ hide password - (1)
   const [showPassword, setShowPassword] = useState(false);
   const { loginWithGoogle, loginUser } = useAuth();

   // after login correct redirection (3)
   // first we will get the location of the current page
   const location = useLocation();

   // after login correct redirection (4)
   const navigate = useNavigate();

   // after login correct redirection (5)
   // we want to send this path to the registration state props
   const locationState = location.state;

   // React-Hook-Form: (2a)
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   // React-Hook-Form: (2b)
   const onSubmit = async (data) => {
      console.log(data);

      try {
         const result = await loginUser(data.email, data.password);
         console.log(result);
         reset();

         toast.success("LOGGED IN SUCCESSFULLY");

         // after login correct redirection (6)
         navigate(location?.state || "/");
      } catch (error) {
         const errorMessage = error.message
            .split("Firebase: Error (auth/")[1]
            .split(")")[0]
            .replace(/-/g, " ");

         toast.error(errorMessage?.toUpperCase());
      }
   };

   // login with google using firebase
   const handleLoginWithGoogle = async () => {
      try {
         const result = await loginWithGoogle();
         console.log(result.user);

         const userInfo = {
            email: result.user.email,
            photoURL: result.user.photoURL,
            userName: result.user.displayName,
            role: "employee",
            salary: 3000,
            bankAC: 192837465,
            designation: "Executive, Sales",
            verified: false,
         };

         console.log(userInfo);

         await axiosPublic.post("/people", userInfo);

         toast.success("LOGGED IN SUCCESSFULLY");
         navigate(location?.state || "/");
      } catch (error) {
         const errorMessage = error?.message
            .split("Firebase: Error (auth/")[1]
            .split(")")[0]
            .replace(/-/g, " ");

         toast.error(errorMessage?.toUpperCase());
      }
   };

   return (
      <div className="pt-[68px] pb-10 bg-ourBlack">
         <Helmet>
            <title>Login | FlowTech</title>
         </Helmet>

         {/* Title */}
         <div className="mt-10">
            <Title
               title="Login"
               suptitle={"welcome"}
               textAlign={"center"}
            ></Title>
         </div>

         {/* Total Div */}
         <div className="flex w-full max-w-xl mx-auto overflow-hidden bg-ourBlack lg:max-w-4xl text-white">
            {/* Left BG Image */}
            <div
               className="hidden bg-cover lg:block lg:w-1/2"
               style={{
                  backgroundImage: `url(${loginBg})`,
               }}
            ></div>

            {/* Right Container */}
            <div className="w-full px-6 py-6 md:px-8 lg:w-1/2">
               {/* Logo */}
               <div className="flex justify-center mx-auto">
                  <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
               </div>

               <h3 className="mt-3 text-xl text-center text-ourPrimary uppercase tracking-widest">
                  Welcome back!
               </h3>

               {/* // React-Hook-Form: (3) */}
               <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Email */}
                  <div className="mt-4">
                     <input
                        // React-Hook-Form: (4)
                        {...register("email", {
                           required: {
                              value: true,
                              message: "Must provide an email",
                           },
                           pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Must provide a valid email address",
                           },
                        })}
                        className="w-full p-3   bg-ourLighterBlack outline-none duration-300 font-didact text-white"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email*"
                     />
                     {/* // React-Hook-Form: (5) */}
                     {errors?.email && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.email.message}
                        </span>
                     )}
                  </div>

                  {/* password field */}
                  <div className="mt-4">
                     <div className="relative">
                        <input
                           // React-Hook-Form: (6)
                           {...register("password", {
                              required: {
                                 value: true,
                                 message: "Must provide a password.",
                              },
                           })}
                           className="w-full p-3   bg-ourLighterBlack outline-none duration-300 font-didact text-white"
                           // toggle show/ hide password - (3)
                           type={showPassword ? "text" : "password"}
                           name="password"
                           id="password"
                           placeholder="Password"
                        />
                        {/*  // toggle show/ hide password - (2) */}
                        {showPassword ? (
                           <IoMdEye
                              onClick={() => setShowPassword(false)}
                              className="absolute text-lg right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                           />
                        ) : (
                           <IoMdEyeOff
                              onClick={() => setShowPassword(true)}
                              className="absolute text-lg right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                           />
                        )}
                     </div>

                     {/* // React-Hook-Form: (7) */}
                     {errors?.password && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.password.message}
                        </span>
                     )}
                  </div>

                  <div className="mt-6">
                     {/* login button */}
                     <button className="px-5 py-2 relative  group lightButton overflow-hidden  bg-ourPrimary text-white inline-block w-full border border-ourPrimary hover:border-white hover:text-ourPrimary uppercase tracking-widest ">
                        <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full"></span>
                        <span className="relative ">Login</span>
                     </button>
                  </div>
               </form>

               <div className="flex items-center justify-between mt-6">
                  <span className="w-1/5 border-b border-ourAsh  lg:w-1/5"></span>

                  <p className="text-xs text-center  uppercase  tracking-wider">
                     or login with social account
                  </p>

                  <span className="w-1/5 border-b border-ourAsh lg:w-1/5"></span>
               </div>

               {/* google login */}
               <button
                  onClick={handleLoginWithGoogle}
                  className="flex items-center justify-center mt-6  transition-colors duration-300 transform border border-ourAsh hover:border-ourPrimary  hover:bg-ourPrimary w-full"
               >
                  <div className=" py-2">
                     <FcGoogle className="text-2xl" />
                  </div>

                  <span className="w-4/6 px-4 py-3  text-center uppercase tracking-widest">
                     Sign in with Google
                  </span>
               </button>

               <div className="flex items-center justify-between mt-6">
                  <span className="w-1/5 border-b  border-b-ourAsh  md:w-1/5"></span>
                  {/* // after registration correct redirection - (7) */}
                  <Link
                     state={locationState}
                     to={"/register"}
                     className="text-xs text-center  uppercase  tracking-wider font-didact"
                  >
                     or <span className="text-ourPrimary ">register</span>{" "}
                     account
                  </Link>

                  <span className="w-1/5 border-b border-b-ourAsh  md:w-1/5"></span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
