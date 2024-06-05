import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { TetriminoUI } from "@/components/TetriminoUI";
import { MinoType } from "@/domains/tetrimino";
import { url } from "@/url";

type Props = {
  children: ReactNode;
  holdMinoType?: MinoType;
  nextMinoList: MinoType[];
};

export function FieldFrame({ children, holdMinoType, nextMinoList }: Props) {
  return (
    <div className="flex gap-4 justify-center items-center h-screen">
      <div className="w-48 mr-4">
        <Link className="border rounded-md p-2 border-gray-500" to={url.menu}>
          メニューに戻る
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
