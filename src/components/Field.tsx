/* eslint-disable react/no-array-index-key */
import { Block } from "@/components/Block";
import { FieldBlock, MinoType, Position } from "@/domains/tetrimino";

type Props = {
  field: FieldBlock[][];
  minoPositions: Position[];
  minoType: MinoType;
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

export function Field({ field, minoPositions, minoType }: Props) {
  return (
    <div className="flex-col">
      {field
        .slice(0, 20)
        .reverse()
        .map((row, y) => (
          <div key={y} className="flex">
            {row.map((block, x) => {
              const mino = minoPositions.find(
                // reverseしたので19 - position.y
                (position) => position.x === x && 19 - position.y === y,
              );
              if (mino != null) {
                return (
                  <Block key={x} className={classNameFromType(minoType)} />
                );
              }
              return (
                <Block
                  key={x}
                  className={
                    block.isFilled ? classNameFromType(block.type) : ""
                  }
                />
              );
            })}
          </div>
        ))}
    </div>
  );
}
