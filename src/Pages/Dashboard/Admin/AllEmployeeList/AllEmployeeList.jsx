import { FaCircleCheck } from "react-icons/fa6";
import Title from "../../../../Components/Shared/Title/Title";
import { ImCross } from "react-icons/im";
import FireModal from "../../../../Components/Shared/Modals/FireModal";
import { useState } from "react";
import useVerifiedEmployees from "../../../../Hooks/useVerifiedEmployees";
import MakeHRModal from "../../../../Components/Shared/Modals/MakeHRModal";
import { RiMedal2Fill } from "react-icons/ri";

const AllEmployeeList = () => {
   const [verifiedEmployees, refetch] = useVerifiedEmployees();
   const [isOpen, setIsOpen] = useState(false);
   const [selectedEmail, setSelectedEmail] = useState("");
   const [isHRModalOpen, setIsHRModalOpen] = useState(false);
   const [selectForHR, setSelectForHR] = useState({});

   const handleOpenModal = (email) => {
      setSelectedEmail(email);
      setIsOpen(true);
   };

   const handleCloseModal = () => {
      setIsOpen(false);
   };

   const handleOpenMakeHRModal = (employee) => {
      setSelectForHR(employee);
      setIsHRModalOpen(true);
   };

   const handleCloseHRModal = () => {
      setIsHRModalOpen(false);
   };

   return (
      <div>
         <div>
            <Title
               title={"all employees"}
               titleColor={"black"}
               textAlign={"center"}
            />
         </div>

         {/* Table */}
         <div>
            <div className="overflow-x-auto">
               <table className="table table-zebra">
                  {/* head */}
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>picture</th>
                        <th>name</th>
                        <th>role</th>
                        <th>salary</th>
                        <th>designation</th>
                        <th>verified</th>
                        <th>email</th>
                     </tr>
                  </thead>
                  <tbody>
                     {verifiedEmployees.length > 0 ? (
                        verifiedEmployees.map((employee, index) => (
                           <tr key={employee._id}>
                              <td>{index + 1}</td>
                              <td>
                                 <img
                                    className="size-10 rounded-full"
                                    src={employee?.photoURL}
                                    alt={employee?.userName}
                                 />
                              </td>
                              <td className="text-center">
                                 {employee?.role === "fired" ? (
                                    <p className="text-ourPrimary font-didact font-bold">
                                       Fired
                                    </p>
                                 ) : employee?.role === "hr" ? (
                                    <RiMedal2Fill className="text-3xl " />
                                 ) : (
                                    <button
                                       onClick={() =>
                                          handleOpenMakeHRModal(employee)
                                       }
                                       className="btn btn-sm bg-ourBlack text-white rounded-none whitespace-nowrap"
                                    >
                                       Make HR
                                    </button>
                                 )}
                              </td>
                              <td className="text-center">
                                 {employee.role === "fired" ? (
                                    <p className="text-ourPrimary font-didact font-bold">
                                       Fired
                                    </p>
                                 ) : (
                                    <button
                                       onClick={() =>
                                          handleOpenModal(employee?.email)
                                       }
                                       className="btn btn-sm bg-ourPrimary text-white rounded-none"
                                    >
                                       Fire
                                    </button>
                                 )}
                              </td>
                              <td>{employee?.userName}</td>
                              <td>{employee?.role}</td>
                              <td>{employee?.salary}</td>
                              <td>{employee?.designation}</td>
                              <td>
                                 {employee?.verified ? (
                                    <FaCircleCheck className="text-green-500 text-lg" />
                                 ) : (
                                    <ImCross className="text-ourPrimary" />
                                 )}
                              </td>
                              <td>{employee?.email}</td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td>
                              <p className="text-center text-ourPrimary">
                                 No data to show
                              </p>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
               <FireModal
                  isOpen={isOpen}
                  handleCloseModal={handleCloseModal}
                  selectedEmail={selectedEmail}
                  refetch={refetch}
               />
               <MakeHRModal
                  selectForHR={selectForHR}
                  isHRModalOpen={isHRModalOpen}
                  handleCloseHRModal={handleCloseHRModal}
                  refetch={refetch}
               />
            </div>
         </div>
      </div>
   );
};

export default AllEmployeeList;
