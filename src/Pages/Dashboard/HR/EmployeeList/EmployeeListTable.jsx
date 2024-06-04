import PropTypes from "prop-types";
import { ImCross } from "react-icons/im";
import { FaCircleCheck } from "react-icons/fa6";
import LinkButton from "../../../../Components/Shared/Button/LinkButton";

const EmployeeListTable = ({ employees, openModal }) => {
   return (
      <div className="overflow-x-auto max-w-[800px] mx-auto my-10">
         <table className="table table-zebra">
            <thead>
               <tr className="uppercase text-base text-ourPrimary text-center">
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
   openModal: PropTypes.func.isRequired,
};

export default EmployeeListTable;
