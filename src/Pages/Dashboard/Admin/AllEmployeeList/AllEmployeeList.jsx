import FireModal from "../../../../Components/Shared/Modals/FireModal";
import { useState } from "react";
import useVerifiedEmployees from "../../../../Hooks/useVerifiedEmployees";
import MakeHRModal from "../../../../Components/Shared/Modals/MakeHRModal";

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
         <h2 className="dashboard-title">all employees</h2>

         <div className="flex items-center gap-2 text-xl text-ourAsh">
            <p>Change View:</p>
            <div
               className="text-ourPrimary"
               onClick={() => setTableView(!tableView)}
            >
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
            <div className="w-full max-w-[720px] mx-auto mt-10">
               <div className="overflow-x-auto">
                  <table className="table">
                     {/* head */}
                     <thead>
                        <tr className="text-ourPrimary *:p-6">
                           <th>#</th>
                           <th>image</th>
                           <th>name</th>
                           <th>Designation</th>
                           <th>make HR</th>
                           <th>fire</th>
                           <th>Salary</th>
                           <th>update</th>
                        </tr>
                     </thead>
                     <tbody>
                        {verifiedEmployees.length > 0 ? (
                           verifiedEmployees.map((employee, index) => (
                              <tr key={employee._id} className="*:px-6 *:py-3">
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
                                 <td>{employee?.userName}</td>
                                 <td>{employee?.designation}</td>
                                 <td className="text-center">
                                    {employee?.role === "hr" ? (
                                       <button
                                          disabled={true}
                                          onClick={() =>
                                             handleOpenMakeHRModal(employee)
                                          }
                                          className="btn btn-sm disabled:bg-ourAsh disabled:text-slate-500 bg-ourBlack text-white rounded-none whitespace-nowrap"
                                       >
                                          Already HR
                                       </button>
                                    ) : (
                                       <button
                                          disabled={employee.role === "fired"}
                                          onClick={() =>
                                             handleOpenMakeHRModal(employee)
                                          }
                                          className="btn btn-sm disabled:bg-ourAsh border-transparent disabled:text-slate-500 bg-ourBlack text-white rounded-none whitespace-nowrap"
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
                                          className="btn btn-sm bg-ourPrimary border-transparent text-white rounded-none"
                                       >
                                          Fire
                                       </button>
                                    )}
                                 </td>

                                 <td className="">{employee?.salary}</td>
                                 <td>
                                    <button
                                       disabled={employee.role === "fired"}
                                       onClick={() =>
                                          handleOpenSalaryModal(employee)
                                       }
                                       className="btn btn-sm disabled:bg-ourAsh border-transparent disabled:text-slate-500 bg-ourBlack text-white rounded-none whitespace-nowrap"
                                    >
                                       Update Salary
                                    </button>
                                 </td>
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
               </div>
            </div>
         )}

         {/* Card Grid */}
         {!tableView && (
            <div className="grid md:grid-cols-2 gap-6 p-6">
               {verifiedEmployees.map((employee) => (
                  <div
                     key={employee._id}
                     className={`card shadow-xl ${
                        employee.role === "fired"
                           ? "bg-zinc-500"
                           : "bg-ourLighterBlack"
                     }`}
                  >
                     <div className="card-body">
                        <div className="flex justify-between">
                           <div className="text-ourAsh">
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

                        <p className="text-ourAsh">
                           <span className="text-ourAsh">Role:</span>{" "}
                           {employee.role}
                        </p>
                        <p className="text-ourAsh">
                           <span className="text-ourAsh">Salary:</span> $
                           {employee.salary}
                        </p>
                        <div className="card-actions justify-end">
                           <button
                              disabled={employee.role === "fired"}
                              onClick={() => handleOpenSalaryModal(employee)}
                              className="btn btn-sm border-none bg-ourBlack text-ourAsh rounded-none whitespace-nowrap"
                           >
                              Update Salary
                           </button>

                           {employee?.role === "hr" ? (
                              <button
                                 disabled={true}
                                 onClick={() => handleOpenMakeHRModal(employee)}
                                 className="btn btn-sm disabled:bg-ourAsh disabled:text-slate-500 bg-ourBlack text-white rounded-none whitespace-nowrap"
                              >
                                 Already HR
                              </button>
                           ) : (
                              <button
                                 disabled={employee.role === "fired"}
                                 onClick={() => handleOpenMakeHRModal(employee)}
                                 className="btn btn-sm border-transparent bg-ourBlack text-ourAsh rounded-none whitespace-nowrap"
                              >
                                 Make HR
                              </button>
                           )}

                           {employee.role === "fired" ? (
                              <button
                                 disabled={true}
                                 className="btn btn-sm border-none bg-ourPrimary text-white rounded-none"
                              >
                                 Fired
                              </button>
                           ) : (
                              <button
                                 onClick={() =>
                                    handleOpenModal(employee?.email)
                                 }
                                 className="btn btn-sm border-transparent bg-ourPrimary text-white rounded-none"
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

         <div>
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
   );
};

export default AllEmployeeList;
