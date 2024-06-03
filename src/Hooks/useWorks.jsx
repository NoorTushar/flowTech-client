import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";

const useWorks = () => {
   const { user } = useAuth();
   const axiosSecure = useAxiosSecure();
   const {
      data: works = [],
      refetch,
      isLoading,
   } = useQuery({
      queryKey: ["works"],
      enabled: !!user.email,
      queryFn: async () => {
         const { data } = await axiosSecure(`/works/${user.email}`);
         return data;
      },
   });

   if (isLoading) {
      <LoadingSpinner />;
   }

   return [works, refetch];
};

export default useWorks;
