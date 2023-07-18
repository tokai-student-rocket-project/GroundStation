import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Router } from "./router/Router";

import "./App.css";

export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 起動から3秒経ったらコンテンツに遷移する処理
    setTimeout(() => {
      navigate("/dummy");
    }, 3000);
  }, []);

  return <Router />;
};
