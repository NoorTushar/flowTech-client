import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import logo from "../../../public/FlowTech-Logo.png";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
// React-Hook-Form: (1)
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import registerBg from "./a12-bg-1.jpg";
import { Helmet } from "react-helmet-async";
import Title from "../../Components/Shared/Title/Title";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
   const axiosPublic = useAxiosPublic();
   // toggle show/ hide password - (1)
   const [showPassword, setShowPassword] = useState(false);

   const { loginWithGoogle, createUser, updateUser, setLoading } = useAuth();

   // after registration correct redirection - (3)
   const location = useLocation();

   // after registration correct redirection - (4)
   const navigate = useNavigate();

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

      const userData = {
         ...data,
         verified: false,
         // convert salary to integer before sending to backend
         salary: parseInt(data.salary),
         bankAC: parseInt(data.bankAC),
      };
      //   Show confirmation dialog
      const confirmationResult = await Swal.fire({
         title: "Confirm?",
         text: "Have you put everything correctly?",
         icon: "question",
         showCancelButton: true,
         confirmButtonText: "Yes, register my account",
         cancelButtonText: "No, wait",
      });

      console.log(userData);

      if (confirmationResult.isConfirmed) {
         // create user imported from AuthContext
         try {
            await createUser(data.email, data.password);
            await updateUser(data.userName, data.photoURL);

            const result = await axiosPublic.post("/people", userData);
            console.log(result.data);
            // have to set loading to false else after
            // redirecting to page, it will keep showing the loader
            setLoading(false);
            reset();
            Swal.fire({
               title: "Success!",
               text: "Registration Successful!",
               icon: "success",
               confirmButtonText: "Ok",
            });

            // navigate to private route or homepage
            navigate(location?.state || "/");
         } catch (error) {
            console.log(error);
            const errorMessage = error?.message
               .split("Firebase: Error (auth/")[1]
               .split(")")[0]
               .replace(/-/g, " ");

            Swal.fire({
               title: "Failure!",
               text: `${errorMessage}`,
               icon: "error",
               width: 600,
               color: "#A65F3F",
               background: "",
               confirmButtonText: "Ok",
            });
         }
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
      } catch (error) {
         const errorMessage = error.message
            .split("Firebase: Error (auth/")[1]
            .split(")")[0]
            .replace(/-/g, " ");

         toast.error(errorMessage.toUpperCase());
      }
   };
   return (
      <div className="pt-[74px] bg-ourBlack">
         <Helmet>
            <title>Register | FlowTech</title>
         </Helmet>
         {/* title */}
         <Title
            suptitle="Join Us"
            title="Register"
            textAlign={"center"}
         ></Title>

         {/* form */}
         <div className="flex w-full  mx-auto overflow-hidden bg-white rounded-lg shadow-lg  ">
            {/* Left Container */}
            <div className="w-full px-6 py-8 md:px-8 lg:w-2/3">
               <div className="flex justify-center mx-auto">
                  <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
               </div>

               <p className="mt-3 text-xl text-center text-black ">Welcome!</p>

               {/* google login */}
               <button
                  onClick={handleLoginWithGoogle}
                  className="flex items-center justify-center mt-4 text-black transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50  w-full"
               >
                  <div className="px-4 py-2">
                     <FcGoogle className="text-2xl" />
                  </div>

                  <span className="w-5/6 px-4 py-3 font-bold text-center">
                     Sign in with Google
                  </span>
               </button>

               <div className="flex items-center justify-between my-4">
                  <span className="w-1/5 border-b lg:w-1/4"></span>

                  <p className="text-xs text-center text-black uppercase  ">
                     register your free account
                  </p>

                  <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
               </div>

               {/* // React-Hook-Form:  */}
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-2 gap-6"
               >
                  {/* Name */}
                  <div className="">
                     <input
                        // React-Hook-Form: (9)
                        {...register("userName", {
                           required: {
                              value: true,
                              message: "Must provide a username.",
                           },
                        })}
                        className="w-full p-3 border-b border-ourAsh bg-ourLighterBlack outline-none duration-300 font-didact focus:border-ourPrimary placeholder:text-ourAsh text-white"
                        type="text"
                        name="userName"
                        placeholder="User name"
                     />
                     {/* // React-Hook-Form: (5) */}
                     {errors?.userName && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.userName.message}
                        </span>
                     )}
                  </div>

                  {/* Email */}
                  <div className="">
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
                        className="w-full p-3 border-b border-ourAsh bg-ourLighterBlack outline-none duration-300 font-didact focus:border-ourPrimary placeholder:text-ourAsh text-white"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                     />
                     {/* // React-Hook-Form: (5) */}
                     {errors?.email && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.email.message}
                        </span>
                     )}
                  </div>

                  {/* password field */}
                  <div className="">
                     <div className="relative">
                        <input
                           // React-Hook-Form: (6)
                           {...register("password", {
                              required: {
                                 value: true,
                                 message: "Must provide a password.",
                              },
                              minLength: {
                                 value: 6,
                                 message:
                                    "Password must be at least 6 characters long.",
                              },
                              validate: {
                                 hasUpperCase: (value) =>
                                    /[A-Z]/.test(value) ||
                                    "Password must have at least one uppercase letter.",
                                 hasSpecialChar: (value) =>
                                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                                    "Password must have at least one special character.",
                              },
                           })}
                           className="w-full p-3 border-b border-ourAsh bg-ourLighterBlack outline-none duration-300 font-didact focus:border-ourPrimary placeholder:text-ourAsh text-white"
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
                     {errors.password && (
                        <div className="text-red-500 mt-1 mb-2 font-didact">
                           <span>{errors.password.message}</span>
                           {errors.password.types?.hasUpperCase && (
                              <span className="block">
                                 {errors.password.types.hasUpperCase}
                              </span>
                           )}
                           {errors.password.types?.hasSpecialChar && (
                              <span className="block">
                                 {errors.password.types.hasSpecialChar}
                              </span>
                           )}
                        </div>
                     )}
                  </div>

                  {/* photoURL field */}
                  <div className="">
                     <input
                        // React-Hook-Form: (6)
                        {...register("photoURL", {
                           required: {
                              value: true,
                              message: "Must provide a photoURL.",
                           },
                        })}
                        className="w-full p-3 border-b border-ourAsh bg-ourLighterBlack outline-none duration-300 font-didact focus:border-ourPrimary placeholder:text-ourAsh text-white"
                        type="text"
                        placeholder="Photo URL"
                     />
                     {errors?.photoURL && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.photoURL.message}
                        </span>
                     )}
                  </div>

                  {/* Role field */}
                  <div className="">
                     <select
                        {...register("role", {
                           required: {
                              value: true,
                              message: "Must provide a role.",
                           },
                           validate: (value) =>
                              value !== "" || "Must select a valid role.",
                        })}
                        className="w-full p-3 border-b border-ourAsh bg-ourLighterBlack outline-none duration-300 font-didact focus:border-ourPrimary placeholder:text-ourAsh text-white"
                        defaultValue="" // Set the default value to an empty string
                     >
                        <option value="" disabled>
                           Select your role
                        </option>
                        <option value="employee">Employee</option>
                        <option value="hr">HR</option>
                     </select>
                     {errors?.role && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.role.message}
                        </span>
                     )}
                  </div>

                  {/* Salary */}
                  <div className="">
                     <input
                        // React-Hook-Form: (6)
                        {...register("salary", {
                           required: {
                              value: true,
                              message: "Must provide a salary.",
                           },
                        })}
                        className="w-full p-3 border-b border-ourAsh bg-ourLighterBlack outline-none duration-300 font-didact focus:border-ourPrimary placeholder:text-ourAsh text-white"
                        type="number"
                        placeholder="Salary in $"
                     />
                     {errors?.salary && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.salary.message}
                        </span>
                     )}
                  </div>

                  {/* bankAC */}
                  <div className="">
                     <input
                        // React-Hook-Form: (6)
                        {...register("bankAC", {
                           required: {
                              value: true,
                              message: "Must provide a bank account number.",
                           },
                        })}
                        className="w-full p-3 border-b border-ourAsh bg-ourLighterBlack outline-none duration-300 font-didact focus:border-ourPrimary placeholder:text-ourAsh text-white"
                        type="number"
                        placeholder="Bank Account Number"
                     />
                     {errors?.bankAC && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.bankAC.message}
                        </span>
                     )}
                  </div>

                  {/* Designation field */}
                  <div className="">
                     <select
                        {...register("designation", {
                           required: {
                              value: true,
                              message: "Must provide a designation.",
                           },
                           validate: (value) =>
                              value !== "" ||
                              "Must select a valid designation.",
                        })}
                        className="w-full p-3 border-b border-ourAsh bg-ourLighterBlack outline-none duration-300 font-didact focus:border-ourPrimary placeholder:text-ourAsh text-white"
                        defaultValue="" // Set the default value to an empty string
                     >
                        <option value="" disabled>
                           Select your designation
                        </option>
                        <option value="Executive, Sales">
                           Executive, Sales
                        </option>
                        <option value="Executive, Accounts">
                           Executive, Accounts
                        </option>
                        <option value="Executive, Finance">
                           Executive, Finance
                        </option>
                        <option value="Executive, Operations">
                           Executive, Operations
                        </option>
                        <option value="Executive, Procurement">
                           Executive, Procurement
                        </option>

                        <option value="Manager, Sales">Manager, Sales</option>
                        <option value="Manager, Accounts">
                           Manager, Accounts
                        </option>
                        <option value="Manager, Finance">
                           Manager, Finance
                        </option>
                        <option value="Manager, Operations">
                           Manager, Operations
                        </option>
                        <option value="Manager, Procurement">
                           Manager, Procurement
                        </option>
                     </select>
                     {errors?.designation && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.designation.message}
                        </span>
                     )}
                  </div>

                  <div className="mt-6 col-span-2">
                     {/* login button */}
                     <button className="px-5 py-2 relative rounded group lightButton overflow-hidden font-medium bg-ourOrange text-ourBlack inline-block w-full border border-ourOrange">
                        <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full "></span>
                        <span className="relative ">Register</span>
                     </button>
                  </div>
               </form>

               <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b md:w-1/4"></span>

                  <Link
                     to={"/login"}
                     className="text-xs text-black uppercase  hover:underline"
                  >
                     or login
                  </Link>

                  <span className="w-1/5 border-b md:w-1/4"></span>
               </div>
            </div>

            {/* Right Container BG Image */}
            <div
               className="hidden bg-cover lg:block lg:w-1/3"
               style={{
                  backgroundImage: `url(${registerBg})`,
               }}
            ></div>
         </div>
      </div>
   );
};

export default Register;
