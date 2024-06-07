import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";

const useVerifiedEmployees = () => {
   const axiosSecure = useAxiosSecure();
   const {
      data: verifiedEmployees = [],
      refetch,
      isLoading,
   } = useQuery({
      queryKey: ["verifiedEmployees"],
      queryFn: async () => {
         const { data } = await axiosSecure(`/verified-people`);
         return data;
      },
   });

   if (isLoading) {
      <LoadingSpinner />;
   }

   return [verifiedEmployees, refetch];
};

export default useVerifiedEmployees;
