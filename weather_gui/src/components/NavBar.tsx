import { Navbar, NavbarBrand } from "@nextui-org/react";
import { MdApi } from "react-icons/md";

const NavBar = () => {
  return (
    <Navbar className="bg-gray-800 h-16">
      <NavbarBrand>
        <MdApi className="w-8 h-8 text-white" />
        <p className="font-bold text-white ml-2">Weather API</p>
      </NavbarBrand>
      {/* Add student ID here */}
      <div className="flex items-center text-sm text-white px-4">
        student_ID: u2171900
      </div>
    </Navbar>
  );
};

export default NavBar;
