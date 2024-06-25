import { BrowserRouter, Route, Routes } from "react-router-dom";

import { QUESTIONS } from "@/const/questions";
import { url } from "@/const/url";
import { MainGame } from "@/pages/MainGame";
import { Menu } from "@/pages/Menu";
import { ThreeButtons } from "@/pages/QuizEntrance";
import { SelectStage0, SelectStage1, SelectStage2 } from "@/pages/SelectStage";
import { TetrisQuiz } from "@/pages/TetrisQuiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={url.menu} element={<Menu />} />
        <Route path={url.mainGame} element={<MainGame />} />
        <Route path={url.quizEntrance} element={<ThreeButtons />} />
        <Route path={url.selectstage0} element={<SelectStage0 />} />
        <Route path={url.selectstage1} element={<SelectStage1 />} />
        <Route path={url.selectstage2} element={<SelectStage2 />} />

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
