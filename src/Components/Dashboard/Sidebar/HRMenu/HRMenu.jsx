import { LuFileSpreadsheet } from "react-icons/lu";
import MenuItem from "../MenuItem/MenuItem";

const HRMenu = () => {
   return (
      <>
         {/* Work Sheet */}
         <MenuItem
            label={"Employee List"}
            icon={LuFileSpreadsheet}
            address={"employee-list"}
         />

         {/* Progress */}
         <MenuItem
            label={"Employee Progress"}
            icon={LuFileSpreadsheet}
            address={"progress"}
         />
      </>
   );
};

export default HRMenu;
