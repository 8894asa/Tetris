import { Link } from "react-router-dom";

import { QUESTIONS } from "@/const/questions";
import { url } from "@/const/url";

export function SelectStage0() {
  const filteredQuestions = QUESTIONS.filter(
    (question) => question.difficulty === "easy",
  );
  return (
    <div className="flex gap-4 justify-center items-center h-screen">
      <div className="w-32 mr-4 flex flex-col">
        <Link
          className="flex justify-center items-center border rounded-md p-2 border-gray-500 mb-2 transform transition duration-250 ease-in-out hover:scale-110 active:scale-95"
          to={url.menu}
        >
          メニュー
        </Link>
        <Link
          className="flex justify-center items-center border rounded-md p-2 border-gray-500 transform transition duration-250 ease-in-out hover:scale-110 active:scale-95"
          to={url.quizEntrance}
        >
          難易度選択
        </Link>
      </div>
      <div className="font-bold text-center mt-20">
        <div className="text-4xl">問題選択</div>
        <div className="flex flex-col gap-4 justify-center items-center">
          {filteredQuestions.map((question, i) => (
            <Link
              key={i}
              className="w-48 border border-gray-500 rounded-md p-4 transform transition duration-500 ease-in-out hover:scale-110 active:scale-95"
              to={`${url.tetrisQuiz}/${question.id}`}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "Black",
                }}
              >
                手順数 {question.turn}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SelectStage1() {
  const filteredQuestions = QUESTIONS.filter(
    (question) => question.difficulty === "medium",
  );
  return (
    <div className="flex gap-4 justify-center items-center h-screen">
      <div className="w-32 mr-4 flex flex-col">
        <Link
          className="flex justify-center items-center border rounded-md p-2 border-gray-500 mb-2"
          to={url.menu}
        >
          メニュー
        </Link>
        <Link
          className="flex justify-center items-center border rounded-md p-2 border-gray-500"
          to={url.quizEntrance}
        >
          難易度選択
        </Link>
      </div>
      <div className="font-bold text-center mt-20">
        <div className="text-4xl">問題選択</div>
        <div className="flex flex-col gap-4 justify-center items-center">
          {filteredQuestions.map((question, i) => (
            <Link
              key={i}
              className="w-48 border border-gray-500 rounded-md p-4 transform transition duration-500 ease-in-out hover:scale-110 active:scale-95"
              to={`${url.tetrisQuiz}/${question.id}`}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "Black",
                }}
              >
                手順数 {question.turn}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SelectStage2() {
  const filteredQuestions = QUESTIONS.filter(
    (question) => question.difficulty === "hard",
  );
  return (
    <div className="flex gap-4 justify-center items-center h-screen">
      <div className="w-32 mr-4 flex flex-col">
        <Link
          className="flex justify-center items-center border rounded-md p-2 border-gray-500 mb-2"
          to={url.menu}
        >
          メニュー
        </Link>
        <Link
          className="flex justify-center items-center border rounded-md p-2 border-gray-500"
          to={url.quizEntrance}
        >
          難易度選択
        </Link>
      </div>
      <div className="font-bold text-center mt-20">
        <div className="text-4xl">問題選択</div>
        <div className="flex flex-col gap-4 justify-center items-center">
          {filteredQuestions.map((question, i) => (
            <Link
              key={i}
              className="w-48 border border-gray-500 rounded-md p-4 transform transition duration-500 ease-in-out hover:scale-110 active:scale-95"
              to={`${url.tetrisQuiz}/${question.id}`}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "Black",
                }}
              >
                手順数 {question.turn}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
