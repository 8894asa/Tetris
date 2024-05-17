import { useEffect, useRef, useState } from "react";

import { Field } from "@/components/Field";
import { TetriminoUI } from "@/components/TetriminoUI";
import {
  FieldBlock,
  MinoType,
  Position,
  Tetrimino,
  getInitialPosition,
  minoTypes,
  newField,
} from "@/domains/tetrimino";

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

type CurrentMino = Tetrimino & { hasHold: boolean };

function App() {
  const [time, setTime] = useState(0);
  const dropInterval = 5;
  const [minoList, setMinoList] = useState<MinoType[]>(minoTypes.concat());
  const getNextMinoType = () => {
    if (minoList.length === 0) {
      const newMinoType =
        minoTypes.concat()[Math.floor(Math.random() * minoList.length)];
      setMinoList(minoTypes.concat().filter((mino) => mino !== newMinoType));
      return newMinoType;
    }
    const nextMino = minoList[Math.floor(Math.random() * minoList.length)];
    setMinoList(minoList.filter((mino) => mino !== nextMino));
    return nextMino;
  };
  const [currentMino, setCurrentMino] = useState<CurrentMino>(() => {
    const type = getNextMinoType();
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

  const [field, setField] = useState(newField());
  const fieldRef = useRef<FieldBlock[][]>(null!);
  fieldRef.current = field;

  const isStacked = (blocks: Position[]): boolean =>
    blocks.some((block) => {
      const { x, y } = block;
      return (
        x < 0 || x > 9 || y < 0 || y > 23 || fieldRef.current[y][x].isFilled
      );
    });

  const canRotate = (mino: Tetrimino, isClockwise: boolean): boolean => {
    const rotatedBlocks = getMinoPositions({
      ...mino,
      rotation: mino.rotation + (isClockwise ? 1 : -1),
    });
    return !isStacked(rotatedBlocks);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = time + 1;
      setTime(newTime);

      if (newTime % Math.round(dropInterval) !== 0) {
        return;
      }

      const droppedMino = {
        ...currentMino,
        position: { ...currentMino.position, y: currentMino.position.y - 1 },
      };
      if (isStacked(getMinoPositions(droppedMino))) {
        setField((prev) =>
          prev.map((row, y) =>
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
          ),
        );

        // ラインが埋まっていれば消す
        setField((prev) =>
          [
            ...prev.filter((row) => row.some((block) => !block.isFilled)),
            ...newField(),
          ].slice(0, 24),
        );

        const nextMinoType = getNextMinoType();

        // 負け判定
        // 21段目にミノを置いたら負け
        if (
          getMinoPositions(currentMino).reduce(
            (min, cur) => Math.min(min, cur.y),
            24,
          ) >= 21 ||
          isStacked([getInitialPosition(nextMinoType)])
        ) {
          alert("game over!");
          setField(newField());
          const newMinoType =
            minoTypes.concat()[Math.floor(Math.random() * minoTypes.length)];
          setMinoList(
            minoTypes.concat().filter((mino) => mino !== newMinoType),
          );
          setCurrentMino({
            position: getInitialPosition(newMinoType),
            type: newMinoType,
            rotation: 0,
            hasHold: false,
          });
          return;
        }

        // 次のミノをセット
        setCurrentMino((prev) => ({
          ...prev,
          position: getInitialPosition(nextMinoType),
          type: nextMinoType,
          rotation: 0,
          hasHold: false,
        }));
        return;
      }
      setCurrentMino(droppedMino);
    }, 100);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "a": {
          if (canRotate(minoRef.current, false)) {
            setCurrentMino({
              ...minoRef.current,
              rotation: minoRef.current.rotation + 1,
            });
          }
          break;
        }
        case "d": {
          if (canRotate(minoRef.current, true)) {
            setCurrentMino({
              ...minoRef.current,
              rotation: minoRef.current.rotation - 1,
            });
          }
          break;
        }
        case "ArrowLeft": {
          const movedMino = {
            ...minoRef.current,
            position: {
              ...minoRef.current.position,
              x: minoRef.current.position.x - 1,
            },
          };
          if (!isStacked(getMinoPositions(movedMino))) {
            setCurrentMino(movedMino);
          }
          break;
        }
        case "ArrowRight": {
          const movedMino = {
            ...minoRef.current,
            position: {
              ...minoRef.current.position,
              x: minoRef.current.position.x + 1,
            },
          };
          if (!isStacked(getMinoPositions(movedMino))) {
            setCurrentMino(movedMino);
          }
          break;
        }
        case "ArrowDown": {
          const droppedMino = {
            ...minoRef.current,
            position: {
              ...minoRef.current.position,
              y: minoRef.current.position.y - 1,
            },
          };
          if (!isStacked(getMinoPositions(droppedMino))) {
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
            )
          ) {
            return;
          }
          let j = 0;
          while (
            isStacked(
              getMinoPositions({
                ...minoRef.current,
                position: {
                  ...minoRef.current.position,
                  y: j,
                },
              }),
            )
          ) {
            // eslint-disable-next-line no-plusplus
            j++;
          }
          setCurrentMino({
            ...minoRef.current,
            position: {
              ...minoRef.current.position,
              y: j,
            },
          });
          break;
        }
        case " ": {
          if (!minoRef.current.hasHold) {
            if (holdMinoRef.current == null) {
              setHoldMino(minoRef.current);
              setCurrentMino({
                position: getInitialPosition(getNextMinoType()),
                type: getNextMinoType(),
                rotation: 0,
                hasHold: false,
              });
            } else {
              const tmp = minoRef.current;
              setCurrentMino({
                ...holdMinoRef.current,
                position: getInitialPosition(holdMinoRef.current.type),
                hasHold: true,
              });
              setHoldMino(tmp);
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

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-48 mr-4">
        Hold
        <div className="mt-8 h-24">
          <TetriminoUI tetriMino={holdMino} />
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
      <Field
        field={field}
        minoPositions={getMinoPositions(currentMino)}
        minoType={currentMino.type}
      />
    </div>
  );
}

export default App;
