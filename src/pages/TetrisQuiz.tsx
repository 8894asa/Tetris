/* eslint-disable no-plusplus */
import { Field } from "@/components/Field";
import { FieldFrame } from "@/components/FieldFrame";
import { useTetrisGame } from "@/components/TetrisGameHook";
import {
  FieldBlock,
  FieldData,
  MinoType,
  getInitialPosition,
  minoTypes,
  newField,
} from "@/domains/tetrimino";

export function TetrisQuiz() {
  const getFieldData = (): FieldData[] => {
    const fieldData: FieldData[] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 10; j++) {
        switch (i) {
          case 0:
            if (j !== 4 && j !== 5) {
              fieldData.push({
                position: { x: j, y: i },
                type: "I",
              });
            }
            break;
          case 1:
            if (j !== 6) {
              fieldData.push({
                position: { x: j, y: i },
                type: "I",
              });
            }
            break;
          case 2:
            if (j !== 5 && j !== 6) {
              fieldData.push({
                position: { x: j, y: i },
                type: "I",
              });
            }
            break;
          case 3:
            if (j !== 4 && j !== 5 && j !== 6) {
              fieldData.push({
                position: { x: j, y: i },
                type: "I",
              });
            }
            break;
          default:
            return fieldData;
        }
      }
    }
    return fieldData;
  };
  // 初期化用関数
  const initialize = () => {
    const currentMinoType: MinoType = "T";

    // 5つ先まで抽選
    const nextMinoList: MinoType[] = ["O"];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < 5; i++) {
      const minoIndex = Math.floor(Math.random() * (minoTypes.length - 1 - i));
      const nextMinoType = minoTypes
        .filter((type) => type !== currentMinoType)
        .filter((type) => !nextMinoList.some((nextType) => type === nextType))[
        minoIndex
      ];
      nextMinoList.push(nextMinoType);
    }

    const currentMino = {
      type: currentMinoType,
      position: getInitialPosition(currentMinoType),
      rotation: 0,
      hasHold: false,
    };

    const minoTypeList = minoTypes
      .filter((type) => type !== currentMinoType)
      .filter((type) => !nextMinoList.some((nextType) => type === nextType));

    return {
      field: newField(getFieldData()),
      currentMino,
      nextMinoList,
      holdMino: undefined,
      minoTypeList,
    };
  };

  const judgeClear = (field: FieldBlock[][]) => {
    console.log(field);
    return !field.some((row) => row.some((block) => block.isFilled));
  };

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
