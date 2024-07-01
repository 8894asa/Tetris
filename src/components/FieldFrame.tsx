import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { TetriminoUI } from "@/components/TetriminoUI";
import { url } from "@/const/url";
import { MinoType } from "@/domains/tetrimino";

type Props = {
  children: ReactNode;
  holdMinoType?: MinoType;
  nextMinoList: MinoType[];
};

export function FieldFrame({ children, holdMinoType, nextMinoList }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  // 解説ページかどうか
  const isExplainPage = location.search === "?explain";

  return (
    <div className="flex gap-4 justify-center items-center h-screen">
      <div className="w-48 mr-4">
        <div className="grid grid-cols-1 gap-4 text-center">
          <Link className="border rounded-md p-2 border-gray-500" to={url.menu}>
            メニューに戻る
          </Link>

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
                navigate("./?explain");
                window.location.reload();
              }}
            >
              解説
            </button>
          )}
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
      <div className="flex-col flex justify-center gap-4 w-32">
        <div className="text-center">NEXT</div>
        {nextMinoList.map((nextMino, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="text-center" key={i}>
            <TetriminoUI type={nextMino} />
          </div>
        ))}
      </div>
    </div>
  );
}
