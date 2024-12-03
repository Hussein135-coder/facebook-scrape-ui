import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PersistLogin from "./components/PersistLogin.tsx";
import Error from "./components/Error.tsx";
import Home from "./components/Home.tsx";
import Login from "./components/Login.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import Authed from "./components/Authed.tsx";
import Layout from "./components/Layout.tsx";

const App: React.FC = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route path="*" element={<Error />} />

          <Route element={<Authed />}>
            <Route path="login" element={<Login />} />
          </Route>

          {/* Protected Routes */}

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
