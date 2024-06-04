import PropTypes from "prop-types";
import { useState } from "react";

const PayEmployeeModal = ({ isOpen, onClose, onPay, employee }) => {
   const [month, setMonth] = useState("");
   const [year, setYear] = useState("");
   const [error, setError] = useState("");

   const months = [
      { value: "January", label: "January" },
      { value: "February", label: "February" },
      { value: "March", label: "March" },
      { value: "April", label: "April" },
      { value: "May", label: "May" },
      { value: "June", label: "June" },
      { value: "July", label: "July" },
      { value: "August", label: "August" },
      { value: "September", label: "September" },
      { value: "October", label: "October" },
      { value: "November", label: "November" },
      { value: "December", label: "December" },
   ];

   const handlePay = () => {
      if (!month || !year) {
         setError("Please select month and year.");
         return;
      }
      onPay({ month, year, salary: employee.salary, email: employee.email });
   };

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full items-center justify-center flex flex-col z-50">
         <div className="relative mx-auto p-5 border max-w-[500px] shadow-lg bg-white">
            <div className="mt-3 text-center">
               <h3 className="text-lg leading-6 font-medium text-gray-900 uppercase tracking-widest">
                  Pay Employee
               </h3>
               <div className="mt-2 px-7 py-3">
                  <p className="text text-gray-500">
                     Salary: ${employee.salary}
                  </p>
                  <div className="mt-2">
                     <select
                        className="border px-3 py-2 w-full"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                     >
                        <option value="">Select Month</option>
                        {months.map((m) => (
                           <option key={m.value} value={m.value}>
                              {m.label}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="mt-2">
                     <input
                        type="text"
                        className="border px-3 py-2 w-full"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                     />
                  </div>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
               </div>
               <div className="flex items-center px-4 py-3">
                  <button
                     className={`w-full px-5 py-2 relative bg-ourPrimary group overflow-hidden font-medium text-white border-2 border-ourPrimary mr-2 hover:border-ourPrimary hover:bg-white hover:text-ourPrimary flex justify-center items-center duration-300 tracking-widest ${
                        !month || !year ? "opacity-50 cursor-not-allowed" : ""
                     }`}
                     onClick={handlePay}
                     disabled={!month || !year}
                  >
                     PAY
                  </button>
                  <button
                     className="w-full px-5 py-2 relative bg-ourAsh group overflow-hidden font-medium text-white border-2 border-ourAsh mr-2 hover:border-ourAsh hover:bg-white hover:text-ourAsh flex justify-center items-center duration-300 tracking-widest"
                     onClick={onClose}
                  >
                     CANCEL
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

PayEmployeeModal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   onPay: PropTypes.func.isRequired,
   employee: PropTypes.object.isRequired,
};

export default PayEmployeeModal;
