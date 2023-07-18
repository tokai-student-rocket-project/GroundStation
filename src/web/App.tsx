import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Dummy } from "./components/Dummy/Dummy";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dummy />} />
      </Routes>
      <Link to="/">Back To Top</Link>
    </BrowserRouter>
  );
};
