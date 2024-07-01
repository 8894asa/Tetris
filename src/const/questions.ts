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
  }[];
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    turn: 4,
    difficulty: "medium",
    name: "中クラス問題",
    description: "中クラス問題です。",
    initialMinoGrid: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 4行目
      [1, 1, 0, 0, 0, 1, 1, 1, 0, 1], // 3行目
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 2行目
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 1行目
    ],
    currentMinoType: "T",
    nextMinoList: ["O"],
    // TODO 後で考える。
    answer: [
      {
        rotate: 1,
        move: 2,
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
    name: "簡単な問題",
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
        move: 0,
      },
      {
        rotate: 0,
        move: 0,
      },
      {
        rotate: 0,
        move: 0,
      },
    ],
  },
  {
    id: 3,
    turn: 4,
    difficulty: "medium",
    name: "中クラス問題",
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
        position: { x: 5, y: 3 },
        rotation: 1,
      },
      {
        position: { x: 3, y: 3 },
        rotation: 1,
      },
      {
        position: { x: 0, y: 2 },
        rotation: 0,
      },
      {
        position: { x: 8, y: 1 },
        rotation: 0,
      },
    ],
  },
  {
    id: 4,
    turn: 4,
    difficulty: "medium",
    name: "中クラス問題",
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
        position: { x: 2, y: 3 },
        rotation: 1,
      },
      {
        position: { x: 5, y: 2 },
        rotation: 3,
      },
      {
        position: { x: 7, y: 1 },
        rotation: 0,
      },
      {
        position: { x: 1, y: 0 },
        rotation: 0,
      },
    ],
  },
  {
    id: 5,
    turn: 5,
    difficulty: "hard",
    name: "上クラス問題",
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
        position: { x: 0, y: 3 },
        rotation: 3,
      },
      {
        position: { x: 2, y: 3 },
        rotation: 0,
      },
      {
        position: { x: 4, y: 3 },
        rotation: 2,
      },
      {
        position: { x: 6, y: 2 },
        rotation: 0,
      },
      {
        position: { x: 1, y: 4 },
        rotation: 2,
      },
      {
        position: { x: 3, y: 1 },
        rotation: 2,
      },
    ],
  },
  {
    id: 6, // hold 3->4
    turn: 4,
    difficulty: "medium",
    name: "中クラス問題",
    description: "中クラス問題です。",
    initialMinoGrid: [
      [1, 1, 0, 0, 0, 0, 0, 1, 1, 1], // 4行目
      [1, 1, 0, 0, 0, 0, 1, 1, 1, 1], // 3行目
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1], // 2行目
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0], // 1行目
    ],
    currentMinoType: "O",
    nextMinoList: ["L", "I", "J"],
    answer: [
      {
        position: { x: 3, y: 3 },
        rotation: 0,
      },
      {
        position: { x: 2, y: 2 },
        rotation: 2,
      },
      // hold
      {
        position: { x: 0, y: 2 },
        rotation: 0,
      },
      {
        position: { x: 5, y: 2 },
        rotation: 1,
      },
      // hold
      {
        position: { x: 6, y: 0 },
        rotation: 0,
      },
    ],
  },
  {
    id: 7, // hold 2->3
    turn: 4,
    difficulty: "hard",
    name: "上クラス問題",
    description: "高難易度問題です。",
    initialMinoGrid: [
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 1], // 4行目
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 1], // 3行目
      [1, 1, 1, 0, 0, 0, 1, 0, 1, 1], // 2行目
      [1, 1, 1, 1, 1, 0, 1, 0, 1, 1], // 1行目
    ],
    currentMinoType: "T",
    nextMinoList: ["J", "I", "L"],
    answer: [
      {
        position: { x: 4, y: 3 },
        rotation: 0,
      },
      // hold
      {
        position: { x: 1, y: 2 },
        rotation: 1,
      },
      {
        position: { x: 0, y: 2 },
        rotation: 0,
      },
      {
        position: { x: 6, y: 2 },
        rotation: 3,
      },
      // hold
      {
        position: { x: 3, y: 1 },
        rotation: 2,
      },
    ],
  },
];
