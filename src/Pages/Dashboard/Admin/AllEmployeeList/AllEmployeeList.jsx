import { FaCircleCheck } from "react-icons/fa6";
import Title from "../../../../Components/Shared/Title/Title";
import { ImCross } from "react-icons/im";
import FireModal from "../../../../Components/Shared/Modals/FireModal";
import { useState } from "react";
import useVerifiedEmployees from "../../../../Hooks/useVerifiedEmployees";
import MakeHRModal from "../../../../Components/Shared/Modals/MakeHRModal";
import { RiMedal2Fill } from "react-icons/ri";
import UpdateSalaryModal from "../../../../Components/Shared/Modals/UpdateSalaryModal";
import { FaTableList } from "react-icons/fa6";

import { IoGrid } from "react-icons/io5";

const AllEmployeeList = () => {
   const [verifiedEmployees, refetch] = useVerifiedEmployees();
   console.log(verifiedEmployees);
   const [isOpen, setIsOpen] = useState(false);
   const [selectedEmail, setSelectedEmail] = useState("");
   const [isHRModalOpen, setIsHRModalOpen] = useState(false);
   const [selectForHR, setSelectForHR] = useState({});
   const [tableView, setTableView] = useState(true);
   const [isUpdateSalaryModalOpen, setIsUpdateSalaryModalOpen] =
      useState(false);
   const [selectedForSalaryUpdate, setSelectedForSalaryUpdate] = useState({});

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

   const handleOpenSalaryModal = (employee) => {
      setSelectedForSalaryUpdate(employee);
      setIsUpdateSalaryModalOpen(true);
   };

   const handleCloseSalaryModal = () => {
      setIsUpdateSalaryModalOpen(false);
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

         <div className="flex items-center gap-2 text-xl">
            Change View:
            <div onClick={() => setTableView(!tableView)}>
               {tableView ? (
                  <button>
                     <IoGrid />
                  </button>
               ) : (
                  <button>
                     <FaTableList />
                  </button>
               )}
            </div>
         </div>
         {/* Table */}
         {tableView && (
            <div className="w-full max-w-[720px] mx-auto mt-6">
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
                                       referrerPolicy="no-referrer"
                                       className="size-10 rounded-full"
                                       src={
                                          employee?.photoURL || employee?.image
                                       }
                                       alt={employee?.userName}
                                    />
                                 </td>
                                 <td className="text-center">
                                    {employee?.role === "hr" ? (
                                       <RiMedal2Fill className="text-3xl " />
                                    ) : (
                                       <button
                                          disabled={employee.role === "fired"}
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
                                 <td className="flex items-center gap-4">
                                    {employee?.salary}{" "}
                                    <button
                                       disabled={employee.role === "fired"}
                                       onClick={() =>
                                          handleOpenSalaryModal(employee)
                                       }
                                       className="btn btn-sm bg-ourBlack text-white rounded-none whitespace-nowrap"
                                    >
                                       Update Salary
                                    </button>
                                 </td>
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
                  <UpdateSalaryModal
                     isUpdateSalaryModalOpen={isUpdateSalaryModalOpen}
                     selectedForSalaryUpdate={selectedForSalaryUpdate}
                     handleCloseSalaryModal={handleCloseSalaryModal}
                     refetch={refetch}
                  />
               </div>
            </div>
         )}

         {/* Card Grid */}
         {!tableView && (
            <div className="grid md:grid-cols-2 gap-6 p-6">
               {verifiedEmployees.map((employee) => (
                  <div
                     key={employee._id}
                     className="card  bg-base-100 shadow-xl"
                  >
                     <div className="card-body">
                        <div className="flex justify-between">
                           <div>
                              <h2 className="card-title">
                                 {employee.userName}
                              </h2>
                              <p>{employee?.designation}</p>
                           </div>

                           <img
                              referrerPolicy="no-referrer"
                              className="size-16"
                              src={employee?.photoURL || employee?.image}
                              alt={employee?.userName}
                           />
                        </div>

                        <p>
                           <span className="text-ourPrimary">Role:</span>{" "}
                           {employee.role}
                        </p>
                        <p>
                           <span className="text-ourPrimary">Salary:</span> $
                           {employee.salary}
                        </p>
                        <div className="card-actions justify-end">
                           <button
                              disabled={employee.role === "fired"}
                              onClick={() => handleOpenSalaryModal(employee)}
                              className="btn btn-sm bg-ourBlack text-white rounded-none whitespace-nowrap"
                           >
                              Update Salary
                           </button>

                           {employee?.role === "hr" ? (
                              <button
                                 disabled={true}
                                 onClick={() => handleOpenMakeHRModal(employee)}
                                 className="btn btn-sm bg-ourBlack text-white rounded-none whitespace-nowrap"
                              >
                                 Already HR
                              </button>
                           ) : (
                              <button
                                 disabled={employee.role === "fired"}
                                 onClick={() => handleOpenMakeHRModal(employee)}
                                 className="btn btn-sm bg-ourBlack text-white rounded-none whitespace-nowrap"
                              >
                                 Make HR
                              </button>
                           )}

                           {employee.role === "fired" ? (
                              <button
                                 disabled={true}
                                 className="btn btn-sm bg-ourPrimary text-white rounded-none"
                              >
                                 Fired
                              </button>
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
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default AllEmployeeList;
