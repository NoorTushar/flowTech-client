import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";

const useEmployees = () => {
   const axiosSecure = useAxiosSecure();
   const {
      data: employees = [],
      refetch,
      isLoading,
   } = useQuery({
      queryKey: ["employees"],
      queryFn: async () => {
         const { data } = await axiosSecure(`/people`);
         return data;
      },
   });

   if (isLoading) {
      <LoadingSpinner />;
   }

   return [employees, refetch];
};

export default useEmployees;
