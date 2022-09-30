import { Text, type ITextStyle } from "pixi.js";

const WIDTH_NORMALIZE = 10;
const HEIGHT_NORMALIZE = 10;

type TextLayoutParams = {
  width: number;
  height: number;
};

type TextCharsParams = {
  width: number;
  layouts: Text[];
  translate?: { x: number; y: number };
};

const createText = (text: string, style?: Partial<ITextStyle>): Text => {
  return new Text(text, {
    fontFamily: "BlinkMacSystemFont",
    align: "left",
    dropShadow: false,
    fill: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    lineJoin: "round",
    ...style,
  });
};

/**
 * Split the text by line. Needed to get the right coordinates.
 * The text is centered XY relative the canvas and is not drawn to screen
 */
export const createLayout = (
  text: string,
  { width, height }: TextLayoutParams,
  style?: Partial<ITextStyle>
): Text[] => {
  const fontSize = width / WIDTH_NORMALIZE;
  const middleX = width / 2;
  const middleY = height / 2;
  const heightNorm = height / HEIGHT_NORMALIZE;
  // const textSplit = text.split(/(?=\n)/);
  const textSplit = text.split("\n");
  const middleRows = (textSplit.length - 1) / 2;

  const layouts = textSplit.map((str, i) => {
    const row = createText(str, { ...style, fontSize });
    row.x = middleX - row.width / 2;
    row.y = middleY - row.height / 2 + (i - middleRows) * heightNorm;
    return row;
  });
  return layouts;
};

/**
 * Split the text by character. Needed to animates characters individualy.
 * Each characters are tranposed from the layout's text.
 */
export const createCharacters = (
  text: string,
  { width, layouts, translate }: TextCharsParams,
  style?: Partial<ITextStyle>
): Text[] => {
  const fontSize = width / WIDTH_NORMALIZE;

  let row = 0;
  let prevWidth = 0;
  let prevX = layouts[row].x;
  const x = translate?.x || 0;
  const y = translate?.y || 0;
  const textChars = text.split("").map((char) => {
    const text = createText(char, { ...style, fontSize });
    text.y = y + layouts[row].y;
    text.x = x + prevX + prevWidth;
    prevWidth = text.width;
    prevX = text.x;

    if (char === "\n") {
      row += 1;
      prevWidth = 0;
      prevX = layouts[row].x;
    }
    return text;
  });
  return textChars;
};
