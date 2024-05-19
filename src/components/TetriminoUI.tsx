/* eslint-disable react/no-array-index-key */
import { Block } from "@/components/Block";
import { MinoType } from "@/domains/tetrimino";

type Props = {
  type?: MinoType;
};

function Imino() {
  return (
    <div className="flex">
      {Array.from({ length: 4 }).map((_, i) => (
        <Block key={i} className="bg-I" />
      ))}
    </div>
  );
}

function Omino() {
  return (
    <div className="flex-col inline-block">
      <div className="flex">
        {Array.from({ length: 2 }).map((_, i) => (
          <Block key={i} className="bg-O" />
        ))}
      </div>
      <div className="flex">
        {Array.from({ length: 2 }).map((_, i) => (
          <Block key={i} className="bg-O" />
        ))}
      </div>
    </div>
  );
}

function Smino() {
  return (
    <div className="flex-col inline-block">
      <div className="flex ml-block">
        <Block className="bg-S" />
        <Block className="bg-S" />
      </div>
      <div className="flex">
        <Block className="bg-S" />
        <Block className="bg-S" />
      </div>
    </div>
  );
}

function Zmino() {
  return (
    <div className="flex-col inline-block">
      <div className="flex">
        <Block className="bg-Z" />
        <Block className="bg-Z" />
      </div>
      <div className="flex ml-block">
        <Block className="bg-Z" />
        <Block className="bg-Z" />
      </div>
    </div>
  );
}

function Jmino() {
  return (
    <div className="flex-col inline-block">
      <Block className="bg-J" />
      <div className="flex">
        <Block className="bg-J" />
        <Block className="bg-J" />
        <Block className="bg-J" />
      </div>
    </div>
  );
}

function Lmino() {
  return (
    <div className="flex-col inline-block">
      <div className="ml-2block">
        <Block className="bg-L" />
      </div>
      <div className="flex">
        <Block className="bg-L" />
        <Block className="bg-L" />
        <Block className="bg-L" />
      </div>
    </div>
  );
}

function Tmino() {
  return (
    <div className="flex-col inline-block">
      <Block className="bg-T ml-block" />
      <div className="flex">
        <Block className="bg-T" />
        <Block className="bg-T" />
        <Block className="bg-T" />
      </div>
    </div>
  );
}

export function TetriminoUI({ type }: Props) {
  const mino = () => {
    switch (type) {
      case "I":
        return <Imino />;
      case "O":
        return <Omino />;
      case "S":
        return <Smino />;
      case "Z":
        return <Zmino />;
      case "J":
        return <Jmino />;
      case "L":
        return <Lmino />;
      case "T":
        return <Tmino />;
      default:
        return undefined;
    }
  };
  return <div>{mino()}</div>;
}
