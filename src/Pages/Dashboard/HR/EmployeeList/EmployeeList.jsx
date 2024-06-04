import Title from "../../../../Components/Shared/Title/Title";
import useEmployees from "../../../../Hooks/useEmployees";
import EmployeeListTable from "./EmployeeListTable";

const EmployeeList = () => {
   const [employees] = useEmployees();

   return (
      <div>
         <Title
            title={"Employee List"}
            titleColor={"#F86244"}
            textAlign={"center"}
         />

         {/* Table */}
         <EmployeeListTable employees={employees} />
      </div>
   );
};

export default EmployeeList;
