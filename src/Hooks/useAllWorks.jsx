import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllWorks = () => {
   const axiosSecure = useAxiosSecure();

   const { data: allWorks, isLoading } = useQuery({
      queryKey: ["allWorks"],
      queryFn: async () => {
         const { data } = await axiosSecure("/works");
         return data;
      },
   });

   return [allWorks, isLoading];
};

export default useAllWorks;
