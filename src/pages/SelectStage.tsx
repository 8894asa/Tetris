import { Link } from "react-router-dom";

import { QUESTIONS } from "@/const/questions";
import { url } from "@/const/url";


export function SelectStage0() {
  return (
    <div className="font-bold text-center mt-20">
      <div className="text-4xl">問題選択</div>
      <div className="grid grid-cols-3 gap-2 mt-24 w-80 mx-auto">
        {QUESTIONS.slice(0, 9).map((question, i) => (
          <Link
            key={i}
            className= "border py-12 px-12 border-gray-500 w-full rounded-md transform transition duration-500 ease-in-out hover:scale-110 active:scale-95"
            to={`${url.tetrisQuiz}/${question.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export function SelectStage1() {
  return (
    <div className="font-bold text-center mt-20">
      <div className="text-4xl">問題選択</div>
      <div className="grid grid-cols-3 gap-2 mt-24 w-80 mx-auto">
        {QUESTIONS.slice(0, 9).map((question, i) => (
          <Link
            key={i}
            className="border py-12 px-12 border-gray-500 w-full rounded-md transform transition duration-500 ease-in-out hover:scale-110 active:scale-95"
            to={`${url.tetrisQuiz}/${question.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export function SelectStage2() {
  return (
    <div className="font-bold text-center mt-20">
      <div className="text-4xl">問題選択</div>
      <div className="grid grid-cols-3 gap-2 mt-24 w-80 mx-auto">
        {QUESTIONS.slice(0, 9).map((question, i) => (
          <Link
            key={i}
            className= "border py-12 px-12 border-gray-500 w-full rounded-md transform transition duration-500 ease-in-out hover:scale-110 active:scale-95"
            to={`${url.tetrisQuiz}/${question.id}`}
          />
        ))}
      </div>
    </div>
  );
}
