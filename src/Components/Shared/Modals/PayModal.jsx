import PropTypes from "prop-types";
import { useState } from "react";
// stripe (1)
import { loadStripe } from "@stripe/stripe-js";
// stripe (3)
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../Form/CheckoutForm";

// make stripe promise, stripe (2)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PayEmployeeModal = ({ isOpen, onClose, onPay, employee, refetch }) => {
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
         <div className="relative mx-auto p-5 border w-11/12 md:w-1/3 max-w-[800px] shadow-lg bg-white">
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
               {/* promise ta elements e pass korbo, stripe (4) */}
               <Elements stripe={stripePromise}>
                  {/* checkout form */}

                  <CheckoutForm
                     month={month}
                     year={year}
                     handlePay={handlePay}
                     onClose={onClose}
                     employee={employee}
                     refetch={refetch}
                  />
               </Elements>
            </div>
         </div>
      </div>
   );
};

PayEmployeeModal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   onPay: PropTypes.func.isRequired,
   refetch: PropTypes.func.isRequired,
   employee: PropTypes.object.isRequired,
};

export default PayEmployeeModal;
