import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Sign from "./pages/Sign-up/sign-up";
import Create from "./pages/Create/create";
import View from "./pages/View/view";

import { ProtectRoutes } from "./components/protectRouter";

export default () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route exact path="/Home" element={<Home />} />

        <Route exact path="/Login" element={<Login />} />

        <Route exact path="/Sign-up" element={<Sign />} />
        <Route element={<ProtectRoutes />}>
          <Route exact path="/Create" element={<Create />} />

          <Route exact path="/View" element={<View />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
