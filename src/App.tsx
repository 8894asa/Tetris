import { BrowserRouter, Route, Routes } from "react-router-dom";

import { QUESTIONS } from "@/const/questions";
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

        {/* クイズのページ */}
        {QUESTIONS.map((question) => (
          <Route
            key={question.id}
            path={`${url.tetrisQuiz}/${question.id}`}
            element={<TetrisQuiz question={question} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
