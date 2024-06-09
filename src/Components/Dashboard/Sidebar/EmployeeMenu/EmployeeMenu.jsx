import { LuFileSpreadsheet } from "react-icons/lu";
import MenuItem from "../MenuItem/MenuItem";

const EmployeeMenu = () => {
   return (
      <>
         {/* Work Sheet */}
         <MenuItem
            label={"Work Sheet"}
            icon={LuFileSpreadsheet}
            address={"work-sheet"}
         />

         {/* Payment History */}
         <MenuItem
            label={"Payment History"}
            icon={LuFileSpreadsheet}
            address={"payment-history"}
         />
      </>
   );
};

export default EmployeeMenu;
