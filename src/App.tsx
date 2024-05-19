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

  const [field, setField] = useState(newField());
  const fieldRef = useRef<FieldBlock[][]>(null!);
  fieldRef.current = field;

  // 初期化用関数
  const initialize = () => {
    const currentMinoType =
      minoTypes.concat()[Math.floor(Math.random() * minoTypes.length)];

    // 5つ先まで抽選
    const nextMinoTypes: MinoType[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 5; i++) {
      const m = Math.floor(Math.random() * (minoTypes.length - 1 - i));
      const a = minoTypes
        .concat()
        .filter((type) => type !== currentMinoType)
        .filter((type) => !nextMinoTypes.some((nextType) => type === nextType))[
        m
      ];
      nextMinoTypes.push(a);
    }
    setNextMinoList(nextMinoTypes);

    setCurrentMino({
      type: currentMinoType,
      position: getInitialPosition(currentMinoType),
      rotation: 0,
      hasHold: false,
    });

    setMinoTypeList(
      minoTypes
        .concat()
        .filter((type) => type !== currentMinoType)
        .filter((type) => !nextMinoTypes.some((nextType) => type === nextType)),
    );

    setField(newField());
  };

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
      rotation: mino.rotation + (isClockwise ? -1 : 1),
    });
    return !isStacked(rotatedBlocks);
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    const handleChangeTime = () => {
      const newTime = time + 1;
      setTime(newTime);

      if (newTime % Math.round(dropInterval) !== 0) {
        return;
      }

      const droppedMino = {
        ...currentMino,
        position: { ...currentMino.position, y: currentMino.position.y - 1 },
      };

      // ミノが落下したら重なるか
      if (isStacked(getMinoPositions(droppedMino))) {
        // フィールド上のブロックにcurrentMinoを加える
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

        const nextMino = getNextMino();

        // 負け判定
        // 21段目にミノを置くか, 次のミノの出現位置にブロックがあると負け
        if (
          getMinoPositions(currentMino).reduce(
            (min, cur) => Math.min(min, cur.y),
            24,
          ) >= 21 ||
          isStacked([getInitialPosition(nextMino.type)])
        ) {
          alert("game over!");

          initialize();
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
          if (canRotate(minoRef.current, false)) {
            setCurrentMino({
              ...minoRef.current,
              rotation: minoRef.current.rotation + 1,
            });
          }
          break;
        }
        // 時計回りに回転
        case "d": {
          if (canRotate(minoRef.current, true)) {
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
          if (!isStacked(getMinoPositions(movedMino))) {
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
          if (!isStacked(getMinoPositions(movedMino))) {
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

  console.log(nextMinoList);
  console.log(minoTypeList);

  return (
    <div className="flex gap-4 justify-center items-center h-screen">
      <div className="w-48 mr-4">
        Hold
        <div className="mt-8 h-24">
          <TetriminoUI type={holdMino?.type} />
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

export default App;
