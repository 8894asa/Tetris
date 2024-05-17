module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "airbnb",
    "airbnb-typescript",
    "prettier",
    "plugin:storybook/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },

  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-props-no-spreading": "off",
    /**
     * (1) input要素（またはinputタグを出力する指示されたカスタムコンポーネント）をラップしているか
     * (2) htmlFor属性を持ち、ラベルタグがテキストコンテンツを持っているかをチェックする。
     */
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        depth: 25, // どのくらいの深さまでlabelに囲まれたinputを探すか
      },
    ],
    "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "no-restricted-imports": ["error", { patterns: ["./", "../"] }],
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
        allowNullableBoolean: false,
        allowNullableString: false,
        allowNullableNumber: false,
        allowAny: false,
      },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "import/prefer-default-export": "off",
    "no-else-return": "off",
    eqeqeq: ["error", "smart"],
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "BinaryExpression[operator='==='][right.type='Literal'][right.value=null]",
        message: "'=== null'ではなく'== null'を使用してください。",
      },
      {
        selector:
          "BinaryExpression[operator='!=='][right.type='Literal'][right.value=null]",
        message: "'!== null'ではなく'!= null'を使用してください。",
      },
      {
        selector:
          "BinaryExpression[operator='==='][right.type='Identifier'][right.name=undefined]",
        message: "'=== undefined'ではなく'== null'を使用してください。",
      },
      {
        selector:
          "BinaryExpression[operator='!=='][right.type='Identifier'][right.name=undefined]",
        message: "'!== undefined'ではなく'!= null'を使用してください。",
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "@/**",
            group: "parent",
            position: "before",
          },
        ],
        alphabetize: {
          order: "asc",
        },
        "newlines-between": "always",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
