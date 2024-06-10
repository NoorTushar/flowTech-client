import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   Cell,
} from "recharts";
import LoadingSpinner from "../../../../Components/Shared/LoadingSpinner";

const Details = () => {
   const { email } = useParams();
   const axiosSecure = useAxiosSecure();

   const { data: employee, isLoading: employeeLoading } = useQuery({
      queryKey: ["employee", email],
      enabled: !!email,
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/people/${email}`);
         return data;
      },
   });

   const { data: payments = [], isLoading: paymentsLoading } = useQuery({
      queryKey: ["payment", email],
      enabled: !!email,
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/pay/${email}`);
         return data;
      },
   });
   console.log(employee);
   console.log(payments);
   // Prepare the data for the chart
   const chartData =
      payments?.map((payment) => ({
         month: `${payment.month} ${payment.year}`,
         salary: payment.salary,
      })) || [];

   // Define colors for the bars
   const barColors = [
      "#8884d8",
      "#82ca9d",
      "#ffc658",
      "#ff7300",
      "#d0ed57",
      "#a4de6c",
   ];

   if (employeeLoading || paymentsLoading) {
      return <LoadingSpinner />;
   }

   return (
      <div>
         <h2 className="dashboard-title">Employee Details</h2>

         <div className="flex justify-center gap-6 items-center">
            <img
               referrerPolicy="no-referrer"
               className="size-[120px]"
               src={employee?.photoURL || employee?.image}
               alt=""
            />
            <div className="space-y-6 text-ourAsh">
               <div>
                  <h3 className="uppercase tracking-wider text-white">
                     Employee Name:{" "}
                  </h3>
                  <p>{employee?.userName}</p>
               </div>
               <div>
                  <h3 className="uppercase tracking-wider text-white">
                     Designation:{" "}
                  </h3>
                  <p>{employee?.designation}</p>
               </div>
            </div>
         </div>

         {/* Chart */}

         <div className="my-10" style={{ width: "100%", height: 400 }}>
            <h3 className="text-center uppercase tracking-widest text-ourPrimary text-2xl">
               Salary History
            </h3>

            {payments.length === 0 ? (
               <p className="text-center mt-5">
                  No chat as no salary is paid to this employee yet.
               </p>
            ) : (
               <ResponsiveContainer style={{ marginTop: "20px" }}>
                  <BarChart
                     data={chartData}
                     margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 40, // Adjusted bottom margin to make room for X-axis label
                     }}
                  >
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis
                        dataKey="month"
                        label={{
                           value: "Month",
                           position: "insideBottom",
                           offset: 0,
                           dy: 20, // Move label down slightly
                        }}
                     />
                     <YAxis
                        label={{
                           value: "Salary ($)",
                           angle: -90,
                           position: "insideLeft",
                           dy: 20, // Move label down slightly
                        }}
                     />
                     <Tooltip />
                     <Bar dataKey="salary">
                        {chartData.map((entry, index) => (
                           <Cell
                              key={`cell-${index}`}
                              fill={barColors[index % barColors.length]}
                           />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            )}
         </div>
      </div>
   );
};

export default Details;
