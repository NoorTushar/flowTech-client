import { useParams } from "react-router-dom";
import Title from "../../../../Components/Shared/Title/Title";
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

   const { data: payments, isLoading: paymentsLoading } = useQuery({
      queryKey: ["payment", email],
      enabled: !!email,
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/pay/${email}`);
         return data;
      },
   });

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
         <Title
            title={"Employee Details"}
            titleColor={"#F86244"}
            textAlign={"center"}
         />

         <div className="flex justify-center gap-6 items-center">
            <img
               className="size-[200px] rounded-full"
               src={employee?.photoURL}
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

         <div className="my-10" style={{ width: "100%", height: 400 }}>
            <h3 className="text-center uppercase tracking-widest text-ourPrimary text-2xl">
               Salary History
            </h3>
            <ResponsiveContainer>
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
         </div>
      </div>
   );
};

export default Details;
