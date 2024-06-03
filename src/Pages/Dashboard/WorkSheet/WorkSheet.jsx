import Title from "../../../Components/Shared/Title/Title";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WorkSheet = () => {
   const [startDate, setStartDate] = useState(new Date());

   return (
      <div className="">
         <Title title={"Worksheet"} titleColor={"#F86244"} />

         {/* Task Form */}
         <form>
            <div className="grid grid-cols-4 items-center">
               <div className="">
                  <select
                     //   className="w-full p-3 border-b border-ourAsh bg-ourLighterBlack outline-none duration-300 font-didact focus:border-ourPrimary placeholder:text-ourAsh text-white"
                     required
                     name="task"
                     defaultValue="" // Set the default value to an empty string
                  >
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
                     type="number"
                     placeholder="Hours worked"
                     required
                     className="border rounded-none"
                  />
               </div>
               <div>
                  <DatePicker
                     selected={startDate}
                     onChange={(date) => setStartDate(date)}
                  />
               </div>
               <button className="w-[100px] px-5 py-2 relative bg-ourPrimary group  overflow-hidden font-medium text-white border-2 border-ourPrimary mr-2 hover:border-white hover:text-ourPrimary flex justify-center items-center">
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full"></span>
                  <span className="relative tracking-widest uppercase">
                     ADD
                  </span>
               </button>
            </div>
         </form>
      </div>
   );
};

export default WorkSheet;
