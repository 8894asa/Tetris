/* eslint-disable no-plusplus */
import { Field } from "@/components/Field";
import { FieldFrame } from "@/components/FieldFrame";
import { useTetrisGame } from "@/components/TetrisGameHook";
import type { Question } from "@/const/questions";
import {
  FieldBlock,
  FieldData,
  getInitialPosition,
  minoTypes,
  newField,
} from "@/domains/tetrimino";

type Props = {
  question: Question;
};

export function TetrisQuiz({ question }: Props) {
  // クイズの初期フィールドのミノ配置
  const getFieldData = (): FieldData[] => {
    const fieldData: FieldData[] = [];
    const { initialMinoGrid } = question;

    for (let y = 0; y < initialMinoGrid.length; y++) {
      for (let x = 0; x < initialMinoGrid[y].length; x++) {
        if (initialMinoGrid[y][x] === 1) {
          fieldData.push({
            position: { x, y: initialMinoGrid.length - 1 - y }, // yの値を逆転させる
            type: "I",
          });
        }
      }
    }
    return fieldData;
  };

  // 初期化用関数
  const initialize = () => {
    // 最初のミノの種類,次の5つ先までのミノの種類
    const { currentMinoType, nextMinoList } = question;

    const currentMino = {
      type: currentMinoType,
      position: getInitialPosition(currentMinoType),
      rotation: 0,
      hasHold: false,
    };

    // 現在と次のミノを除く、ミノタイプのリストを作成。ミノの種類を１周期で考えたいので
    const minoTypeList = minoTypes
      .filter((type) => type !== currentMinoType)
      .filter((type) => !nextMinoList.some((nextType) => type === nextType));

    return {
      field: newField(getFieldData()),
      currentMino,
      nextMinoList,
      holdMino: undefined,
      formerMinos: [],
      formerFields: [],
      minoTypeList,
    };
  };

  const judgeClear = (field: FieldBlock[][]) =>
    !field.some((row) => row.some((block) => block.isFilled));

  const { field, currentMino, currentMinoPositions, holdMino, nextMinoList } =
    useTetrisGame(initialize, { judgeClear });

  return (
    <FieldFrame holdMinoType={holdMino?.type} nextMinoList={nextMinoList}>
      <Field
        field={field}
        mino={{
          positions: currentMinoPositions,
          type: currentMino.type,
        }}
      />
    </FieldFrame>
  );
}
