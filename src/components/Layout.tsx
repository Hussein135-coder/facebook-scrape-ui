import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-700 ">
      <Outlet />
    </div>
  );
};

export default Layout;
