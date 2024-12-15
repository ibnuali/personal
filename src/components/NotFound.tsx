import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#201f25] text-white gap-4">
      <h1 className="text-6xl font-bold">404 Not Found</h1>
      <p className="text-lg font-extralight">
        The page you are looking for does not exist.
      </p>
      <Link to="/">
        <div className="flex gap-4 mt-8 items-center cursor-pointer">
          <BsArrowLeft color="white" size={40} />
          <p>Go back to Home</p>
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
