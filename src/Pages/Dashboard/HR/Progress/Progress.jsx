import LoadingSpinner from "../../../../Components/Shared/LoadingSpinner";
import useAllWorks from "../../../../Hooks/useAllWorks";

const Progress = () => {
   const [allWorks, isLoading] = useAllWorks();

   if (isLoading) return <LoadingSpinner />;
   console.log(allWorks);

   return <div></div>;
};

export default Progress;
