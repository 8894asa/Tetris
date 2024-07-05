/* eslint-disable react/no-array-index-key */
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { TetriminoUI } from "@/components/TetriminoUI";
import { url } from "@/const/url";
import { MinoType } from "@/domains/tetrimino";

function explainButtons(handleHint?: () => void, isHint?: boolean) {
  const location = useLocation();
  const navigate = useNavigate();

  // 解説ページかどうか
  const isExplainPage = location.search === "?explain";
  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        className="border rounded-md p-2 border-gray-500 bg-green-500 text-white"
        onClick={handleHint}
      >
        ヒント
      </button>
      {isExplainPage ? (
        <button
          type="button"
          className="border rounded-md p-2 border-gray-500 bg-blue-500 text-white"
          onClick={() => {
            navigate("./");
            window.location.reload();
          }}
        >
          ゲームに戻る
        </button>
      ) : (
        <button
          type="button"
          className="border rounded-md p-2 border-gray-500 bg-blue-500 text-white"
          onClick={() => {
            if (isHint ?? false) {
              return;
            }
            navigate("./?explain");
            window.location.reload();
          }}
        >
          解答
        </button>
      )}
    </div>
  );
}

type Props = {
  children: ReactNode;
  holdMinoType?: MinoType;
  nextMinoList: MinoType[];
  handleHint?: () => void;
  isHint?: boolean;
  isFailed?: boolean;
  isExplainPage?: boolean;
};

export function FieldFrame({
  children,
  holdMinoType,
  nextMinoList,
  handleHint,
  isHint = false,
  isFailed = false,
  isExplainPage = false,
}: Props) {
  const location = useLocation();
  return (
    <div className="flex gap-4 justify-center items-center h-[100vh - 12rem]">
      <div className="w-64 mr-4">
        <div className="grid grid-cols-1 gap-4 text-center">
          <div className="h-16 min-h-16">
            {isExplainPage && (
              <p className="text-red-500">
                ※ 解答モードです。
                <br />
                答えの順にミノが落ちていきます。
              </p>
            )}
            {isHint && (
              <p className="text-red-500">
                ※ ヒントモードです。
                <br />
                自動で1手進めます。
              </p>
            )}
            {isFailed && <p className="text-red-500">既に間違えています。</p>}
          </div>
          {location.pathname.includes(url.tetrisQuiz) &&
            explainButtons(handleHint, isHint)}
        </div>
        <div className="mt-10">Hold</div>
        <div className="mt-8 h-24">
          <TetriminoUI type={holdMinoType} />
        </div>
        <div className="mt-8">
          A, Dで回転
          <br />
          ←, →で移動
          <br />
          ↑でハードドロップ
          <br />
          ↓でソフトドロップ
          <br />
          spaceでホールド
          <br />
          Zで一手戻る
        </div>
      </div>
      {children}
      <div>
        <div className="text-center">NEXT</div>
        <div className="mt-8 flex-col flex justify-start h-[26rem] gap-8 w-32">
          {nextMinoList.map((nextMino, i) => (
            <div className="h-16 min-h-[4rem] flex gap-8" key={i}>
              <div className="text-sm">{i + 1}</div>
              <TetriminoUI type={nextMino} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
