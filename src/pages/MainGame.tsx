import { Field } from "@/components/Field";
import { FieldFrame } from "@/components/FieldFrame";
import { getMinoPositions, useTetrisGame } from "@/components/TetrisGameHook";
import {
  MinoType,
  Tetrimino,
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
    const newCurrentMino: Tetrimino = {
      type: nextMinoList[0],
      position: getInitialPosition(nextMinoList[0]),
      rotation: 0,
    };

    // nextMinoListに追加するMinoTypeを抽選
    const additionalType =
      minoTypeList[Math.floor(Math.random() * minoTypeList.length)];

    const newMinoTypeList =
      minoTypeList.length === 1
        ? minoTypes.concat()
        : minoTypeList.filter((mino) => mino !== additionalType);

    const newNextMinoList = [...nextMinoList.slice(1), additionalType];

    return {
      newCurrentMino,
      newMinoTypeList,
      newNextMinoList,
    };
  };

  const {
    field,
    currentMino,
    currentMinoPositions,
    holdMino,
    nextMinoList,
    ghostPosition,
  } = useTetrisGame(initialize, getNextLists);
  console.log(ghostPosition);

  return (
    <FieldFrame holdMinoType={holdMino?.type} nextMinoList={nextMinoList}>
      <Field
        field={field}
        mino={{
          positions: currentMinoPositions,
          type: currentMino.type,
        }}
        ghostMino={{
          positions: getMinoPositions({
            position: ghostPosition,
            rotation: currentMino.rotation,
            type: currentMino.type,
          }),
          type: currentMino.type,
        }}
      />
    </FieldFrame>
  );
}
