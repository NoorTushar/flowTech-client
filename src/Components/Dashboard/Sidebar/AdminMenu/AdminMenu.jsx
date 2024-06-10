import { LuFileSpreadsheet } from "react-icons/lu";
import MenuItem from "../MenuItem/MenuItem";

const AdminMenu = () => {
   return (
      <>
         {/* All Employee List */}
         <MenuItem
            label={"All Employee List"}
            icon={LuFileSpreadsheet}
            address={"all-employee-list"}
         />

         {/* All Messages */}
         <MenuItem
            label={"All Messages"}
            icon={LuFileSpreadsheet}
            address={"all-messages"}
         />
      </>
   );
};

export default AdminMenu;
