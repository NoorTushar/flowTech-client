import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../Components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AllMessages = () => {
   const axiosSecure = useAxiosSecure();
   const { data: messages = [], isLoading } = useQuery({
      queryKey: ["messages"],
      queryFn: async () => {
         const { data } = await axiosSecure("/messages");
         return data;
      },
   });

   console.log(messages);
   if (isLoading) return <LoadingSpinner />;

   return (
      <div>
         <h3 className="dashboard-title">messages</h3>

         <div className="overflow-x-auto">
            <table className="table border">
               {/* head */}
               <thead className="text-ourPrimary bg-ourLighterBlack">
                  <tr className="*:p-6">
                     <th>#</th>
                     <th>From</th>
                     <th>Message</th>
                  </tr>
               </thead>
               <tbody className="bg-ourLighterBlack">
                  {/* row 1 */}
                  {messages.map((m, i) => (
                     <tr key={m._id} className="text-ourAsh *:p-6">
                        <th>{i + 1}</th>
                        <td>{m.mailerEmail}</td>
                        <td>{m.mailerMessage}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default AllMessages;
