import PropTypes from "prop-types";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";

const UpdateSalaryModal = ({
   isUpdateSalaryModalOpen,
   selectedForSalaryUpdate,
   handleCloseSalaryModal,
   refetch,
}) => {
   const axiosSecure = useAxiosSecure();
   const [amount, setAmount] = useState(null);

   const { mutateAsync: updateSalary } = useMutation({
      mutationKey: ["employee"],
      mutationFn: async (employeeData) => {
         const result = await axiosSecure.patch(`/update-salary`, employeeData);
         // console.log(result);
         return result;
      },
      onSuccess: () => {
         toast.success(
            `${selectedForSalaryUpdate.userName}'s salary is updated!`
         );
         refetch();
      },
      onError: () => {
         toast.error("could not update salary");
         handleCloseSalaryModal();
      },
   });

   const handleUpdateSalary = async (email) => {
      if (amount <= selectedForSalaryUpdate.salary) {
         return toast.error("You must increase his salary");
      }
      const employeeData = {
         email: email,
         amount: amount,
      };
      console.log(employeeData);
      await updateSalary(employeeData);
      handleCloseSalaryModal();
   };

   return (
      isUpdateSalaryModalOpen && (
         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full items-center justify-center flex flex-col z-50">
            <div className="relative mx-auto p-5 border max-w-[500px] shadow-lg bg-white">
               <div className="mt-3 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 uppercase tracking-widest">
                     Confirm Salary
                  </h3>
                  <div className="mt-2 px-7 py-3">
                     <p className="text text-gray-500">
                        Enter {selectedForSalaryUpdate.userName}`s new salary
                     </p>
                  </div>
                  <div className="mb-2">
                     <input
                        className="w-1/2 p-3 border-b border-ourAsh outline-none duration-300 font-didact focus:border-ourPrimary placeholder:text-ourAs"
                        type="text"
                        onKeyUp={(e) => setAmount(parseInt(e.target.value))}
                     />
                  </div>
                  <div className="flex items-center px-4 py-3">
                     <button
                        onClick={() =>
                           handleUpdateSalary(selectedForSalaryUpdate.email)
                        }
                        className="w-full px-5 py-2 relative bg-ourPrimary group overflow-hidden font-medium text-white border-2 border-ourPrimary mr-2 hover:border-ourPrimary hover:bg-white hover:text-ourPrimary flex justify-center items-center duration-300 tracking-widest whitespace-nowrap"
                     >
                        update
                     </button>
                     <button
                        onClick={handleCloseSalaryModal}
                        className="w-full px-5 py-2 relative bg-ourAsh group overflow-hidden font-medium text-white border-2 border-ourAsh mr-2 hover:border-ourAsh hover:bg-white hover:text-ourAsh flex justify-center items-center duration-300 tracking-widest"
                     >
                        NO
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )
   );
};

UpdateSalaryModal.propTypes = {
   // isOpen: PropTypes.bool.isRequired,
   isUpdateSalaryModalOpen: PropTypes.bool.isRequired,
   selectedForSalaryUpdate: PropTypes.object.isRequired,
   handleCloseSalaryModal: PropTypes.func.isRequired,
   refetch: PropTypes.func.isRequired,
};

export default UpdateSalaryModal;
