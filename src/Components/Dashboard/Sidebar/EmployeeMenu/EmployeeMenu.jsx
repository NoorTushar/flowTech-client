import { BsFillHouseAddFill } from "react-icons/bs";
import MenuItem from "../MenuItem/MenuItem";

const EmployeeMenu = () => {
   return (
      <>
         <MenuItem
            icon={BsFillHouseAddFill}
            label="Add Room"
            address="add-room"
         />
      </>
   );
};

export default EmployeeMenu;
