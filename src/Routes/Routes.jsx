import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import WorkSheet from "../Pages/Dashboard/WorkSheet/WorkSheet";
import PrivateRoute from "./PrivateRoute";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import EmployeeList from "../Pages/Dashboard/HR/EmployeeList/EmployeeList";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/login",
            element: <Login />,
         },
         {
            path: "/register",
            element: <Register />,
         },
      ],
   },
   {
      path: "/dashboard",
      element: (
         <PrivateRoute>
            <DashboardLayout />
         </PrivateRoute>
      ),
      children: [
         {
            path: "work-sheet",
            element: (
               <PrivateRoute>
                  <WorkSheet />
               </PrivateRoute>
            ),
         },

         {
            path: "payment-history",
            element: (
               <PrivateRoute>
                  <PaymentHistory />
               </PrivateRoute>
            ),
         },

         {
            path: "employee-list",
            element: (
               <PrivateRoute>
                  <EmployeeList />
               </PrivateRoute>
            ),
         },
      ],
   },
]);
