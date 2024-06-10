import { useState } from "react";
import Title from "../../Components/Shared/Title/Title";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import bgImg from "./contactUs.jpg";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";

const ContactUs = () => {
   const axiosSecure = useAxiosSecure();
   const [mloading, setMLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setMLoading(true);
      const form = e.target;

      const mailerEmail = form.email.value;
      const mailerMessage = form.message.value;

      const mailerData = {
         mailerEmail,
         mailerMessage,
      };
      console.log(mailerData);

      const { data } = await axiosSecure.post("/messages", mailerData);
      if (data.insertedId) {
         toast.success("MESSAGE SENT");
         setMLoading(false);
      } else {
         toast.error("MESSAGE WAS NOT SENT");
         setMLoading(false);
      }

      form.reset();
   };

   return (
      <div className="pt-[65px] lg:pt-[86px] bg-ourBlack">
         <div className="md:-mb-7">
            <Title title={"contact us"} textAlign={"center"} />
         </div>
         <div className="text-center text-white mx-auto max-w-lg space-y-3">
            <div
               className="flex
             items-center justify-center gap-1"
            >
               <FaLocationDot className="text-ourPrimary text-lg" />
               <h3>Address: 68, New Eskaton Road, Dhaka, Banglaesh</h3>
            </div>

            <div
               className="flex
             items-center justify-center gap-2"
            >
               <FaPhone className="text-ourPrimary text-lg" />
               <p>Phone: +880 168 302 1094</p>
            </div>
         </div>
         <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 pt-16 pb-4 mx-auto -lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32  text-gray-100">
            <div className="flex flex-col justify-between">
               <img src={bgImg} alt="" className="object-cover h-full w-full" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="space-y-2">
                  <label htmlFor="email" className="text-sm">
                     Your Email
                  </label>
                  <input
                     required
                     name="email"
                     type="email"
                     className="w-full p-3  bg-ourLighterBlack   outline-none "
                  />
               </div>
               <div className="space-y-2">
                  <label htmlFor="message" className="text-sm">
                     Message
                  </label>
                  <textarea
                     required
                     name="message"
                     rows="5"
                     className="w-full p-3  bg-ourLighterBlack  outline-none"
                     draggable="false"
                  ></textarea>
               </div>
               <button
                  disabled={mloading}
                  type="submit"
                  className="w-1/2 px-5 py-2 relative bg-ourPrimary group  overflow-hidden font-medium text-white border-2 border-ourPrimary mr-2 hover:border-white hover:text-ourPrimary flex justify-center items-center"
               >
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full"></span>

                  {mloading ? (
                     <ImSpinner9 className="animate-spin text-xl" />
                  ) : (
                     <span className="relative tracking-widest uppercase">
                        Send Message
                     </span>
                  )}
               </button>
            </form>
         </div>
      </div>
   );
};

export default ContactUs;
