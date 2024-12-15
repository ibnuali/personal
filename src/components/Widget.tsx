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
    <div className="fixed left-0 top-1/4 sm:top-auto sm:left-auto sm:bottom-10 sm:right-1/2 sm:transform sm:translate-x-1/2 bg-red-500/40 rounded-xl h-fit py-3 px-3 sm:px-6 z-50">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
        {navigationItems.map(({ path, icon: Icon }) => (
          <Link key={path} to={path}>
            <Icon
              className={`hover:scale-125 text-2xl md:text-4xl transition-all duration-300 cursor-pointer ${isActive(
                path
              )}`}
              color="white"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Widget;
