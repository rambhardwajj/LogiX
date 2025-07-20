import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import {HomeLayout} from "./layouts/HomeLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import { AuthLayout } from "./layouts/AuthLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ResendVerification from "./pages/ResendVerification";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import Try from "./pages/Try";
import Discuss from "./pages/Discuss";
import DiscussCreate from "./pages/DiscussCreate";
import DiscussUpdatePage from "./pages/DiscussUpdate";
import { DiscussPost } from "./pages/DiscussPost";
import { Problems } from "./pages/Problems";

function App() {
  return (
    <>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/try" element={<Try />} />
          <Route path="/discuss" element={<Discuss />} />
          <Route path="/discuss/create" element={<DiscussCreate />} />
          <Route path="/discuss/update/:postId" element={<DiscussUpdatePage />} />
          <Route path="/discuss/post/:postId" element={<DiscussPost />} />
          <Route path="/problems" element={<Problems />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resend-verification" element={<ResendVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
