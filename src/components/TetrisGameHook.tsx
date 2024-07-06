import { useEffect, useRef, useState } from "react";

import {
  FieldBlock,
  MinoType,
  Position,
  Tetrimino,
  getInitialPosition,
  minoTypes,
  newEmptyField
} from "@/domains/tetrimino";

type CurrentMino = Tetrimino & { hasHold: boolean };

type TetrisGameHookType = {
  field: FieldBlock[][];
  currentMino: CurrentMino;
  currentMinoPositions: Position[];
  holdMino: Tetrimino | undefined;
  nextMinoList: MinoType[];
  ghostPosition: Position;
};

const getMinoPositions = (mino: Tetrimino): Position[] => {
  const rotate = (
    position: Position,
    rotation: number,
    center: Position,
  ): Position => {
    const rad = (Math.PI / 2) * rotation;
    const xRotated = Math.round(
      (position.x - center.x) * Math.cos(rad) -
        (position.y - center.y) * Math.sin(rad) +
        center.x,
    );

    const yRotated = Math.round(
      (position.x - center.x) * Math.sin(rad) +
        (position.y - center.y) * Math.cos(rad) +
        center.y,
    );
    return { x: xRotated, y: yRotated };
  };

  switch (mino.type) {
    case "I":
      return [
        { x: mino.position.x, y: mino.position.y },
        { x: mino.position.x + 1, y: mino.position.y },
        { x: mino.position.x + 2, y: mino.position.y },
        { x: mino.position.x + 3, y: mino.position.y },
      ].map((position) =>
        rotate(position, mino.rotation, {
          x: mino.position.x + 1.5,
          y: mino.position.y - 0.5,
        }),
      );
    case "O":
      return [
        { x: mino.position.x, y: mino.position.y },
        { x: mino.position.x + 1, y: mino.position.y },
        { x: mino.position.x, y: mino.position.y + 1 },
        { x: mino.position.x + 1, y: mino.position.y + 1 },
      ];
    case "S": {
      const center: Position = { x: mino.position.x, y: mino.position.y };
      return [
        center,
        { x: mino.position.x - 1, y: mino.position.y },
        { x: mino.position.x, y: mino.position.y + 1 },
        { x: mino.position.x + 1, y: mino.position.y + 1 },
      ].map((position) => rotate(position, mino.rotation, center));
    }

    case "Z": {
      const center = { x: mino.position.x, y: mino.position.y };
      return [
        center,
        { x: mino.position.x - 1, y: mino.position.y + 1 },
        { x: mino.position.x, y: mino.position.y + 1 },
        { x: mino.position.x + 1, y: mino.position.y },
      ].map((position) => rotate(position, mino.rotation, center));
    }

    case "J": {
      const center = { x: mino.position.x, y: mino.position.y };
      return [
        center,
        { x: mino.position.x - 1, y: mino.position.y },
        { x: mino.position.x + 1, y: mino.position.y },
        { x: mino.position.x - 1, y: mino.position.y + 1 },
      ].map((position) => rotate(position, mino.rotation, center));
    }
    case "L": {
      const center = { x: mino.position.x, y: mino.position.y };
      return [
        center,
        { x: mino.position.x - 1, y: mino.position.y },
        { x: mino.position.x + 1, y: mino.position.y },
        { x: mino.position.x + 1, y: mino.position.y + 1 },
      ].map((position) => rotate(position, mino.rotation, center));
    }
    case "T": {
      const center = { x: mino.position.x, y: mino.position.y };
      return [
        center,
        { x: mino.position.x - 1, y: mino.position.y },
        { x: mino.position.x + 1, y: mino.position.y },
        { x: mino.position.x, y: mino.position.y + 1 },
      ].map((position) => rotate(position, mino.rotation, center));
    }
    default:
      return [];
  }
};

const isStacked = (blocks: Position[], field: FieldBlock[][]): boolean =>
  blocks.some((block) => {
    const { x, y } = block;
    return x < 0 || x > 9 || y < 0 || y > 23 || field[y][x].isFilled;
  });

const canRotate = (
  mino: Tetrimino,
  isClockwise: boolean,
  field: FieldBlock[][],
): boolean => {
  const rotatedBlocks = getMinoPositions({
    ...mino,
    rotation: mino.rotation + (isClockwise ? -1 : 1),
  });
  return !isStacked(rotatedBlocks, field);
};

const getGhostPosition = (
  mino: CurrentMino,
  field: FieldBlock[][],
): Position => {
  let ghostPosition = { ...mino.position };
  while (
    !isStacked(getMinoPositions({ ...mino, position: ghostPosition }), field)
  ) {
    ghostPosition.y -= 1; // Move the ghost piece down until it collides
  }
  return { ...ghostPosition, y: ghostPosition.y + 1 }; // Move back up one step to the last valid position
};

export function useTetrisGame(
  initialize: () => {
    field: FieldBlock[][];
    currentMino: CurrentMino;
    holdMino: Tetrimino | undefined;
    minoTypeList: MinoType[];
    nextMinoList: MinoType[];
  },
  option?: {
    judgeClear?: (field: FieldBlock[][]) => boolean;
  },
): TetrisGameHookType {
  const [time, setTime] = useState(0);
  const dropInterval = 5;

  const [minoTypeList, setMinoTypeList] = useState<MinoType[]>(
    minoTypes.concat(),
  );
  const minoListRef = useRef<MinoType[]>([]);
  // キーイベントで最新のstateを参照するためにrefを使う
  minoListRef.current = minoTypeList;

  const [nextMinoList, setNextMinoList] = useState<MinoType[]>([]);
  const nextMinoListRef = useRef<MinoType[]>([]);
  nextMinoListRef.current = nextMinoList;

  const getNextMino = (): CurrentMino => {
    // nextMinoListに追加するMinoTypeを抽選
    const additionalType =
      minoListRef.current[
        Math.floor(Math.random() * minoListRef.current.length)
      ];
    if (minoListRef.current.length === 1) {
      setMinoTypeList(minoTypes.concat());
    } else {
      setMinoTypeList(
        minoListRef.current.filter((mino) => mino !== additionalType),
      );
    }

    const nextType = nextMinoListRef.current[0];

    setNextMinoList([...nextMinoListRef.current.slice(1), additionalType]);

    return {
      type: nextType,
      position: getInitialPosition(nextType),
      rotation: 0,
      hasHold: false,
    };
  };

  const [currentMino, setCurrentMino] = useState<CurrentMino>(() => {
    const type = "I";
    return {
      position: getInitialPosition(type),
      type,
      rotation: 0,
      hasHold: false,
    };
  });
  const minoRef = useRef<CurrentMino>(null!);
  minoRef.current = currentMino;
  const [holdMino, setHoldMino] = useState<Tetrimino | undefined>(undefined);
  const holdMinoRef = useRef<Tetrimino | undefined>(undefined);
  holdMinoRef.current = holdMino;

  const [field, setField] = useState(newEmptyField());
  const fieldRef = useRef<FieldBlock[][]>(null!);
  fieldRef.current = field;

  const [ghostPosition, setGhostPosition] = useState<Position>(
    currentMino.position,
  );

  useEffect(() => {
    setGhostPosition(getGhostPosition(currentMino, fieldRef.current));
  }, [currentMino, fieldRef.current]);

  const setInitValue = () => {
    const init = initialize();
    setField(init.field);
    setCurrentMino(init.currentMino);
    setHoldMino(init.holdMino);
    setMinoTypeList(init.minoTypeList);
    setNextMinoList(init.nextMinoList);
  };

  useEffect(() => {
    setInitValue();
  }, []);

  useEffect(() => {
    const handleChangeTime = () => {
      const newTime = time + 1;
      setTime(newTime);

      if (newTime % Math.round(dropInterval) !== 0) {
        return;
      }

      // クリア判定
      if (option?.judgeClear != null && option.judgeClear(fieldRef.current)) {
        alert("clear!");
        setInitValue();
        return;
      }

      const droppedMino = {
        ...currentMino,
        position: { ...currentMino.position, y: currentMino.position.y - 1 },
      };

      // ミノが落下したら重なるか
      if (isStacked(getMinoPositions(droppedMino), fieldRef.current)) {
        // フィールド上のブロックにcurrentMinoを加える
        fieldRef.current = fieldRef.current.map((row, y) =>
          row.map((block, x) => {
            if (
              getMinoPositions(currentMino).some(
                (position) => position.x === x && position.y === y,
              )
            ) {
              return { isFilled: true, type: currentMino.type };
            }
            return block;
          }),
        );
        setField(fieldRef.current);

        // ラインが埋まっていれば消す
        fieldRef.current = [
          ...fieldRef.current.filter((row) =>
            row.some((block) => !block.isFilled),
          ),
          ...newEmptyField(),
        ].slice(0, 24);
        setField(fieldRef.current);

        const nextMino = getNextMino();

        // 負け判定
        // 21段目にミノを置くか, 次のミノの出現位置にブロックがあると負け
        if (
          getMinoPositions(currentMino).reduce(
            (min, cur) => Math.min(min, cur.y),
            24,
          ) >= 21 ||
          isStacked([getInitialPosition(nextMino.type)], fieldRef.current)
        ) {
          alert("game over!");

          setInitValue();
          return;
        }

        // ミノが設置されたので次のミノをcurrentMinoにセット
        setCurrentMino(nextMino);
        return;
      }
      setCurrentMino(droppedMino);
    };
    const timer = setInterval(handleChangeTime, 100);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        // 反時計回りに回転
        case "a": {
          if (canRotate(minoRef.current, false, fieldRef.current)) {
            setCurrentMino({
              ...minoRef.current,
              rotation: minoRef.current.rotation + 1,
            });
          }
          break;
        }
        // 時計回りに回転
        case "d": {
          if (canRotate(minoRef.current, true, fieldRef.current)) {
            setCurrentMino({
              ...minoRef.current,
              rotation: minoRef.current.rotation - 1,
            });
          }
          break;
        }
        // 左に移動
        case "ArrowLeft": {
          const movedMino = {
            ...minoRef.current,
            position: {
              ...minoRef.current.position,
              x: minoRef.current.position.x - 1,
            },
          };
          if (!isStacked(getMinoPositions(movedMino), fieldRef.current)) {
            setCurrentMino(movedMino);
          }
          break;
        }
        // 右に移動
        case "ArrowRight": {
          const movedMino = {
            ...minoRef.current,
            position: {
              ...minoRef.current.position,
              x: minoRef.current.position.x + 1,
            },
          };
          if (!isStacked(getMinoPositions(movedMino), fieldRef.current)) {
            setCurrentMino(movedMino);
          }
          break;
        }
        // ソフトドロップ
        case "ArrowDown": {
          const droppedMino = {
            ...minoRef.current,
            position: {
              ...minoRef.current.position,
              y: minoRef.current.position.y - 1,
            },
          };
          if (!isStacked(getMinoPositions(droppedMino), fieldRef.current)) {
            setCurrentMino({
              ...minoRef.current,
              position: {
                ...minoRef.current.position,
                y: minoRef.current.position.y - 1,
              },
            });
          }
          break;
        }
        // ハードドロップ
        case "ArrowUp": {
          if (
            isStacked(
              getMinoPositions({
                ...minoRef.current,
                position: {
                  ...minoRef.current.position,
                  y: minoRef.current.position.y - 1,
                },
              }),
              fieldRef.current,
            )
          ) {
            return;
          }
          let j = 20;
          while (
            !isStacked(
              getMinoPositions({
                ...minoRef.current,
                position: {
                  ...minoRef.current.position,
                  y: j,
                },
              }),
              fieldRef.current,
            )
          ) {
            // eslint-disable-next-line no-plusplus
            j--;
          }
          setCurrentMino({
            ...minoRef.current,
            position: {
              ...minoRef.current.position,
              y: j + 1,
            },
          });
          break;
        }
        // ホールド
        case " ": {
          if (!minoRef.current.hasHold) {
            if (holdMinoRef.current == null) {
              setHoldMino({ ...minoRef.current, rotation: 0 });
              setCurrentMino(getNextMino());
            } else {
              const tmp = minoRef.current;
              setCurrentMino({
                ...holdMinoRef.current,
                position: getInitialPosition(holdMinoRef.current.type),
                hasHold: true,
              });
              setHoldMino({ ...tmp, rotation: 0 });
            }
          }
          break;
        }
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    field,
    currentMino,
    currentMinoPositions: getMinoPositions(currentMino),
    holdMino,
    nextMinoList,
    ghostPosition,
  };
}
