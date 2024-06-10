import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
   const { user } = useAuth();
   return (
      <div>
         <h2 className="dashboard-title">
            Dashboard <br />
            welcome{" "}
            <span className="text-ourPrimary">
               {user?.displayName || user?.name}
            </span>
         </h2>
      </div>
   );
};

export default Dashboard;
