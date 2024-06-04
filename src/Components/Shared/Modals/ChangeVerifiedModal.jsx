import PropTypes from "prop-types";

const ChangeVerifiedModal = ({
   isOpen,
   onConfirm,
   onClose,
   status,
   employee,
}) => {
   if (!employee) {
      return null;
   }

   return (
      isOpen && (
         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative mx-auto p-5 border max-w-[500px] shadow-lg bg-white">
               <div className="mt-3 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 uppercase tracking-widest">
                     Confirm Verification Status Change
                  </h3>
                  <div className="mt-2 px-7 py-3">
                     <p className="text text-gray-500">
                        Are you sure you want to change the verification status
                        of {employee?.userName} to{" "}
                        {status ? "verified" : "unverified"}?
                     </p>
                  </div>
                  <div className="flex items-center px-4 py-3">
                     <button
                        className="w-full px-5 py-2 bg-ourPrimary text-white border-2 border-ourPrimary mr-2 hover:bg-white hover:text-ourPrimary flex justify-center items-center duration-300 tracking-widest"
                        onClick={() => onConfirm(status, employee)}
                     >
                        YES
                     </button>
                     <button
                        className="w-full px-5 py-2 bg-ourAsh text-white border-2 border-ourAsh hover:bg-white hover:text-ourAsh flex justify-center items-center duration-300 tracking-widest"
                        onClick={onClose}
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

ChangeVerifiedModal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onConfirm: PropTypes.func.isRequired,
   onClose: PropTypes.func.isRequired,
   status: PropTypes.bool.isRequired,
   employee: PropTypes.object,
};

export default ChangeVerifiedModal;
