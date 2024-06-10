import { format } from "date-fns";
import LoadingSpinner from "../../../../Components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Progress = () => {
   // const [allWorks, uniqueNames, isLoading] = useAllWorks();
   const axiosSecure = useAxiosSecure();
   const [selectedName, setSelectedName] = useState("");
   const [currentName, setCurrentName] = useState("");

   const [selectMonth, setSelectMonth] = useState("");
   const [currentMonth, setCurrentMonth] = useState("");

   const months = [
      {
         month: "January",
         code: "01",
      },
      {
         month: "February",
         code: "02",
      },
      {
         month: "March",
         code: "03",
      },
      {
         month: "April",
         code: "04",
      },
      {
         month: "May",
         code: "05",
      },
      {
         month: "June",
         code: "06",
      },
      {
         month: "July",
         code: "07",
      },
      {
         month: "August",
         code: "08",
      },
      {
         month: "September",
         code: "09",
      },
      {
         month: "October",
         code: "10",
      },
      {
         month: "November",
         code: "11",
      },
      {
         month: "December",
         code: "12",
      },
   ];

   const { data, isLoading } = useQuery({
      queryKey: ["allWorks", selectedName, selectMonth],
      queryFn: async () => {
         const { data } = await axiosSecure(
            `/works/?name=${selectedName}&month=${selectMonth}`
         );
         console.log(data);
         return data;
      },
   });

   const handleFilterName = (e) => {
      e.preventDefault();
      setSelectedName(e.target.value);
   };

   useEffect(() => {
      setCurrentName(selectedName);
   }, [selectedName]);

   const handleMonthName = (e) => {
      e.preventDefault();
      setSelectMonth(e.target.value);
   };

   useEffect(() => {
      setCurrentMonth(selectMonth);
   }, [selectMonth]);

   console.log("selected Name:", selectedName);
   console.log("current name", currentName);
   console.log("selected month:", selectMonth);
   console.log("current month", currentMonth);
   const allWorks = data?.works || [];
   const uniqueNames = data?.uniqueNames || [];
   // Using reduce to sum all work hours
   const totalWorkHours = allWorks.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.workHours;
   }, 0);

   if (isLoading) return <LoadingSpinner />;

   return (
      <div>
         <h2 className="dashboard-title">employee progress</h2>
         {/* Filter Fields */}
         <div>
            {/* Select Name */}
            <div className="flex items-center gap-2">
               <p className="text-ourAsh">Filter by Name: </p>
               <select
                  name="filterName"
                  value={currentName}
                  onChange={handleFilterName}
                  className="outline-none font-didact  bg-ourLighterBlack text-white p-2"
               >
                  <option value="">filter by name</option>
                  {uniqueNames.map((uname, index) => (
                     <option key={index} value={uname.employeeName}>
                        {uname.employeeName}
                     </option>
                  ))}
               </select>
            </div>
            {/* Select Month */}
            <div className="flex items-center gap-2 my-2">
               <p className="text-ourAsh">Filter by Month: </p>
               <select
                  className="outline-none font-didact  bg-ourLighterBlack text-white p-2"
                  name="month"
                  value={currentMonth}
                  onChange={handleMonthName}
               >
                  <option value="">filter by month</option>
                  {months.map((month, index) => (
                     <option key={index} value={month.code}>
                        {month.month}
                     </option>
                  ))}
               </select>
            </div>
         </div>
         {/* Total Hours Worked */}
         <div>
            <h3 className="text-ourAsh py-2">
               Total Hours Worked :{" "}
               <span className="text-ourPrimary">{totalWorkHours}</span>
            </h3>
         </div>
         {/* Table */}
         <div className="mt-4">
            <div className="overflow-x-auto">
               <table className="table">
                  {/* head */}
                  <thead className="text-ourPrimary">
                     <tr className="*:p-6">
                        <th>#</th>
                        <th>name</th>
                        <th>task</th>
                        <th>hours</th>
                        <th>date</th>
                        <th>email</th>
                     </tr>
                  </thead>
                  <tbody>
                     {allWorks.length > 0 ? (
                        allWorks.map((work, index) => (
                           <tr key={work._id} className="*:px-6 *:py-3">
                              <td>{index + 1}</td>
                              <td>{work.employeeName}</td>
                              <td>{work.task}</td>
                              <td>{work.workHours}</td>
                              <td>
                                 {format(new Date(work.workDate), "dd/MM/yyyy")}
                              </td>
                              <td>{work.employeeEmail}</td>
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
      </div>
   );
};

export default Progress;
