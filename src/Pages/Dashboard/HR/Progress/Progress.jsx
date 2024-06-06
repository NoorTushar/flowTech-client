import { format } from "date-fns";
import LoadingSpinner from "../../../../Components/Shared/LoadingSpinner";
import Title from "../../../../Components/Shared/Title/Title";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Progress = () => {
   // const [allWorks, uniqueNames, isLoading] = useAllWorks();
   const axiosSecure = useAxiosSecure();
   const [selectedName, setSelectedName] = useState("");
   const [currentName, setCurrentName] = useState("");

   const { data, isLoading } = useQuery({
      queryKey: ["allWorks", selectedName],
      queryFn: async () => {
         const { data } = await axiosSecure(`/works/?name=${selectedName}`);
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

   console.log("selected Name:", selectedName);
   console.log("current name", currentName);
   const allWorks = data?.works || [];
   const uniqueNames = data?.uniqueNames || [];

   if (isLoading) return <LoadingSpinner />;
   console.log(allWorks, uniqueNames);

   return (
      <div>
         <Title
            title={"employee progress"}
            titleColor={"black"}
            textAlign={"center"}
         />
         {/* Filter Fields */}
         <div>
            <select
               name="filterName"
               value={currentName}
               onChange={handleFilterName}
            >
               <option value="">filter by name</option>
               {uniqueNames.map((uname, index) => (
                  <option key={index} value={uname.employeeName}>
                     {uname.employeeName}
                  </option>
               ))}
            </select>
         </div>
         {/* Table */}
         <div>
            <div className="overflow-x-auto">
               <table className="table table-zebra">
                  {/* head */}
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                     </tr>
                  </thead>
                  <tbody>
                     {allWorks.map((work, index) => (
                        <tr key={work._id}>
                           <td>{index + 1}</td>
                           <td>{work.employeeName}</td>
                           <td>{work.employeeEmail}</td>
                           <td>{work.task}</td>
                           <td>{work.workHours}</td>
                           <td>
                              {format(new Date(work.workDate), "dd/MM/yyyy")}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default Progress;
