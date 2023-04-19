"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      className="px-4 py-4 hover:bg-neutral-200 transition font-semibold"
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuItem;
