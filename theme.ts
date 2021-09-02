import { ComponentModel } from "ComponentModel";

export const spacing = "0.25rem";

export const colors = {
  grey: {
    100: "#E5E5E5",
    200: "#D4D4D4",
    300: "#C5C5C5",
    400: "#919191",
    500: "#595959",
    600: "#444444",
    700: "#333333",
    800: "#2A2A2A",
    900: "rgb(32, 31, 31)",
  },
  primary: {
    50: "#ffe9f0",
    100: "#ffc7d6",
    200: "#ff8d9e",
    300: "#ff5877",
    400: "#ff0053",
    500: "#ff0039",
    600: "#ff0039",
    700: "#f10033",
    800: "#e3002b",
    900: "#d4001f",
  },
  green: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    200: "#A7F3D0",
    300: "#6EE7B7",
    400: "#34D399",
    500: "#10B981",
    600: "#059669",
    700: "#047857",
    800: "#065F46",
    900: "#064E3B",
  },
  red: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
  },
  yellow: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
  },
  blue: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
  },
  indigo: {
    50: "#EEF2FF",
    100: "#E0E7FF",
    200: "#C7D2FE",
    300: "#A5B4FC",
    400: "#818CF8",
    500: "#6366F1",
    600: "#4F46E5",
    700: "#4338CA",
    800: "#3730A3",
    900: "#312E81",
  },
  purple: {
    50: "#F5F3FF",
    100: "#EDE9FE",
    200: "#DDD6FE",
    300: "#C4B5FD",
    400: "#A78BFA",
    500: "#8B5CF6",
    600: "#7C3AED",
    700: "#6D28D9",
    800: "#5B21B6",
    900: "#4C1D95",
  },
};

const reset = `
  body {
        margin:0;
        height:100%;
        font-family:sans-serif;
      }
      input, button {
        border:none;
        background:transparent;
      }
      input:focus {
        outline:none;
      }
      a {
        color:inherit;
        text-decoration:none;
      }
      a:visited {
        color:inherit;
      }
      button {
        border:none;
      }
      #App, html {
        height:100%;
      }
      ul, li {
        margin:0;
        padding:0;
        list-style-type:none;
      }
      * {
        box-sizing:border-box;
        position:relative;
      }
      `;

export const insertTheme = () => {
  const colorVars = Object.entries(colors).flatMap(([color, variants]) =>
    Object.entries(variants).map(
      ([variant, value]) => `--${color}-${variant}:${value}`
    )
  );
  const styleElem = document.createElement("style");
  styleElem.setAttribute("type", "text/css");
  styleElem.innerText = `
    ${reset}

    body {
      --spacing:${spacing};
        ${colorVars.join(";\n")};
    }
  `;
  document.head.appendChild(styleElem);
};

export const insertFonts = (components: ComponentModel[]) => {
  const fonts = {};
  components
    .flatMap((comp) => Object.values(comp.nodes))
    .forEach((node) => {
      if (node.type !== "element") {
        return;
      }
      const style = node.style;
    });
};
