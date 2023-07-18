import { Route, Routes } from "react-router-dom";

import { Main } from "../features/Main/Main";
import { Welcome } from "../features/Welcome/Welcome";

export const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<Welcome />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
};
