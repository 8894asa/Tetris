// 詰めテトリスの問題データを定義する

import { MinoType } from "@/domains/tetrimino";

// クイズの問題データを定義する

// @id 問題のID
// @difficulty 難易度
// @name 名前
// @description 問題の説明
// @initialMinoGrid 初期配置
// @currentMino 現在のミノ
// @nextMinoList 次のミノ配列
// @answer 答え
// @answer.position ミノの位置
// @answer.rotation ミノの回転

export type Question = {
  id: number;
  turn: number;
  difficulty: "easy" | "medium" | "hard";
  name: string;
  description: string;
  initialMinoGrid: number[][];
  currentMinoType: MinoType;
  nextMinoList: MinoType[];
  answer: {
    rotate: number;
    move: number;
    isHold?: boolean;
  }[];
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    turn: 4,
    difficulty: "medium",
    name: "中クラス問題1",
    description: "中クラス問題です。",
    initialMinoGrid: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 4行目
      [1, 1, 0, 0, 0, 1, 1, 1, 0, 1], // 3行目
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 2行目
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 1行目
    ],
    currentMinoType: "Z",
    nextMinoList: ["T", "J", "O"],
    answer: [
      {
        rotate: 0,
        move: -2,
      },
      {
        rotate: 2,
        move: 0,
      },
      {
        rotate: -2,
        move: 3,
      },
      {
        rotate: 0,
        move: 0,
      },
    ],
  },
  {
    id: 2,
    turn: 3,
    difficulty: "easy",
    name: "簡単な問題1",
    description: "初心者でもできる簡単な問題です。",

    initialMinoGrid: [
      [1, 1, 0, 0, 0, 0, 0, 0, 1, 1], // 4行目
      [1, 1, 1, 1, 0, 0, 0, 0, 1, 1], // 3行目
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1], // 2行目
    ],
    currentMinoType: "Z",
    nextMinoList: ["O", "I"],
    answer: [
      {
        rotate: 0,
        move: 1,
      },
      {
        rotate: 0,
        move: 2,
      },
      {
        rotate: 0,
        move: -1,
      },
    ],
  },
  {
    id: 3,
    turn: 4,
    difficulty: "medium",
    name: "中クラス問題2",
    description: "中クラス問題です。",
    initialMinoGrid: [
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0], // 4行目
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 1], // 3行目
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 1], // 2行目
      [1, 1, 1, 1, 1, 0, 1, 1, 0, 0], // 1行目
    ],
    currentMinoType: "I",
    nextMinoList: ["J", "T", "O"],
    answer: [
      {
        move: 0,
        rotate: -1,
      },
      {
        move: -1,
        rotate: -1,
      },
      {
        move: -3,
        rotate: 2,
      },
      {
        move: 4,
        rotate: 0,
      },
    ],
  },
  {
    id: 4,
    turn: 4,
    difficulty: "medium",
    name: "中クラス問題3",
    description: "中クラス問題です。",
    initialMinoGrid: [
      [1, 1, 0, 0, 1, 1, 1, 1, 1, 1], // 4行目
      [1, 1, 0, 1, 1, 0, 0, 1, 1, 1], // 3行目
      [1, 1, 0, 1, 1, 1, 0, 0, 0, 1], // 2行目
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1], // 1行目
    ],
    currentMinoType: "J",
    nextMinoList: ["L", "O", "I"],
    answer: [
      {
        rotate: -1,
        move: -2,
      },
      {
        move: 2,
        rotate: 1,
      },
      {
        move: 3,
        rotate: 0,
      },
      {
        move: -2,
        rotate: 0,
      },
    ],
  },
  {
    id: 5,
    turn: 5,
    difficulty: "hard",
    name: "上クラス問題1",
    description: "高難易度問題です。",
    initialMinoGrid: [
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 4行目
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 1], // 3行目
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 1], // 2行目
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 1], // 1行目
    ],
    currentMinoType: "L",
    nextMinoList: ["Z", "T", "O", "J"],
    answer: [
      {
        move: -3,
        rotate: 1,
      },
      {
        move: -1,
        rotate: 0,
      },
      {
        move: 1,
        rotate: 2,
      },
      {
        move: 2,
        rotate: 0,
      },
      {
        move: 0,
        rotate: 2,
      },
    ],
  },
  {
    id: 6, // hold 3->4
    turn: 4,
    difficulty: "medium",
    name: "中クラス問題4",
    description: "中クラス問題です。",
    initialMinoGrid: [
      [1, 1, 0, 0, 0, 0, 0, 1, 1, 1], // 4行目
      [1, 1, 0, 0, 0, 0, 1, 1, 1, 1], // 3行目
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1], // 2行目
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0], // 1行目
    ],
    currentMinoType: "O",
    nextMinoList: ["L", "I", "J", "L"],
    answer: [
      {
        move: -1,
        rotate: 0,
      },
      {
        move: -1,
        rotate: 2,
      },
      // hold
      {
        move: 0,
        rotate: 0,
        isHold: true,
      },
      {
        move: 1,
        rotate: -1,
      },
      // hold
      {
        move: 0,
        rotate: 0,
        isHold: true,
      },
      {
        move: 3,
        rotate: 0,
      },
    ],
  },
  {
    id: 7, // hold 2->3
    turn: 6,
    difficulty: "hard",
    name: "上クラス問題2",
    description: "高難易度問題です。",
    initialMinoGrid: [
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 1], // 4行目
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 1], // 3行目
      [1, 1, 1, 0, 0, 0, 1, 0, 1, 1], // 2行目
      [1, 1, 1, 1, 1, 0, 1, 0, 1, 1], // 1行目
    ],
    currentMinoType: "T",
    nextMinoList: ["J", "I", "L", "O"],
    answer: [
      {
        move: 1,
        rotate: 0,
      },
      {
        move: 0,
        rotate: 0,
        isHold: true,
      },
      // hold
      {
        move: -2,
        rotate: 0,
      },
      {
        move: 3,
        rotate: 1,
      },
      {
        move: 0,
        rotate: 0,
        isHold: true,
      },
      {
        move: 0,
        rotate: -2,
      },
    ],
  },
  {
    id: 8,
    turn: 2,
    difficulty: "easy",
    name: "簡単な問題2",
    description: "初心者でもできる簡単な問題です。",
    initialMinoGrid: [
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 1], // 3行目
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 1], // 2行目
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 1行目
    ],
    currentMinoType: "Z",
    nextMinoList: ["J"],
    answer: [
      {
        move: 1,
        rotate: -1,
      },
      {
        move: 0,
        rotate: -1,
      },
    ],
  },
  {
    id: 9,
    turn: 5,
    difficulty: "medium",
    name: "中クラス問題5",
    description: "中クラス問題です。",
    initialMinoGrid: [
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 1], // 5行目
      [1, 1, 0, 0, 0, 0, 1, 1, 1, 1], // 4行目
      [1, 1, 1, 0, 0, 0, 1, 1, 1, 1], // 3行目
      [1, 1, 1, 0, 0, 0, 1, 1, 1, 1], // 2行目
      [1, 1, 1, 0, 0, 0, 1, 1, 1, 1], // 1行目
    ],
    currentMinoType: "T",
    nextMinoList: ["L", "S", "L", "I"],
    answer: [
      {
        move: 0,
        rotate: 0,
      },
      {
        move: -1,
        rotate: 1,
      },
      {
        rotate: -1,
        move: 0,
      },
      {
        move: 2,
        rotate: 2,
      },
      {
        move: -2,
        rotate: 0,
      },
    ],
  },
  {
    id: 10,
    difficulty: "medium",
    turn: 6,
    name: "中クラス問題6",
    description: "中クラス問題です。",
    initialMinoGrid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5行目
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1], // 4行目
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1], // 3行目
      [1, 1, 0, 0, 1, 1, 1, 1, 1, 1], // 2行目
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 1行目
    ],
    currentMinoType: "O",
    nextMinoList: ["S", "O", "L", "J", "I"],
    answer: [
      {
        move: -2,
        rotate: 0,
      },
      {
        move: 0,
        rotate: 1,
      },
      {
        move: -4,
        rotate: 0,
      },
      {
        move: 1,
        rotate: 1,
      },
      {
        move: -3,
        rotate: 2,
      },
      {
        move: 3,
        rotate: 0,
      },
    ],
  },
  {
    id: 11,
    turn: 2,
    difficulty: "easy",
    name: "簡単な問題3",
    description: "簡単な問題です",
    initialMinoGrid: [
      [1, 1, 1, 0, 0, 0, 1, 1, 1, 1], // 4行目
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 3行目
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 1], // 2行目
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 1行目
    ],
    currentMinoType: "L",
    nextMinoList: ["T"],
    answer: [
      { rotate: 1, move: 1 },
      { rotate: 2, move: 0 },
    ],
  },
  {
    id: 12,
    turn: 5,
    difficulty: "easy",
    name: "簡単な問題4",
    description: "簡単な問題です",
    initialMinoGrid: [], // なし
    currentMinoType: "O",
    nextMinoList: ["I", "I", "I", "I"],
    answer: [
      { rotate: 0, move: 0 },
      { rotate: 0, move: -3 },
      { rotate: 0, move: -3 },
      { rotate: 0, move: 3 },
      { rotate: 0, move: 3 },
    ],
  },

  {
    id: 13,
    turn: 4,
    difficulty: "medium",
    name: "ちょいむず",
    description: "ちょいむずな問題です",
    initialMinoGrid: [
      [1, 0, 0, 0, 0, 1, 1, 0, 0, 0], // 4行目
      [1, 0, 1, 0, 1, 1, 1, 0, 0, 0], // 3行目
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1], // 2行目
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1], // 1行目
    ],
    currentMinoType: "J",
    nextMinoList: ["J", "T", "I"],
    answer: [
      { rotate: -1, move: 3 },
      { rotate: 2, move: 4 },
      { rotate: 2, move: -1 },
      { rotate: 1, move: -3 },
    ],
  },
];
