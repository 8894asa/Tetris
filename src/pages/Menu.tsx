import { Link } from "react-router-dom";

import { QUESTIONS } from "@/const/questions";
import { url } from "@/const/url";

export function Menu() {
  return (
    <div className="font-bold text-center mt-20">
      <div className="text-6xl">テトリス</div>
      <div className="text-3xl flex flex-col gap-16 mt-24">
        <Link
          className="border py-4 px-8 w-fit border-gray-500 rounded-md mx-auto"
          to={url.mainGame}
        >
          ゲーム
        </Link>
        {QUESTIONS.map((question) => (
          <Link
            key={question.id}
            className="border py-4 px-8 border-gray-500 w-fit rounded-md mx-auto"
            to={`${url.tetrisQuiz}/${question.id}`}
          >
            クイズ{question.difficulty}
          </Link>
        ))}
      </div>
    </div>
  );
}
