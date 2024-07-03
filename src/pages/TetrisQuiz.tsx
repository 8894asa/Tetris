/* eslint-disable no-plusplus */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  // 解説ページかどうか
  const isExplainPage = location.search === "?explain";

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

  const {
    field,
    currentMino,
    currentMinoPositions,
    holdMino,
    nextMinoList,
    handleRotate,
    handleMove,
    handleHardDrop,
  } = useTetrisGame(initialize, { judgeClear });

  // 【解説機能】 2秒後に回転し、その2秒後とさらにその2秒後にハードドロップ
  useEffect(() => {
    if (!isExplainPage) return () => {};

    const executeStep = (index: number) => {
      if (index >= question.answer.length) {
        // 全てのステップが完了した後に2秒の遅延を追加
        setTimeout(() => {
          // 次の配列の処理をここに追加
        }, 2000);
        return;
      }

      const { rotate, move } = question.answer[index];

      // 2秒間隔で回転し、その1秒後に移動し、その1秒後にハードドロップ
      setTimeout(() => {
        handleRotate(rotate);
        setTimeout(() => {
          handleMove(move);
          setTimeout(() => {
            handleHardDrop();
            executeStep(index + 1);
          }, 1000);
        }, 1000);
      }, 2000);
    };

    executeStep(0);

    return () => {
      // 全てのタイマーをクリア
      question.answer.forEach((_, index) => clearTimeout(index * 2000));
    };
  }, []);

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
