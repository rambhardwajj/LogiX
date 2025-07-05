import { Link } from "react-router-dom";
import { Button } from "@repo/ui/components/button";

export const Navbar = () => {
  return (
    <nav className="sticky z-50 inset-x-0 top-0 h-16 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <img src="logo.png" width={50} alt="" />
            <span className="text-gray-900 hidden sm:block">LogiX</span>
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            <Link to="#">Product ▾</Link>
            <Link to="#">Solutions ▾</Link>
            <Link to="#">Docs ▾</Link>
            <Link to="#">Pricing</Link>
            <Link to="#">Company ▾</Link>
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-4 ">
          <Link
            to="/login"
            className="text-sm font-medium   text-gray-900 hover:underline"
          >
            Sign in
          </Link>
          <Button className="bg-black text-white  hover:bg-gray-900 px-4 py-2 rounded-md text-sm font-semibold shadow">
            Start building →
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
