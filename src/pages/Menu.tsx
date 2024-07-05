import { Link } from "react-router-dom";

import { url } from "@/const/url";

export function Menu() {
  return (
    <div className="font-bold text-center">
      <h2 className="text-4xl mt-12">テトリス</h2>
      <div className="text-xl flex flex-col gap-8 mt-12">
        <Link
          className="border py-2 px-4 w-fit border-gray-500 rounded-md mx-auto"
          to={url.mainGame}
        >
          ゲーム
        </Link>
        <Link
          className="border py-2 px-4 border-gray-500 w-fit rounded-md mx-auto"
          to={url.quizEntrance}
        >
          クイズ
        </Link>
      </div>
    </div>
  );
}
