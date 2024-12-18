import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Preferences from "../pages/Preferences";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/preferences" element={<Preferences />} />
  </Routes>
);

export default AppRoutes;
