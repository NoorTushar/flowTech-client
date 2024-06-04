import PropTypes from "prop-types";

const EmployeeListTable = ({ employees }) => {
   return (
      <div className="overflow-x-auto max-w-[800px] mx-auto  my-10">
         {/* <h2 className="text-center uppercase tracking-widest text-2xl mb-2">
            FLOWTECH Employees List
         </h2> */}
         <table className="table table-zebra">
            {/* head */}
            <thead>
               <tr className="*:tracking-wider uppercase text-base text-ourPrimary">
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
                     <td>{employee?.status}</td>
                     <td>{employee?.bankAC}</td>
                     <td>{employee?.salary}</td>
                     <td>PAY</td>
                     <td>{employee?.designation}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

EmployeeListTable.propTypes = {
   employees: PropTypes.array.isRequired,
};

export default EmployeeListTable;
