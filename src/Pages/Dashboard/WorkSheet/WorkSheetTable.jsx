import PropTypes from "prop-types";
import { format } from "date-fns";

const WorkSheetTable = ({ works }) => {
   return (
      <div className="overflow-x-auto max-w-[800px] mx-auto  my-10">
         <h2 className="text-center uppercase tracking-widest text-2xl mb-2 text-ourAsh">
            Your Work History
         </h2>
         <table className="table">
            {/* head */}
            <thead>
               <tr className="text-ourPrimary *:p-6">
                  <th>#</th>
                  <th>Task</th>
                  <th>Hours</th>
                  <th>Date</th>
               </tr>
            </thead>
            <tbody className="font-didact">
               {works.map((work, index) => (
                  <tr key={work._id} className="*:px-6 *:py-3">
                     <th className="text-ourAsh">{index + 1}</th>
                     <td>{work.task}</td>
                     <td>{work.workHours}</td>
                     <td>{format(new Date(work.workDate), "yyyy-MM-dd")}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

WorkSheetTable.propTypes = {
   works: PropTypes.array.isRequired,
};

export default WorkSheetTable;
