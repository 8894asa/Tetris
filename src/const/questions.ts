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
  difficulty: "easy" | "medium" | "hard";
  name: string;
  description: string;
  initialMinoGrid: number[][];
  currentMinoType: MinoType;
  nextMinoList: MinoType[];
  answer: {
    position: { x: number; y: number };
    rotation: number;
  }[];
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    difficulty: "easy",
    name: "簡単な問題",
    description: "初心者でもできる簡単な問題です。",
    initialMinoGrid: [
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 1], // 4行目
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1], // 3行目
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1], // 2行目
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 1行目
    ],
    currentMinoType: "T",
    nextMinoList: ["O", "I", "J", "L", "S"],
    // TODO 後で考える。
    answer: [
      {
        position: { x: 1, y: 0 },
        rotation: 0,
      },
      {
        position: { x: 0, y: 0 },
        rotation: 0,
      },
      {
        position: { x: 0, y: 0 },
        rotation: 0,
      },
      {
        position: { x: 0, y: 0 },
        rotation: 0,
      },
    ],
  },
  {
    id: 2,
    difficulty: "medium",
    name: "中クラス問題",
    description: "中クラス問題です。",
    initialMinoGrid: [
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 1], // 4行目
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1], // 3行目
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1], // 2行目
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 1行目
    ],
    currentMinoType: "I",
    nextMinoList: ["O", "I", "J", "L", "S"],
    // TODO 後で考える。
    answer: [
      {
        position: { x: 1, y: 0 },
        rotation: 0,
      },
      {
        position: { x: 0, y: 0 },
        rotation: 0,
      },
      {
        position: { x: 0, y: 0 },
        rotation: 0,
      },
      {
        position: { x: 0, y: 0 },
        rotation: 0,
      },
    ],
  },
  {
    id: 3,
    difficulty: "easy",
    name: "簡単な問題",
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
        position: { x: 5, y: 1 },
        rotation: 1,
      },
      {
        position: { x: 4, y: 1 },
        rotation: 3,
      },
    ],
  },
  {
    id: 4,
    difficulty: "medium",
    name: "中クラス問題",
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
        position: { x: 4, y: 0 },
        rotation: 0,
      },
      {
        position: { x: 3, y: 2 },
        rotation: 1,
      },
      {
        position: { x: 5, y: 2 },
        rotation: 1,
      },
      {
        position: { x: 5, y: 4 },
        rotation: 2,
      },
      {
        position: { x: 1, y: 4 },
        rotation: 0,
      },
    ],
  },
  {
    id: 5,
    difficulty: "medium",
    name: "中クラス問題",
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
        position: { x: 2, y: 1 },
        rotation: 0,
      },
      {
        position: { x: 4, y: 3 },
        rotation: 1,
      },
      {
        position: { x: 0, y: 2 },
        rotation: 0,
      },
      {
        position: { x: 5, y: 3 },
        rotation: 1,
      },
      {
        position: { x: 1, y: 4 },
        rotation: 2,
      },
      {
        position: { x: 6, y: 4 },
        rotation: 0,
      },
    ],
  },
];
