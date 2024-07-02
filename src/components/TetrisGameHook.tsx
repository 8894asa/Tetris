import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  FieldBlock,
  MinoType,
  Position,
  Tetrimino,
  getInitialPosition,
  minoTypes,
  newEmptyField,
} from "@/domains/tetrimino";

type CurrentMino = Tetrimino & { hasHold: boolean };

type TetrisGameHookType = {
  field: FieldBlock[][];
  currentMino: CurrentMino;
  currentMinoPositions: Position[];
  holdMino: Tetrimino | undefined;
  formerMinos: MinoType[];
  nextMinoList: MinoType[];
  setCurrentMino: (mino: CurrentMino) => void;
  handleRotate: (rotation: number) => void;
  handleMove: (distance: number) => void;
  handleHardDrop: () => void;
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
  rotationDirection: number,
  field: FieldBlock[][],
): boolean => {
  const rotatedBlocks = getMinoPositions({
    ...mino,
    rotation: mino.rotation + rotationDirection,
  });
  return !isStacked(rotatedBlocks, field);
};

export function useTetrisGame(
  initialize: () => {
    field: FieldBlock[][];
    currentMino: CurrentMino;
    holdMino: Tetrimino | undefined;
    formerMinos: MinoType[];
    formerFields: FieldBlock[][][];
    minoTypeList: MinoType[];
    nextMinoList: MinoType[];
  },
  getNextLists: (
    minoTypeList: MinoType[],
    nextMinoList: MinoType[],
  ) => {
    newCurrentMino: Tetrimino;
    newMinoTypeList: MinoType[];
    newNextMinoList: MinoType[];
  },
  option?: {
    judgeClear?: (field: FieldBlock[][]) => boolean;
    judgeFailed?: (nextMinoList: MinoType[], field: FieldBlock[][]) => boolean;
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

  const location = useLocation();
  // 解説ページかどうか
  const isExplainPage = location.search === "?explain";

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

  const [formerMinos, setFormerMinos] = useState<MinoType[]>([]);
  const formerMinosRef = useRef<MinoType[]>([]);
  formerMinosRef.current = formerMinos;

  const [field, setField] = useState(newEmptyField());
  const fieldRef = useRef<FieldBlock[][]>(null!);
  fieldRef.current = field;

  const formerFields = useRef<FieldBlock[][][]>([]);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const isDeletingRef = useRef<boolean>(false);
  isDeletingRef.current = isDeleting;

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const [isClear, setIsClear] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const setInitValue = () => {
    const init = initialize();
    setField(init.field);
    setCurrentMino(init.currentMino);
    setHoldMino(init.holdMino);
    setFormerMinos(init.formerMinos);
    setMinoTypeList(init.minoTypeList);
    setNextMinoList(init.nextMinoList);
    formerFields.current = [];
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

      if (isClear) {
        alert("clear!");
        setIsClear(false);
        setInitValue();
        return;
      }

      if (isFailed) {
        alert("failed!");
        setIsFailed(false);
        setInitValue();
        return;
      }

      const droppedMino = {
        ...currentMino,
        position: { ...currentMino.position, y: currentMino.position.y - 1 },
      };
      // 一手戻すためにformerMinosにセット
      const currentTypeCopy = currentMino.type;
      if (formerMinosRef.current == null) {
        setFormerMinos([currentTypeCopy]);
      } else {
        const formerLength = formerMinosRef.current.length;
        if (formerMinosRef.current[formerLength - 1] !== currentTypeCopy) {
          formerMinosRef.current.push(currentTypeCopy);
        }
      }

      // ミノが落下したら重なるか
      if (!isStacked(getMinoPositions(droppedMino), fieldRef.current)) {
        setCurrentMino(droppedMino);
        return;
      }

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

      // 一手戻すためにfieldをformerFieldsにセット
      const currentField = JSON.parse(JSON.stringify(fieldRef.current));
      formerFields.current.push(currentField);

      // 削除判定中フラグをセット
      setIsDeleting(true);
      // ラインが埋まっていれば消す
      fieldRef.current = [
        ...fieldRef.current.filter((row) =>
          row.some((block) => !block.isFilled),
        ),
        ...newEmptyField(),
      ].slice(0, 24);
      setField(fieldRef.current);
      // 削除判定中フラグを解除
      setIsDeleting(false);

      // クイズ用判定
      // クリア判定
      if (option?.judgeClear != null && option.judgeClear(fieldRef.current)) {
        // currentMinoが見えないように動かす
        // 処理的にはcurrentMinoをundefinedとなっているべきだが, currentMinoにundefinedを許容すると面倒なのでやむなし
        setCurrentMino({
          ...currentMino,
          position: {
            x: 0,
            y: 24,
          },
        });
        setIsClear(true);
        return;
      }

      // 失敗判定
      if (
        option?.judgeFailed != null &&
        option.judgeFailed(nextMinoList, field)
      ) {
        setCurrentMino({
          ...currentMino,
          position: {
            x: 0,
            y: 24,
          },
        });
        setIsFailed(true);
        return;
      }

      const { newCurrentMino, newMinoTypeList, newNextMinoList } = getNextLists(
        minoListRef.current,
        nextMinoListRef.current,
      );

      // 負け判定
      // 21段目にミノを置くか, 次のミノの出現位置にブロックがあると負け
      if (
        getMinoPositions(minoRef.current).reduce(
          (min, cur) => Math.min(min, cur.y),
          24,
        ) >= 21 ||
        isStacked([getInitialPosition(newCurrentMino.type)], fieldRef.current)
      ) {
        alert("game over!");

        setInitValue();
        return;
      }

      // ミノが設置されたので次のミノをcurrentMinoにセット
      setMinoTypeList(newMinoTypeList);
      setNextMinoList(newNextMinoList);
      setCurrentMino({ ...newCurrentMino, hasHold: false });
    };

    const timer = setInterval(handleChangeTime, 100);
    return () => clearInterval(timer);
  });

  // 角度を引数に
  const handleRotate = (rotation: number) => {
    if (canRotate(minoRef.current, rotation, fieldRef.current)) {
      setCurrentMino({
        ...minoRef.current,
        rotation: minoRef.current.rotation + rotation,
      });
    }
  };

  const handleMove = (distance: number) => {
    const movedMino = {
      ...minoRef.current,
      position: {
        ...minoRef.current.position,
        x: minoRef.current.position.x + distance,
      },
    };
    if (!isStacked(getMinoPositions(movedMino), fieldRef.current)) {
      setCurrentMino(movedMino);
    }
  };

  const handleSoftDrop = (distance: number) => {
    const droppedMino = {
      ...minoRef.current,
      position: {
        ...minoRef.current.position,
        y: minoRef.current.position.y - distance,
      },
    };
    if (!isStacked(getMinoPositions(droppedMino), fieldRef.current)) {
      setCurrentMino(droppedMino);
    }
  };

  const handleHardDrop = () => {
    const yPos =
      [...Array(minoRef.current.position.y).keys()].reverse().find((y) =>
        isStacked(
          getMinoPositions({
            ...minoRef.current,
            position: { ...minoRef.current.position, y },
          }),
          fieldRef.current,
        ),
      ) ?? -1;

    setCurrentMino({
      ...minoRef.current,
      position: { ...minoRef.current.position, y: yPos + 1 },
    });
  };

  const handleHold = () => {
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
  };

  const handleUndo = () => {
    if (isDeletingRef.current || buttonDisabled) return;
    setButtonDisabled(true);

    if (formerMinosRef.current.length > 0) {
      const tmp = minoRef.current;
      const init = initialize();
      const formerFieldsLength = formerFields.current.length;

      if (formerFieldsLength <= 1) {
        setField(init.field);
        formerFields.current.length = 0;
      } else {
        setField(formerFields.current[formerFieldsLength - 2]);
        formerFields.current.pop();
      }

      if (formerMinosRef.current.length <= 1) {
        setFormerMinos([]);
        setCurrentMino(init.currentMino);
        setNextMinoList(init.nextMinoList);
      } else {
        const lastNum = formerMinosRef.current.length - 1;
        const type = formerMinosRef.current[lastNum - 1];
        setCurrentMino({
          ...minoRef.current,
          position: getInitialPosition(type),
          type,
          rotation: 0,
          hasHold: false,
        });
        setNextMinoList([tmp.type, ...nextMinoListRef.current].slice(0, 5));
        formerMinosRef.current.pop();
      }
    }

    setTimeout(() => setButtonDisabled(false), 500);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ボタンが押されたときに再度押されるのを防ぐ
      if (buttonDisabled) return;
      // 解説ページだったら無効化
      if (isExplainPage) return;

      switch (e.key) {
        case "a":
          handleRotate(-1);
          break;
        case "d":
          handleRotate(1);
          break;
        case "ArrowLeft":
          handleMove(-1);
          break;
        case "ArrowRight":
          handleMove(1);
          break;
        case "ArrowDown":
          handleSoftDrop(1);
          break;
        case "ArrowUp":
          handleHardDrop();
          break;
        case " ":
          handleHold();
          break;
        case "z":
          handleUndo();
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [buttonDisabled]);

  return {
    field,
    currentMino,
    currentMinoPositions: getMinoPositions(currentMino),
    holdMino,
    formerMinos,
    nextMinoList,
    setCurrentMino,
    handleRotate,
    handleMove,
    handleHardDrop,
  };
}
