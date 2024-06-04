import PropTypes from "prop-types";

const ChangeVerifiedModal = ({ isOpen, onConfirm, onClose }) => {
   return (
      isOpen && (
         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full items-center justify-center flex flex-col z-50">
            <div className="relative mx-auto p-5 border max-w-[500px] shadow-lg bg-white">
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
                        onClick={onConfirm}
                     >
                        YES
                     </button>
                     <button
                        className="w-full px-5 py-2 relative bg-ourAsh group overflow-hidden font-medium text-white border-2 border-ourAsh mr-2 hover:border-ourAsh hover:bg-white hover:text-ourAsh flex justify-center items-center duration-300 tracking-widest"
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
};

export default ChangeVerifiedModal;
