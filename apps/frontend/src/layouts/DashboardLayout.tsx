import {Navbar} from "../components/Navbar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

