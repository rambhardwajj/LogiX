import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
