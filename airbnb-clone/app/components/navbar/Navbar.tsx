"use client";
import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";

interface NavbarProp {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProp> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        {" "}
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo></Logo>
            <Search></Search>
            <UserMenu currentUser={currentUser}></UserMenu>
          </div>
        </Container>
      </div>
      <Categories></Categories>
    </div>
  );
};

export default Navbar;
