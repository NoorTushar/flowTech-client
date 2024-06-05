import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";
import Title from "../../../Components/Shared/Title/Title";
import PaymentHistoryTable from "./PaymentHistoryTable";

const PaymentHistory = () => {
   /**
    * todo:
    * employee wise payment history
    * user load korabo
    * then user er email diye api hit korabo to fetch datas.
    * data ashar por table e show korabo tanstack table diye, pagination apply korbo
    */
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();
   const employeeEmail = user?.email;
   console.log(employeeEmail);

   const { data: payments = [], isLoading: paymentsLoading } = useQuery({
      queryKey: ["payment", employeeEmail],
      enabled: !!employeeEmail,
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/pay/${employeeEmail}`);
         return data;
      },
   });

   if (paymentsLoading) return <LoadingSpinner />;

   console.log(payments);

   return (
      <div>
         <div>
            <Title
               title={"Payment History"}
               textAlign={"center"}
               titleColor={"black"}
            />
         </div>

         {/* table */}
         <PaymentHistoryTable payments={payments} />
      </div>
   );
};

export default PaymentHistory;
