import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { HelmetProvider } from "react-helmet-async";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Providers/AuthProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <AuthProvider>
         <QueryClientProvider client={queryClient}>
            <HelmetProvider>
               <div className="max-w-[1280px] w-[90%] md:w-[82%] mx-auto">
                  <RouterProvider router={router} />
               </div>
            </HelmetProvider>
         </QueryClientProvider>
      </AuthProvider>
   </React.StrictMode>
);
