import { useMutation } from "@tanstack/react-query";
import Title from "../../../../Components/Shared/Title/Title";
import useEmployees from "../../../../Hooks/useEmployees";
import EmployeeListTable from "./EmployeeListTable";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../../Components/Shared/LoadingSpinner";

const EmployeeList = () => {
   const [employees, refetch, isLoading] = useEmployees();

   console.log(employees);
   const axiosSecure = useAxiosSecure();

   const { mutateAsync: updateRole } = useMutation({
      mutationKey: ["verified"],
      mutationFn: async ({ status, email }) => {
         console.log(status);
         const { data } = await axiosSecure.patch(`/people/${email}`, {
            verified: status,
         });
         console.log(data);
      },
      onSuccess: refetch(),
   });

   const handleVerification = async (status, employee) => {
      await updateRole({ status, email: employee.email });
   };

   if (isLoading) {
      return <LoadingSpinner />;
   }

   return (
      <div>
         <Title
            title={"Employee List"}
            titleColor={"#F86244"}
            textAlign={"center"}
         />

         {/* Table */}
         <EmployeeListTable
            employees={employees}
            handleVerification={handleVerification}
         />
      </div>
   );
};

export default EmployeeList;
