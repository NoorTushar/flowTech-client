import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllWorks = () => {
   const axiosSecure = useAxiosSecure();

   const { data, isLoading } = useQuery({
      queryKey: ["allWorks"],
      queryFn: async () => {
         const { data } = await axiosSecure("/works");
         console.log(data);
         return data;
      },
   });

   const allWorks = data?.works || [];
   const employeeNames = data?.uniqueNames || [];

   return [allWorks, employeeNames, isLoading];
};

export default useAllWorks;
