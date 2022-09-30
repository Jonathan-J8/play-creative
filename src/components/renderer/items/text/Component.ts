import { defineComponent, watch } from "vue";
import { Container, Filter } from "pixi.js";

import { deg2rad } from "@utils/converter";
import injectRenderer from "@renderer/injectRenderer";
import BaseComponent from "@renderer/items/BaseComponent";
import type { Animate } from "@renderer/store";

import { createCharacters, createLayout } from "./methods";
import state from "./store";

type CanvasSize = {
  width: number;
  height: number;
};

const RendererText = defineComponent({
  name: "RendererText",
  extends: BaseComponent,
  setup() {
    const renderer = injectRenderer();
    const { width, height } = renderer.getScreenDimension();

    const containerBack = new Container();
    renderer.addChild(containerBack);
    const containerFront = new Container();
    renderer.addChild(containerFront);

    const createText = (text: string, { width, height }: CanvasSize) => {
      const layouts = createLayout(text, { width, height });

      containerFront.removeChildren();
      createCharacters(
        text,
        {
          width,
          layouts,
        },
        {
          dropShadow: true,
          dropShadowAngle: deg2rad(45),
          dropShadowDistance: 1,
          dropShadowAlpha: 0.8,
        }
      ).forEach((t) => containerFront.addChild(t));

      // containerFront.removeChildren();
      // createCharacters(
      //   text,
      //   {
      //     width,
      //     layouts,
      //   },
      //   {}
      // ).forEach((t) => containerFront.addChild(t));
    };
    createText(state.text, { width, height });

    //     const uniformFlag = { uTime: 0.1 };
    //     const filter = new Filter(
    //       undefined,
    //       `
    //         varying vec2 vTextureCoord;
    //         uniform sampler2D uSampler;
    //         uniform float uTime;
    //         void main(void)
    //         {
    //            gl_FragColor = texture2D(uSampler, vTextureCoord).yyyw * uTime ;
    //         }
    // `,
    //       uniformFlag
    //     );

    // containerBack.filters = [filter];
    // containerFront.filters = [filter];

    return { renderer, containerFront, containerBack, createText };
  },

  mounted() {
    this.containerFront.children.forEach((text, i) => {
      text.alpha = 0;
    });
    const animate: Animate = (delta, elapsed) => {
      const step = Math.floor(elapsed % this.containerFront.children.length);

      this.containerFront.children.forEach((text, i) => {
        if (i === step) text.alpha = text.alpha >= 1 ? 1 : text.alpha + 0.4;
      });
    };

    watch(
      () => this.renderer.state.paused,
      (paused) => {
        if (paused) this.renderer.removeAnimation(animate);
        else this.renderer.addAnimation(animate);
      }
    );

    watch(
      () => state.text,
      (stateText) => {
        const { width, height } = this.renderer.getScreenDimension();
        this.createText(stateText, { width, height });
      }
    );

    // this.containerFront.children.forEach((t, i) => {
    //   t.alpha = 0;
    //   this.renderer.addAnimation(
    //     { targets: t, alpha: 1, easing: "steps(2)", duration: 1000 },
    //     500 + Math.random() * 500
    //   );
    // });
    // this.renderer.addAnimation(
    //   {
    //     targets: this.containerFront.children,
    //     alpha: 1,
    //     easing: "steps(100)",
    //     // delay: anime.stagger(100, { start: 500 }),
    //   },
    //   1000
    // );

    // const render = () => {
    //   this.containerFront.children.forEach((t) => {
    //     t.alpha = Math.random();
    //   });
    //   requestAnimationFrame(render);
    // };
    // render();
  },

  unmounted() {
    this.renderer.removeChild(this.containerBack);
    this.containerBack.destroy();
    this.containerBack.removeChild();
    this.renderer.removeChild(this.containerFront);
    this.containerFront.removeChild();
    this.containerFront.destroy();
  },
});

export default RendererText;
