import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Packing } from "./components/Packing";
import { GlobalProvider } from "./context/GlobalState";

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Menu />} />
          <Route exact path="/packing" element={<Packing />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;

