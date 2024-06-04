import { useMutation } from "@tanstack/react-query";
import Title from "../../../../Components/Shared/Title/Title";
import useEmployees from "../../../../Hooks/useEmployees";
import EmployeeListTable from "./EmployeeListTable";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../../Components/Shared/LoadingSpinner";
import ChangeVerifiedModal from "../../../../Components/Shared/Modals/ChangeVerifiedModal";
import { useState } from "react";
import PayEmployeeModal from "../../../../Components/Shared/Modals/PayModal";
import toast from "react-hot-toast";

const EmployeeList = () => {
   const [employees, refetch, isLoading] = useEmployees();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isPayModalOpen, setIsPayModalOpen] = useState(false);
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

   const { mutateAsync: payEmployee } = useMutation({
      mutationKey: ["pay"],
      mutationFn: async ({ month, year, salary, email }) => {
         try {
            const { data } = await axiosSecure.post(`/pay`, {
               month,
               year,
               salary,
               email,
            });
            if (data.message) {
               return toast.error(
                  "You already paid this employee for this particular month"
               );
            }
            console.log(data);
            toast.success("Payment successful!");
         } catch (error) {
            toast.error(error.response.data.error);
         }
      },
      onSuccess: () => refetch(),
   });

   const openModal = (employee) => {
      setSelectedEmployee(employee);
      setNewStatus(!employee.verified);
      setIsModalOpen(true);
   };

   const openPayModal = (employee) => {
      setSelectedEmployee(employee);
      setIsPayModalOpen(true);
   };

   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedEmployee(null);
   };

   const closePayModal = () => {
      setIsPayModalOpen(false);
      setSelectedEmployee(null);
   };

   const handleConfirm = async () => {
      if (selectedEmployee) {
         await updateRole({ status: newStatus, email: selectedEmployee.email });
         setIsModalOpen(false);
         setSelectedEmployee(null);
      }
   };

   const handlePay = async ({ month, year, salary, email }) => {
      await payEmployee({ month, year, salary, email });
      setIsPayModalOpen(false);
      setSelectedEmployee(null);
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
         <EmployeeListTable
            employees={employees}
            openModal={openModal}
            openPayModal={openPayModal}
         />
         {selectedEmployee && (
            <ChangeVerifiedModal
               isOpen={isModalOpen}
               onClose={closeModal}
               onConfirm={handleConfirm}
               status={newStatus}
               employee={selectedEmployee}
            />
         )}
         {selectedEmployee && (
            <PayEmployeeModal
               isOpen={isPayModalOpen}
               onClose={closePayModal}
               onPay={handlePay}
               employee={selectedEmployee}
            />
         )}
      </div>
   );
};

export default EmployeeList;
