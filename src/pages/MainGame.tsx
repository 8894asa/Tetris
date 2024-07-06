import { Field } from "@/components/Field";
import { FieldFrame } from "@/components/FieldFrame";
import { useTetrisGame } from "@/components/TetrisGameHook";
import {
  MinoType,
  getInitialPosition,
  minoTypes,
  newEmptyField,
} from "@/domains/tetrimino";

export function MainGame() {
  // 初期化用関数
  const initialize = () => {
    const currentMinoType =
      minoTypes[Math.floor(Math.random() * minoTypes.length)];

    // 5つ先まで抽選
    const nextMinoList: MinoType[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 5; i++) {
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
      field: newEmptyField(),
      currentMino,
      nextMinoList,
      holdMino: undefined,
      minoTypeList,
    };
  };

  const { field, currentMino, currentMinoPositions, holdMino, nextMinoList, ghostPosition,} =
    useTetrisGame(initialize);

  return (
    <FieldFrame holdMinoType={holdMino?.type} nextMinoList={nextMinoList}>
      <Field
        field={field}
        mino={{
          positions: currentMinoPositions,
          type: currentMino.type,
        }}
        ghostPosition={}
      />
    </FieldFrame>
  );
}
