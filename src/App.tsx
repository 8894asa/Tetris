import { BrowserRouter, Route, Routes } from "react-router-dom";

import { QUESTIONS } from "@/const/questions";
import { url } from "@/const/url";
import { DefaultLayout } from "@/pages/DefaultLayout";
import { MainGame } from "@/pages/MainGame";
import { Menu } from "@/pages/Menu";
import { QuizEntrance } from "@/pages/QuizEntrance";
import { SelectStage0, SelectStage1, SelectStage2 } from "@/pages/SelectStage";
import { TetrisQuiz } from "@/pages/TetrisQuiz";

function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path={url.menu} element={<Menu />} />
          <Route path={url.mainGame} element={<MainGame />} />
          <Route path={url.quizEntrance} element={<QuizEntrance />} />
          <Route path={url.level1} element={<SelectStage0 />} />
          <Route path={url.level2} element={<SelectStage1 />} />
          <Route path={url.level3} element={<SelectStage2 />} />
          {/* クイズのページ */}
          {QUESTIONS.map((question) => (
            <Route
              key={question.id}
              path={`${url.tetrisQuiz}/${question.id}`}
              element={<TetrisQuiz question={question} />}
            />
          ))}
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
}

export default App;
