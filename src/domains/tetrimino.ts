export const minoTypes = ["I", "O", "S", "Z", "J", "L", "T"] as const;
export type MinoType = (typeof minoTypes)[number];

export type Position = {
  x: number;
  y: number;
};

export type FieldBlock = {
  isFilled: boolean;
  type?: MinoType;
};

export type FieldData = {
  position: Position;
  type: MinoType;
};

export const newFieldBlock = (): FieldBlock => ({
  isFilled: false,
});

export const newEmptyField = (): FieldBlock[][] =>
  Array.from({ length: 24 }, () => Array.from({ length: 10 }, newFieldBlock));

export const newField = (filledData: FieldData[]): FieldBlock[][] => {
  const field = newEmptyField();
  filledData.forEach((data) => {
    field[data.position.y][data.position.x] = {
      isFilled: true,
      type: data.type,
    };
  });
  return field;
};

export type Tetrimino = {
  type: MinoType;
  position: { x: number; y: number };
  rotation: number;
};

export const getInitialPosition = (type: MinoType): Position => {
  switch (type) {
    case "I":
      return { x: 3, y: 21 };
    case "O":
      return { x: 4, y: 22 };
    case "S":
      return { x: 4, y: 21 };
    case "Z":
      return { x: 4, y: 21 };
    case "J":
      return { x: 4, y: 21 };
    case "L":
      return { x: 4, y: 21 };
    case "T":
      return { x: 4, y: 21 };
    default:
      return { x: 4, y: 21 };
  }
};

export type ghostPosition = {
  x: number;
  y: number;
}
