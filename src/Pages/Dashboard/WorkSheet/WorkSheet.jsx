import Title from "../../../Components/Shared/Title/Title";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useWorks from "../../../Hooks/useWorks";
import WorkSheetTable from "./WorkSheetTable";

const WorkSheet = () => {
   const [startDate, setStartDate] = useState(new Date());
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [formData, setFormData] = useState({});
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();

   const [works, refetch] = useWorks();
   console.log(works);

   const handleAddWork = (e) => {
      e.preventDefault();

      const form = e.target;
      const task = form.task.value;
      const workHours = form.workHours.value;
      const workDate = startDate.toISOString();

      setFormData({ task, workHours, workDate, employee: user.email });

      // Open the modal when the form is submitted
      setIsModalOpen(true);
   };

   const confirmAddWork = async () => {
      console.log(formData);
      try {
         const { data } = await axiosSecure.post("/works", formData);
         console.log(data);
         if (data.insertedId) {
            refetch();
            toast.success("WORK ADDED");
            closeModal();
         }
      } catch (error) {
         toast.error(error.message);
         closeModal();
      }
   };

   const closeModal = () => {
      setIsModalOpen(false);
   };

   return (
      <div className="">
         <Title
            title={"Worksheet"}
            titleColor={"#F86244"}
            textAlign={"center"}
         />

         {/* Task Form */}
         <form onSubmit={handleAddWork} className=" max-w-[1100px] mx-auto">
            <h2 className="text-center uppercase tracking-widest text-2xl mb-2">
               Enter work data
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 items-center  gap-4 p-4 text-lg">
               <div className="flex items-center gap-2 border p-2">
                  <label className="w-full whitespace-nowrap text-xl uppercase tracking-wider text-ourPrimary">
                     Select Task:{" "}
                  </label>
                  <select
                     className=" outline-none font-didact w-full"
                     required
                     name="task"
                     defaultValue=""
                  >
                     <option value="" disabled></option>
                     <option value="sales">Sales</option>
                     <option value="support">Support</option>
                     <option value="content">Content</option>
                     <option value="paper-work">Paper-work</option>
                  </select>
               </div>
               <div className="flex items-center gap-2 border p-2">
                  <label className="text-xl uppercase tracking-wider text-ourPrimary">
                     Hours:{" "}
                  </label>
                  <input
                     name="workHours"
                     type="number"
                     placeholder="hours"
                     required
                     className=" rounded-none outline-none max-w-20 "
                  />
               </div>
               <div className="flex items-center gap-2 border p-2">
                  <label className="text-xl uppercase tracking-wider text-ourPrimary">
                     Date:{" "}
                  </label>
                  <DatePicker
                     className="outline-none"
                     selected={startDate}
                     name="workDate"
                     onChange={(date) => setStartDate(date)}
                  />
               </div>
               <div className="">
                  <button
                     type="submit"
                     className="w-[100px] px-5 py-1 relative bg-ourPrimary group overflow-hidden font-medium text-white border-2 border-ourPrimary mr-2 hover:border-white hover:text-ourPrimary flex justify-center items-center"
                  >
                     <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full"></span>
                     <span className="relative tracking-widest uppercase">
                        ADD
                     </span>
                  </button>
               </div>
            </div>
         </form>

         {/* Modal */}
         {isModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full items-center justify-center flex flex-col z-50">
               <div className="relative  mx-auto p-5 border max-w-[500px] shadow-lg rounded-md bg-white">
                  <div className="mt-3 text-center">
                     <h3 className="text-lg leading-6 font-medium text-gray-900 uppercase tracking-widest">
                        Confirm Addition
                     </h3>
                     <div className="mt-2 px-7 py-3">
                        <p className="text text-gray-500">
                           Are you sure you want to add this work entry?
                        </p>
                     </div>
                     <div className="flex items-center px-4 py-3">
                        <button
                           className="w-full px-5 py-2 relative bg-ourPrimary group overflow-hidden font-medium text-white border-2 border-ourPrimary mr-2 hover:border-ourPrimary hover:bg-white hover:text-ourPrimary flex justify-center items-center duration-300 tracking-widest"
                           onClick={confirmAddWork}
                        >
                           YES
                        </button>
                        <button
                           className="w-full px-5 py-2 relative bg-ourAsh group overflow-hidden font-medium text-white border-2 border-ourAsh mr-2 hover:border-ourAsh hover:bg-white hover:text-ourAsh flex justify-center items-center duration-300 tracking-widest"
                           onClick={closeModal}
                        >
                           NO
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Work Data Table */}

         <WorkSheetTable works={works} />
      </div>
   );
};

export default WorkSheet;
