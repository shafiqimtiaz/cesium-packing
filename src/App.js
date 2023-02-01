import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Packing } from "./components/Packing";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Menu />} />
        <Route exact path="/packing" element={<Packing />} />
      </Routes>
    </Router>
  );
}

export default App;

