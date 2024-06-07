import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const FireModal = ({ isOpen, handleCloseModal, selectedEmail, refetch }) => {
   const axiosSecure = useAxiosSecure();

   const { mutateAsync: fireEmployee } = useMutation({
      mutationKey: ["employee"],
      mutationFn: async (email) => {
         const result = await axiosSecure.patch(`/people/${email}`);
         console.log(result);
      },
      onSuccess: () => {
         toast.success("🔥 EMPLOYEE FIRED AND ADDED TO FIRED LIST");
         refetch();
      },
      onError: () => {
         toast.error("could not fire employee");
         handleCloseModal();
      },
   });

   const handleFireEmployee = async (email) => {
      await fireEmployee(email);
      console.log(`dlete kore dilam ai email : `, email);
      handleCloseModal();
   };

   return (
      isOpen && (
         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full items-center justify-center flex flex-col z-50">
            <div className="relative mx-auto p-5 border max-w-[500px] shadow-lg bg-white">
               <div className="mt-3 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 uppercase tracking-widest">
                     Confirm Fire
                  </h3>
                  <div className="mt-2 px-7 py-3">
                     <p className="text text-gray-500">
                        Are you sure you want to fire this employee?
                     </p>
                  </div>
                  <div className="flex items-center px-4 py-3">
                     <button
                        onClick={() => handleFireEmployee(selectedEmail)}
                        className="w-full px-5 py-2 relative bg-ourPrimary group overflow-hidden font-medium text-white border-2 border-ourPrimary mr-2 hover:border-ourPrimary hover:bg-white hover:text-ourPrimary flex justify-center items-center duration-300 tracking-widest"
                     >
                        FIRE
                     </button>
                     <button
                        className="w-full px-5 py-2 relative bg-ourAsh group overflow-hidden font-medium text-white border-2 border-ourAsh mr-2 hover:border-ourAsh hover:bg-white hover:text-ourAsh flex justify-center items-center duration-300 tracking-widest"
                        onClick={handleCloseModal}
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

FireModal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   handleCloseModal: PropTypes.func.isRequired,
   refetch: PropTypes.func.isRequired,
   selectedEmail: PropTypes.string.isRequired,
};

export default FireModal;
