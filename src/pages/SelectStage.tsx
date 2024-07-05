import { useNavigate } from "react-router-dom";

import { QUESTIONS, Question } from "@/const/questions";
import { url } from "@/const/url";

function SelectQuestion({ questions }: { questions: Question[] }) {
  const navigate = useNavigate();
  return (
    <div className="font-bold text-center mt-12">
      <div className="text-2xl">問題選択</div>
      <table className="mx-auto mt-12 bg-gray-100 border">
        <thead className="text-xl">
          <tr>
            <th className="w-64 py-2">問題名</th>
            <th className="w-64">手順数</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr
              key={question.id}
              className="border-t hover:cursor-pointer"
              onClick={() => navigate(`${url.tetrisQuiz}/${question.id}`)}
            >
              <td className="w-64 py-1">{question.name}</td>
              <td className="w-64">{question.turn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SelectStage0() {
  const filteredQuestions = QUESTIONS.filter(
    (question) => question.difficulty === "easy",
  );
  return <SelectQuestion questions={filteredQuestions} />;
}

export function SelectStage1() {
  const filteredQuestions = QUESTIONS.filter(
    (question) => question.difficulty === "medium",
  );
  return <SelectQuestion questions={filteredQuestions} />;
}

export function SelectStage2() {
  const filteredQuestions = QUESTIONS.filter(
    (question) => question.difficulty === "hard",
  );
  return <SelectQuestion questions={filteredQuestions} />;
}
