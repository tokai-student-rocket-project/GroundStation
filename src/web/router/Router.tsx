import { Route, Routes } from "react-router-dom";

import { Dummy } from "../components/Dummy/Dummy";
import { Welcome } from "../components/Welcome/Welcome";

export const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<Welcome />} />
      <Route path="/dummy" element={<Dummy />} />
    </Routes>
  );
};
