import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { TetriminoUI } from "@/components/TetriminoUI";
import { url } from "@/const/url";
import { MinoType } from "@/domains/tetrimino";

type Props = {
  children: ReactNode;
  holdMinoType?: MinoType;
  nextMinoList: MinoType[];
};

export function FieldFrame({ children, holdMinoType, nextMinoList }: Props) {
  return (
    <div className="flex gap-4 justify-center items-center h-screen">
      <div className="w-40 mr-4 flex flex-col">
         <Link className="flex justify-center items-center border rounded-md p-2 border-gray-500 mb-2 transform transition duration-250 ease-in-out hover:scale-110 active:scale-95" to={url.menu}>
            メニュー
        </Link>
        <Link className="flex justify-center items-center border rounded-md p-2 border-gray-500 transform transition duration-250 ease-in-out hover:scale-110 active:scale-95" to={url.quizEntrance}>
            難易度選択
        </Link>
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
