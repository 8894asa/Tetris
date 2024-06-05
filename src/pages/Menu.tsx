import { Link } from "react-router-dom";

import { url } from "@/url";

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
        <Link
          className="border py-4 px-8 border-gray-500 w-fit rounded-md mx-auto"
          to={url.tetrisQuiz}
        >
          クイズ
        </Link>
      </div>
    </div>
  );
}
