import { BLEND_MODES, Filter, filters, Text, type ITextStyle } from "pixi.js";

import { WIDTH_NORMALIZE, HEIGHT_NORMALIZE } from "./constants";

const createText = (text: string, style?: Partial<ITextStyle>): Text => {
  return new Text(text, {
    fontFamily: "BlinkMacSystemFont",
    align: "center",
    dropShadow: false,
    fill: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    lineJoin: "round",
    ...style,
  });
};

/**
 * Split the text by line. Needed to get the right coordinates.
 * The text is centered XY relative the canvas and its not drawn to screen
 */

type TextLayoutParams = {
  width: number;
  height: number;
};

export const createLayout = (
  text: string,
  { width, height }: TextLayoutParams,
  style?: Partial<ITextStyle>
): Text[] => {
  const fontSize = width / WIDTH_NORMALIZE;
  const middleX = width / 2;
  const middleY = height / 2;
  const heightNorm = height / HEIGHT_NORMALIZE;
  // TODO : write a better reguex for handling unix and windows system
  // const textSplit = text.split(/(?=\n)/);
  const isUnixSytem = text.match(/\n/);
  const textSplit = isUnixSytem ? text.split("\n") : text.split("\rn");
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
 * Split the text by characters. Needed to animates characters's alpha individualy.
 * Each character is transposed from the layout position.
 */

type TextCharsParams = {
  width: number;
  layouts: Text[];
  translate?: { x: number; y: number };
};

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
    text.x = x + prevX + prevWidth; //- (text?.style?.dropShadowDistance || 0) / 2;
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

export type WaveUniforms = {
  frequencyX: number;
  frequencyY: number;
  amplitude: number;
  phase: number;
};

export const createWaveFilter = (props?: WaveUniforms) => {
  const uniforms = {
    frequencyX: 0.0,
    frequencyY: 0.0,
    phase: 0.0,
    amplitude: 0.0,
    ...props,
  };

  const fragment = `
      varying vec2 vTextureCoord;        
      uniform sampler2D uSampler;   
      uniform float frequencyX, frequencyY, amplitude, phase;            

      vec2 sineWave( vec2 p )
      {
        float x = cos( frequencyX * p.x + phase ) * ( amplitude * 0.0001 );
        float y = sin( frequencyY * p.x + phase ) * ( amplitude * 0.001 );
        return vec2( p.x + x, p.y + y );
      }

      void main()
      {
        gl_FragColor = texture2D( uSampler , sineWave( vTextureCoord ) );
      }
  `;

  const filter = new Filter(undefined, fragment, uniforms);

  return filter;
};

export const createNoiseFilter = () => {
  const filter = new filters.NoiseFilter(0.8);
  filter.blendMode = BLEND_MODES.ADD;
  filter.resolution = 1;
  return filter;
};
