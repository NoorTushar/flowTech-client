import PropTypes from "prop-types";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const MakeHRModal = ({
   isHRModalOpen,
   selectForHR,
   handleCloseHRModal,
   refetch,
}) => {
   const axiosSecure = useAxiosSecure();

   const { mutateAsync: fireEmployee } = useMutation({
      mutationKey: ["employee"],
      mutationFn: async (email) => {
         const result = await axiosSecure.patch(`/makeHR/${email}`);
         // console.log(result);
         return result;
      },
      onSuccess: () => {
         toast.success(`${selectForHR.userName} is now a HR!`);
         refetch();
      },
      onError: () => {
         toast.error("could not make HR");
         handleCloseHRModal();
      },
   });

   const handleMakeHR = async (email) => {
      await fireEmployee(email);
      handleCloseHRModal();
   };
   return (
      isHRModalOpen && (
         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full items-center justify-center flex flex-col z-50">
            <div className="relative mx-auto p-5 border max-w-[500px] shadow-lg bg-white">
               <div className="mt-3 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 uppercase tracking-widest">
                     Confirm Make HR
                  </h3>
                  <div className="mt-2 px-7 py-3">
                     <p className="text text-gray-500">
                        Are you sure you want to make {selectForHR.userName} a
                        HR?
                     </p>
                  </div>
                  <div className="flex items-center px-4 py-3">
                     <button
                        onClick={() => handleMakeHR(selectForHR.email)}
                        className="w-full px-5 py-2 relative bg-ourPrimary group overflow-hidden font-medium text-white border-2 border-ourPrimary mr-2 hover:border-ourPrimary hover:bg-white hover:text-ourPrimary flex justify-center items-center duration-300 tracking-widest whitespace-nowrap"
                     >
                        MAKE HR
                     </button>
                     <button
                        onClick={handleCloseHRModal}
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

MakeHRModal.propTypes = {
   // isOpen: PropTypes.bool.isRequired,
   isHRModalOpen: PropTypes.bool.isRequired,
   selectForHR: PropTypes.object.isRequired,
   handleCloseHRModal: PropTypes.func.isRequired,
   refetch: PropTypes.func.isRequired,
};

export default MakeHRModal;
