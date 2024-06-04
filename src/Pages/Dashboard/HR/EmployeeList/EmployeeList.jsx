import { useMutation } from "@tanstack/react-query";
import Title from "../../../../Components/Shared/Title/Title";
import useEmployees from "../../../../Hooks/useEmployees";
import EmployeeListTable from "./EmployeeListTable";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../../Components/Shared/LoadingSpinner";
import ChangeVerifiedModal from "../../../../Components/Shared/Modals/ChangeVerifiedModal";
import { useState } from "react";

const EmployeeList = () => {
   const [employees, refetch, isLoading] = useEmployees();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedEmployee, setSelectedEmployee] = useState(null);
   const [newStatus, setNewStatus] = useState(false);

   const axiosSecure = useAxiosSecure();

   const { mutateAsync: updateRole } = useMutation({
      mutationKey: ["verified"],
      mutationFn: async ({ status, email }) => {
         const { data } = await axiosSecure.patch(`/people/${email}`, {
            verified: status,
         });
         console.log(data);
      },
      onSuccess: () => refetch(),
   });

   const openModal = (employee) => {
      setSelectedEmployee(employee);
      setNewStatus(!employee.verified);
      setIsModalOpen(true);
   };

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const handleConfirm = async () => {
      if (selectedEmployee) {
         await updateRole({ status: newStatus, email: selectedEmployee.email });
         setIsModalOpen(false);
      }
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
         <EmployeeListTable employees={employees} openModal={openModal} />
         <ChangeVerifiedModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={handleConfirm}
            status={newStatus}
            employee={selectedEmployee}
         />
      </div>
   );
};

export default EmployeeList;
