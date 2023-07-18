import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Dummy } from "./components/Dummy/Dummy";
import { Welcome } from "./components/Welcome/Welcome";

import "./App.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Welcome />} />
        <Route path="/dummy" element={<Dummy />} />
      </Routes>
    </BrowserRouter>
  );
};
