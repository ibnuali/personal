import {
  BiBriefcase,
  BiInfoSquare,
  BiMailSend,
  BiSolidHome,
} from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  { path: "/", icon: BiSolidHome },
  { path: "/about", icon: BiInfoSquare },
  { path: "/projects", icon: BiBriefcase },
  { path: "/contact", icon: BiMailSend },
];

const Widget = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "scale-125" : "";

  return (
    <div className="fixed bottom-10 right-1/2 transform translate-x-1/2 bg-red-500/40 rounded-xl h-fit py-3 px-6 z-50">
      <div className="flex justify-center items-center gap-10">
        {navigationItems.map(({ path, icon: Icon }) => (
          <Link key={path} to={path}>
            <Icon
              className={`hover:scale-125 transition-all duration-300 cursor-pointer ${isActive(
                path
              )}`}
              color="white"
              size={40}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Widget;
