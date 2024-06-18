import { MdComputer, MdOutlineDesignServices } from "react-icons/md";
import { TfiBarChart } from "react-icons/tfi";
import { GrBasket } from "react-icons/gr";
import { SlTarget } from "react-icons/sl";
import { HiOutlineChatAlt2 } from "react-icons/hi";

export const ServicesData = [
   {
      title: "User-Specific Dashboards",
      icon: MdComputer,
      description:
         "Tailored views for Employees, HR, and Admins to manage workflows, salaries, and overall employee management.",
   },
   {
      title: "Work Tracking",
      icon: TfiBarChart,
      description:
         "Employees log work hours by task; HR can monitor and filter logs and view summaries.",
   },
   {
      title: "Salary Management",
      icon: GrBasket,
      description:
         "HR can manage salaries, verify employees, and process payments securely, avoiding duplicate payments.",
   },
   {
      title: "Detailed Analytics",
      icon: MdOutlineDesignServices,
      description:
         "Interactive charts for HR to view performance and salary history, aiding data-driven decisions.",
   },
   {
      title: "Admin Controls",
      icon: SlTarget,
      description:
         "Admins can promote employees, adjust salaries, and manage employment with JWT-protected actions.",
   },
   {
      title: "Secure Data Management",
      icon: HiOutlineChatAlt2,
      description:
         "Environment variables protect Firebase config keys and MongoDB credentials, ensuring data privacy.",
   },
];
