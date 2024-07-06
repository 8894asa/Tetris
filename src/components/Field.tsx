/* eslint-disable react/no-array-index-key */
import { Block } from "@/components/Block";
import { FieldBlock, MinoType, Position, ghostPosition } from "@/domains/tetrimino";

type MinoInField = {
  positions: Position[];
  type: MinoType;
};

type Props = {
  field: FieldBlock[][];
  mino: MinoInField;
  ghostPosition: ghostPosition[];
};

const classNameFromType = (type?: string) => {
  switch (type) {
    case "I":
      return "bg-I";
    case "O":
      return "bg-O";
    case "S":
      return "bg-S";
    case "Z":
      return "bg-Z";
    case "J":
      return "bg-J";
    case "L":
      return "bg-L";
    case "T":
      return "bg-T";
    default:
      return "";
  }
};

export function Field({ field, mino, ghostPosition }: Props) {
  return (
    <div className="flex-col">
      {field
        .slice(0, 20)
        .reverse()
        .map((row, y) => (
          <div key={y} className="flex">
            {row.map((block, x) => {
              const minoBlock = mino.positions.find(
                // reverseしたので19 - position.y
                (position) => position.x === x && 19 - position.y === y,
              );
              const isGhostBlock = ghostPosition.some(
                (pos) => pos.x === x && pos.y === y,
              );
              if (minoBlock != null) {
                return (
                  <Block key={x} className={classNameFromType(mino.type)} />
                );
              }
              return (
                <Block
                  key={x}
                  className={
                    isGhostBlock
                      ? "ghost-class"
                      : block.isFilled
                        ? classNameFromType(block.type)
                        : ""
                  }
                />
              );
            })}
          </div>
        ))}
    </div>
  );
}
