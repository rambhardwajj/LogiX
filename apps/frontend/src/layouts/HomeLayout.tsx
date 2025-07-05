import {Footer} from "../components/Footer";
import {Navbar} from "../components/Navbar";
import { Outlet } from "react-router-dom";


export const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

