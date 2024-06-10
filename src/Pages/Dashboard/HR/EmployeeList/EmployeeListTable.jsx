import PropTypes from "prop-types";
import { ImCross } from "react-icons/im";
import { FaCircleCheck } from "react-icons/fa6";
import LinkButton from "../../../../Components/Shared/Button/LinkButton";

const EmployeeListTable = ({ employees, openModal, openPayModal }) => {
   return (
      <div className="overflow-x-auto md:max-w-[950px] lg:max-w-[700px] mx-auto my-10">
         <table className="table">
            <thead>
               <tr className="uppercase text-base text-ourPrimary text-center">
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Verified</th>
                  <th>Bank A/C</th>
                  <th>Salary</th>
                  <th>Pay</th>
                  <th>Details</th>
               </tr>
            </thead>
            <tbody className="font-didact">
               {employees.map((employee, index) => (
                  <tr key={employee._id}>
                     <th className="text-ourAsh">{index + 1}</th>
                     <td className="whitespace-nowrap">{employee?.userName}</td>
                     <td>{employee?.email}</td>
                     <td>
                        <button onClick={() => openModal(employee)}>
                           {employee?.verified ? (
                              <FaCircleCheck className="text-green-500 text-lg" />
                           ) : (
                              <ImCross className="text-ourPrimary" />
                           )}
                        </button>
                     </td>
                     <td>{employee?.bankAC}</td>
                     <td>{employee?.salary}</td>
                     <td>
                        <button
                           onClick={() => openPayModal(employee)}
                           disabled={!employee.verified}
                           className={`w-full px-5 py-2 ${
                              employee.verified
                                 ? "bg-ourPrimary text-white border-2 border-ourPrimary hover:bg-white hover:text-ourPrimary"
                                 : "bg-gray-400 text-gray-700 cursor-not-allowed"
                           } flex justify-center items-center duration-300 tracking-widest`}
                        >
                           PAY
                        </button>
                     </td>
                     <td>
                        <LinkButton
                           name={"Details"}
                           to={`/dashboard/details/${employee.email}`}
                        />
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

EmployeeListTable.propTypes = {
   employees: PropTypes.array.isRequired,
   openModal: PropTypes.func.isRequired,
   openPayModal: PropTypes.func.isRequired,
};

export default EmployeeListTable;
