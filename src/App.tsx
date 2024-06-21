import { BrowserRouter, Route, Routes } from "react-router-dom";

import { url } from "@/const/url";
import { MainGame } from "@/pages/MainGame";
import { Menu } from "@/pages/Menu";
import { TetrisQuiz } from "@/pages/TetrisQuiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={url.menu} element={<Menu />} />
        <Route path={url.mainGame} element={<MainGame />} />
        <Route path={url.tetrisQuiz} element={<TetrisQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
