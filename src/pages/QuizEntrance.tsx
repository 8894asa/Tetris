import { Link } from "react-router-dom";

import { url } from "@/const/url";

export function QuizEntrance() {
  // こちらでbuttonsを名前、クリックイベント操作、形態と動作を指定
  const buttons: { label: string; url: string }[] = [
    { label: "Level 1", url: url.level1 },
    { label: "Level 2", url: url.level2 },
    { label: "Level 3", url: url.level3 },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-8">難易度選択</h2>
      <div className="flex flex-col gap-4 justify-center items-center mt-8 text-center">
        {buttons.map((button) => (
          <Link
            to={button.url}
            key={button.label}
            className="w-48 border rounded-md p-2 border-gray-500"
          >
            {button.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
