import PropTypes from "prop-types";
import { ImCross } from "react-icons/im";
import { FaCircleCheck } from "react-icons/fa6";
import LinkButton from "../../../../Components/Shared/Button/LinkButton";

const EmployeeListTable = ({ employees, handleVerification }) => {
   return (
      <div className="overflow-x-auto max-w-[800px] mx-auto  my-10">
         {/* <h2 className="text-center uppercase tracking-widest text-2xl mb-2">
            FLOWTECH Employees List
         </h2> */}
         <table className="table table-zebra">
            {/* head */}
            <thead>
               <tr className="*:tracking-wider uppercase text-base text-ourPrimary text-center">
                  <th>#</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Bank A/C</th>
                  <th>Salary</th>
                  <th>Action</th>
                  <th>Details</th>
               </tr>
            </thead>
            <tbody className="font-didact">
               {employees.map((employee, index) => (
                  <tr key={employee._id}>
                     <th>{index + 1}</th>
                     <td>{employee?.userName}</td>
                     {employee?.verified == true ? (
                        <td>
                           <button
                              onClick={() =>
                                 handleVerification(false, employee)
                              }
                           >
                              <FaCircleCheck className="text-green-500 text-lg" />
                           </button>
                        </td>
                     ) : (
                        <td>
                           <button
                              onClick={() => handleVerification(true, employee)}
                           >
                              <ImCross className="text-ourPrimary" />
                           </button>
                        </td>
                     )}
                     <td>{employee?.bankAC}</td>
                     <td>{employee?.salary}</td>
                     <td>PAY</td>
                     <td>
                        <LinkButton name={"Details"} />
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
   handleVerification: PropTypes.func.isRequired,
};

export default EmployeeListTable;
