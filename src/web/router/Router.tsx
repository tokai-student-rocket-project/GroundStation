import { Route, Routes } from "react-router-dom";

import { Dummy } from "../components/Dummy/Dummy";
import { Main } from "../components/Main/Main";
import { Welcome } from "../components/Welcome/Welcome";

export const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<Welcome />} />
      <Route path="/main" element={<Main />} />
      <Route path="/dummy" element={<Dummy />} />
    </Routes>
  );
};
