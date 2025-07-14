import { Link } from "react-router-dom";
import { Button } from "@repo/ui/components/button";
import { useUser } from "../hooks";

export const Navbar = () => {
  const { data: userData } = useUser();
  let avatar = 'https://res.cloudinary.com/dmnh10etf/image/upload/v1750270944/default_epnleu.png'
  
  return (
    <nav className="sticky z-50 inset-x-0 top-0 h-13 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <img src="logo.png" width={50} alt="" />
            <span className="text-violet-950 hidden sm:block">LogiX</span>
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            <Link to="/dashboard">Dashboard ▾</Link>
            <Link to="/problems">Problems ▾</Link>
            <Link to="#">Sheets ▾</Link>
            <Link to="/discuss">Discuss ▾</Link>
            <Link to="#">Contests ▾</Link>
          </div>
        </div>

        {/* Right Buttons */}
        {!userData && (
          <div className="flex items-center space-x-4 ">
            <Link
              to="/signin"
              className="text-sm font-medium   text-gray-900 hover:underline"
            >
              Sign in
            </Link>
            <Link to="/problems">
              <Button className="bg-black text-white  hover:bg-gray-900 px-4 py-1.5 rounded-md text-sm font-semibold shadow">
                Explore Problems →
              </Button>
            </Link>
          </div>
        )}

        {userData && (
          <div className="flex items-center space-x-4  ">
            <Link to="/dashboard">
              <img src={avatar} width={30} alt="" />
            </Link>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
