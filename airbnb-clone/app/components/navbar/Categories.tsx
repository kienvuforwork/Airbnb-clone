"use client";
import CategoryBox from "../CategoryBox";
import Container from "../Container";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiWindmill,
  GiCactus,
  GiCaveEntrance,
  GiIsland,
  GiFishing,
  GiCastle,
  GiForestCamp,
  GiBarn,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmill",
    icon: GiWindmill,
    description: "This property has windmills",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "Country side",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an Island",
  },
  {
    label: "Fishing",
    icon: GiFishing,
    description: "This property is close to a lake! ",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property support skiing activity",
  },
  {
    label: "Castels",
    icon: GiCastle,
    description: "This property is in a Castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activity!",
  },
  {
    label: "Artic",
    icon: BsSnow,
    description: "This whether here is snowing!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the dessert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the Barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurius",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            selected={category === item.label}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
