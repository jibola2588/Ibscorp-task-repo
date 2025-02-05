import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className="h-[69px] py-3 px-8 flex items-center justify-between border-b border-[#ccc]">
      <h3 className="text-2xl leading-6 font-semibold text-gray-900">User</h3>
      <CgProfile style={{width:30,height:30}}/>
    </div>
  );
}

export default Navbar;
