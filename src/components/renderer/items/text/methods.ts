import { Text, type ITextStyle } from "pixi.js";
import { WIDTH_NORMALIZE, HEIGHT_NORMALIZE } from "./constants";

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
 * Each character is transposed from the layout position.
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

// export const waveFragment = `
//       varying vec2 vTextureCoord;
//       uniform sampler2D uSampler;
//       uniform float uTime;
//       void main(void)
//       {
//          gl_FragColor = texture2D(uSampler, vTextureCoord).yyyw * uTime ;
//       }
//   `;

export const waveFragment = `
      varying vec2 vTextureCoord;        // holds the Vertex position <-1,+1> !!!
      uniform sampler2D uSampler;    // used texture unit
      uniform float uPhaseX, uPhaseY, x1, x2, y1, y2, amp1, amp2;            

      vec2 SineWave( vec2 p )
      {
        // convert Vertex position <-1,+1> to texture coordinate <0,1> and some shrinking so the effect dont overlap screen
        // p.x=( 0.55*p.x)+0.5;
        // p.y=(-0.55*p.y)+0.5;
        // p.x=(1.1*p.x)-0.05;
        // p.y=(1.1*p.y)-0.05;
        // wave distortion
        float x = cos( x1 * p.x + uPhaseX ) * amp1;
        float y = sin( y1 * p.x + uPhaseY ) * amp2;
        return vec2( p.x + x, p.y + y );
      }

      void main()
      {
        gl_FragColor = texture2D(uSampler,SineWave(vTextureCoord));
      }
  `;

export const paperFragment = `
      varying vec2 vTextureCoord;        // holds the Vertex position <-1,+1> !!!
      uniform sampler2D uSampler;    // used texture unit
      uniform float uPhaseX, uPhaseY, x1, x2, y1, y2, amp1, amp2;            

      vec2 SineWave( vec2 p )
      {
        float x = sin( x1 * p.y + uPhaseX ) * amp1;
        float y = sin( y1 * p.x + uPhaseY ) * amp2;
        return vec2( p.x + x, p.y + y );
      }

      void main()
      {
        gl_FragColor = texture2D(uSampler,SineWave(vTextureCoord));
      }
  `;
