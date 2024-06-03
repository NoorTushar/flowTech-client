import Title from "../../../Components/Shared/Title/Title";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const WorkSheet = () => {
   const [startDate, setStartDate] = useState(new Date());
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [formData, setFormData] = useState({});

   const handleAddWork = (e) => {
      e.preventDefault();

      const form = e.target;
      const task = form.task.value;
      const workHours = form.workHours.value;
      const workDate = form.workDate.value;

      setFormData({ task, workHours, workDate });

      // Open the modal when the form is submitted
      setIsModalOpen(true);
   };

   const confirmAddWork = () => {
      console.log(formData);

      closeModal();
      toast.success("WORK ADDED");
   };

   const closeModal = () => {
      setIsModalOpen(false);
   };

   return (
      <div className="">
         <Title title={"Worksheet"} titleColor={"#F86244"} />

         {/* Task Form */}
         <form onSubmit={handleAddWork}>
            <div className="grid grid-cols-4 items-center">
               <div className="">
                  <select required name="task" defaultValue="">
                     <option value="" disabled>
                        Select task
                     </option>
                     <option value="sales">Sales</option>
                     <option value="support">Support</option>
                     <option value="content">Content</option>
                     <option value="paper-work">Paper-work</option>
                  </select>
               </div>
               <div>
                  <input
                     name="workHours"
                     type="number"
                     placeholder="Hours worked"
                     required
                     className="border rounded-none"
                  />
               </div>
               <div>
                  <DatePicker
                     selected={startDate}
                     name="workDate"
                     onChange={(date) => setStartDate(date)}
                  />
               </div>
               <button
                  type="submit"
                  className="w-[100px] px-5 py-2 relative bg-ourPrimary group overflow-hidden font-medium text-white border-2 border-ourPrimary mr-2 hover:border-white hover:text-ourPrimary flex justify-center items-center"
               >
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full"></span>
                  <span className="relative tracking-widest uppercase">
                     ADD
                  </span>
               </button>
            </div>
         </form>

         {isModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full items-center justify-center flex flex-col">
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
      </div>
   );
};

export default WorkSheet;
