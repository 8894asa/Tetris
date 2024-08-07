const blockSize = "2rem";
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        screen: ["100vh", "100dvh"],
        block: blockSize,
      },
      minHeight: {
        screen: ["100vh", "100dvh"],
      },
      maxHeight: {
        screen: ["100vh", "100dvh"],
      },
      spacing: {
        0.75: "3px",
      },
      width: {
        132: "44rem",
        22: "22rem",
        block: blockSize,
      },
      margin: {
        block: blockSize,
        "2block": `calc(${blockSize} * 2)`,
      },
      padding: {
        block: blockSize,
        "2block": `calc(${blockSize} * 2)`,
      },
      colors: {
        I: {
          DEFAULT: "#bce2e8",
        },
        O: {
          DEFAULT: "#ffff00",
        },
        S: {
          DEFAULT: "#3eb370",
        },
        Z: {
          DEFAULT: "#ff0000",
        },
        J: {
          DEFAULT: "#0000ff",
        },
        L: {
          DEFAULT: "#ee7800",
        },
        T: {
          DEFAULT: "#884898",
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s linear   both",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-p": {
          fontSize: "0.875rem", // text-sm のフォントサイズ
          lineHeight: "1.25rem", // text-sm の行の高さ
          fontWeight: "500", // font-medium のフォントウェイト
        },
        ".text-h4": {
          fontSize: "1rem", // text-base のフォントサイズ
          lineHeight: "1.5rem", // text-base の行の高さ
          fontWeight: "700", // font-bold のフォントウェイト
        },
        ".text-h3": {
          fontSize: "1.25rem", // text-xl のフォントサイズ
          lineHeight: "1.75rem", // text-xl の行の高さ
          fontWeight: "700", // font-bold のフォントウェイト
        },
        ".text-h2": {
          fontSize: "1.5rem", // text-2xl のフォントサイズ
          lineHeight: "2rem", // text-2xl の行の高さ
          fontWeight: "700", // font-bold のフォントウェイト
        },
        ".text-h1": {
          fontSize: "2.25rem", // text-4xl のフォントサイズ
          lineHeight: "2.5rem", // text-4xl の行の高さ
          fontWeight: "700", // font-bold のフォントウェイト
        },
        ".badge-success-text": {
          color: "#00601A",
        },
        ".text-success": {
          color: "#077F2E",
        },
        ".badge-warning-text": {
          color: "#933C0E",
        },
        ".text-warning": {
          color: "#B54D09",
        },
        ".badge-error-text": {
          color: "#971A1B",
        },
        ".text-error": {
          color: "#B51D1D",
        },
        ".badge-primary-text": {
          color: "#075884",
        },
        ".text-tertiary": {
          color: "#0368A0",
        },
        ".badge-gray-text": {
          color: "#1B1E25",
        },
        ".text-secondary": {
          color: "#272A31",
        },
        ".action-success-border": {
          borderColor: "#26BF56",
        },
        ".action-waring-border": {
          borderColor: "#F6970A",
        },
        ".action-error-border": {
          borderColor: "#EB4143",
        },
        ".action-primary-border": {
          borderColor: "#069CDF",
        },
        ".action-grey-border": {
          borderColor: "#C9CDD2",
        },
        ".ghost-class": {
          opacity: "0.3",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
