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
import Details from "../Pages/Dashboard/HR/Details/Details";
import Progress from "../Pages/Dashboard/HR/Progress/Progress";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AllEmployeeList from "../Pages/Dashboard/Admin/AllEmployeeList/AllEmployeeList";
import AllMessages from "../Pages/Dashboard/Admin/AllMessages/AllMessages";
import EmployeeRoute from "./EmployeeRoute";
import HRRoute from "./HRRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";

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
         {
            path: "/contact-us",
            element: <ContactUs />,
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
            path: "/dashboard",
            element: (
               <PrivateRoute>
                  <Dashboard />
               </PrivateRoute>
            ),
         },

         // Employee Only Routes
         {
            path: "work-sheet",
            element: (
               <PrivateRoute>
                  <EmployeeRoute>
                     <WorkSheet />
                  </EmployeeRoute>
               </PrivateRoute>
            ),
         },

         {
            path: "payment-history",
            element: (
               <PrivateRoute>
                  <EmployeeRoute>
                     <PaymentHistory />
                  </EmployeeRoute>
               </PrivateRoute>
            ),
         },

         // HR Only Routes
         {
            path: "employee-list",
            element: (
               <PrivateRoute>
                  <HRRoute>
                     <EmployeeList />
                  </HRRoute>
               </PrivateRoute>
            ),
         },
         {
            path: "details/:email",
            element: (
               <PrivateRoute>
                  <HRRoute>
                     <Details />
                  </HRRoute>
               </PrivateRoute>
            ),
         },
         {
            path: "progress",
            element: (
               <PrivateRoute>
                  <HRRoute>
                     <Progress />
                  </HRRoute>
               </PrivateRoute>
            ),
         },
         {
            path: "all-employee-list",
            element: (
               <PrivateRoute>
                  <AllEmployeeList />
               </PrivateRoute>
            ),
         },
         {
            path: "all-messages",
            element: (
               <PrivateRoute>
                  <AllMessages />
               </PrivateRoute>
            ),
         },
      ],
   },
]);
