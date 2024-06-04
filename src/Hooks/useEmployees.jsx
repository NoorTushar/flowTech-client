import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";

const useEmployees = () => {
   const { user } = useAuth();
   const axiosSecure = useAxiosSecure();
   const {
      data: employees = [],
      refetch,
      isLoading,
   } = useQuery({
      queryKey: ["employees"],
      enabled: !!user.email,
      queryFn: async () => {
         const { data } = await axiosSecure(`/employees/${user.email}`);
         return data;
      },
   });

   if (isLoading) {
      <LoadingSpinner />;
   }

   return [employees, refetch];
};

export default useEmployees;
