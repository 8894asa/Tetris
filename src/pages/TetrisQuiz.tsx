import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Field } from "@/components/Field";
import { FieldFrame } from "@/components/FieldFrame";
import {
  getMinoPositions,
  isStacked,
  useTetrisGame,
} from "@/components/TetrisGameHook";
import type { Question } from "@/const/questions";
import {
  FieldBlock,
  FieldData,
  MinoType,
  Tetrimino,
  getInitialPosition,
  minoTypes,
  newEmptyField,
  newField,
} from "@/domains/tetrimino";

type Props = {
  question: Question;
};

export function TetrisQuiz({ question }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  // 解説ページかどうか
  const isExplainPage = location.search === "?explain";

  const isHintRef = useRef(false);
  const isFailedRef = useRef(false);

  // クイズの初期フィールドのミノ配置
  const getFieldData = (): FieldData[] => {
    const fieldData: FieldData[] = [];
    const { initialMinoGrid } = question;

    // eslint-disable-next-line no-plusplus
    for (let y = 0; y < initialMinoGrid.length; y++) {
      // eslint-disable-next-line no-plusplus
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

    const minoTypeList = minoTypes.concat();

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

  const getNextLists = (
    minoTypeList: MinoType[],
    nextMinoList: MinoType[],
  ): {
    newCurrentMino: Tetrimino;
    newMinoTypeList: MinoType[];
    newNextMinoList: MinoType[];
  } => {
    if (nextMinoList.length === 0) {
      console.error("nextMinoList is empty");
      return {
        newCurrentMino: {
          type: "I",
          position: getInitialPosition("I"),
          rotation: 0,
        },
        newMinoTypeList: minoTypeList,
        newNextMinoList: nextMinoList,
      };
    }

    const newCurrentMino: Tetrimino = {
      type: nextMinoList[0],
      position: getInitialPosition(nextMinoList[0]),
      rotation: 0,
    };
    return {
      newCurrentMino,
      newMinoTypeList: minoTypeList,
      newNextMinoList: nextMinoList.slice(1),
    };
  };

  const judgeClear = (field: FieldBlock[][]) =>
    !field.some((row) => row.some((block) => block.isFilled));

  const handleClear = () => {
    navigate("./");
    window.location.reload();
  };

  const judgeFailed = (nextMinoList: MinoType[]) => nextMinoList.length === 0;

  const {
    field,
    currentMino,
    currentMinoPositions,
    holdMino,
    nextMinoList,
    handleRotate,
    handleMove,
    handleHardDrop,
    handleHold,
  } = useTetrisGame(initialize, getNextLists, {
    judgeClear,
    handleClear,
    judgeFailed,
    isKeyInvalid: isExplainPage || isHintRef.current,
  });

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

      const { rotate, move, isHold } = question.answer[index];

      // 2秒間隔で回転し、その1秒後に移動し、その1秒後にハードドロップ
      setTimeout(() => {
        if (isHold ?? false) {
          handleHold();
          executeStep(index + 1);
          return;
        }
        handleRotate(rotate);
        setTimeout(() => {
          handleMove(move);
          setTimeout(() => {
            handleHardDrop();
            executeStep(index + 1);
          }, 750);
        }, 750);
      }, 1000);
    };

    executeStep(0);

    return () => {
      // 全てのタイマーをクリア
      question.answer.forEach((_, index) => clearTimeout(index * 2000));
    };
  }, []);

  const handleHint = () => {
    if (isExplainPage) return;
    const index = question.answer.length - nextMinoList.length - 1;
    let removedField = newField(getFieldData());
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < index; i++) {
      const { rotate, move } = question.answer[i];
      const mino: Tetrimino = {
        type: i === 0 ? question.currentMinoType : question.nextMinoList[i - 1],
        position: {
          ...getInitialPosition(
            i === 0 ? question.currentMinoType : question.nextMinoList[i - 1],
          ),
        },
        rotation: rotate,
      };
      mino.position.x += move;
      while (!isStacked(getMinoPositions(mino), field)) {
        // eslint-disable-next-line no-plusplus
        mino.position.y--;
      }

      // フィールド上のブロックにminoを加える
      const putField = removedField.map((row, y) =>
        row.map((block, x) => {
          if (
            getMinoPositions(mino).some(
              (position) => position.x === x && position.y === y,
            )
          ) {
            return { isFilled: true, type: mino.type };
          }
          return block;
        }),
      );
      // ラインが埋まっていれば消す
      removedField = [
        ...putField.filter((row) => row.some((block) => !block.isFilled)),
        ...newEmptyField(),
      ].slice(0, 24);
    }

    isFailedRef.current = removedField.some((row, y) =>
      row.some((block, x) => block.isFilled !== field[y][x].isFilled),
    );
    setTimeout(() => {
      isFailedRef.current = false;
    }, 2000);
    if (isFailedRef.current) {
      return;
    }

    isHintRef.current = true;
    const { rotate, move, isHold } = question.answer[index];
    setTimeout(() => {
      if (isHold ?? false) {
        handleHold();
        return;
      }
      handleRotate(rotate);
      setTimeout(() => {
        handleMove(move);
        setTimeout(() => {
          handleHardDrop();
          isHintRef.current = false;
        }, 300);
      }, 300);
    }, 700);
  };

  return (
    <FieldFrame
      holdMinoType={holdMino?.type}
      nextMinoList={nextMinoList}
      handleHint={handleHint}
      isHint={isHintRef.current}
      isFailed={isFailedRef.current}
      isExplainPage={isExplainPage}
    >
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
