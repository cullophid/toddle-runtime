import { createCss } from "@stitches/core";

export const { css, keyframes, global, getCssString } = createCss({
  theme: {
    fonts: {
      sans: "'Montserrat', sans-serif",
      mono: "'Fira Code', monospace;",
    },
  },
  media: {
    small: "(max-width: 479px)",
    medium: "(max-width: 767px)",
    large: "(max-width: 1023px)",
  },
  utils: {},
});

function compose<A, B, C>(f1: (a: A) => B, f2: (b: B) => C): (a: A) => C {
  return (a: A) => f2(f1(a));
}

export const style = compose(getCssString, css);
