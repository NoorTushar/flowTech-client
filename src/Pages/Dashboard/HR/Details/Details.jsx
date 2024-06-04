import { useParams } from "react-router-dom";
import Title from "../../../../Components/Shared/Title/Title";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const Details = () => {
   const { email } = useParams();
   const axiosSecure = useAxiosSecure();
   console.log(email);

   const { data: employee } = useQuery({
      queryKey: ["employee", email],
      enabled: !!email,
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/people/${email}`);
         console.log(data);
         return data;
      },
   });

   const { data: payments } = useQuery({
      queryKey: ["payment", email],
      enabled: !!email,
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/pay/${email}`);
         console.log(data);
         return data;
      },
   });

   console.log(payments);

   return (
      <div>
         <Title
            title={"Employee Details"}
            titleColor={"#F86244"}
            textAlign={"center"}
         />

         <div className="flex justify-center gap-6 items-center">
            <img
               className="size-[200px] rounded-full"
               src={employee?.image}
               alt=""
            />
            <div className="space-y-6">
               <div>
                  <h3 className="uppercase tracking-wider">Employee Name: </h3>
                  <p>{employee?.userName}</p>
               </div>
               <div>
                  <h3 className="uppercase tracking-wider">Designation: </h3>
                  <p>{employee?.designation}</p>
               </div>
            </div>
         </div>

         {/* Chart */}
      </div>
   );
};

export default Details;
