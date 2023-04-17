import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
const UserMenu = () => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block font-semibold px-4 py-3 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={() => {}}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full hover:shadow-sm transition"
        >
          <AiOutlineMenu> </AiOutlineMenu>
          <div className="hidden md:block">
            <Avatar></Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
