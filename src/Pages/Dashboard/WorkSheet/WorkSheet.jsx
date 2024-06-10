import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useWorks from "../../../Hooks/useWorks";
import WorkSheetTable from "./WorkSheetTable";
import ConfirmAddModal from "../../../Components/Shared/Modals/ConfirmAddModal";

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
      const workHours = parseInt(form.workHours.value);
      const workDate = startDate.toISOString();

      setFormData({
         task,
         workHours,
         workDate,
         employeeEmail: user.email,
         employeeName: user.displayName,
      });

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
         <h2 className="dashboard-title">Worksheet</h2>

         {/* Task Form */}
         <form onSubmit={handleAddWork} className=" max-w-[1100px] mx-auto">
            <h2 className="text-center uppercase tracking-widest text-2xl mb-2 text-ourAsh">
               Enter work data
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 items-center  gap-4 p-4 text-lg">
               <div className="flex items-center gap-2  p-2">
                  <label className="w-full whitespace-nowrap text-xl uppercase tracking-wider text-ourAsh">
                     Select Task:{" "}
                  </label>
                  <select
                     className="outline-none font-didact w-full bg-ourLighterBlack text-white p-2"
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
               <div className="flex items-center gap-2  p-2">
                  <label className="text-xl uppercase tracking-wider text-ourAsh">
                     Hours:{" "}
                  </label>
                  <input
                     name="workHours"
                     type="text"
                     placeholder="hours"
                     required
                     className=" rounded-none outline-none max-w-20 bg-ourLighterBlack text-white p-2"
                  />
               </div>
               <div className="flex items-center gap-2  p-2">
                  <label className="text-xl uppercase tracking-wider text-ourAsh">
                     Date:{" "}
                  </label>
                  <DatePicker
                     className="outline-none p-2 bg-ourLighterBlack text-ourAsh"
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
         <ConfirmAddModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={confirmAddWork}
         />

         {/* Work Data Table */}

         <WorkSheetTable works={works} />
      </div>
   );
};

export default WorkSheet;
