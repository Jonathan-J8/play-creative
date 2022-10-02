import { defineComponent, watch } from "vue";
import { BLEND_MODES, Container, Filter, filters } from "pixi.js";

import { deg2rad } from "@utils/converter";
import useRendererProvider from "@renderer/useRendererProvider";
import type { Animate } from "@renderer/store";

import BaseComponent from "@renderer/items/BaseComponent";
import { createCharacters, createLayout, waveFragment } from "./methods";
import state from "./store";
import anime from "animejs";

const RendererText = defineComponent({
  name: "RendererText",
  extends: BaseComponent,
  setup() {
    const renderer = useRendererProvider();
    const { width, height } = renderer.getScreenDimension();

    // const containerBack = new Container();
    // renderer.addChild(containerBack);
    const container = new Container();
    renderer.addChild(container);

    const layouts = createLayout(state.text, { width, height });
    const characters = createCharacters(
      state.text,
      {
        width,
        layouts,
      },
      {
        dropShadow: false,
        dropShadowAngle: deg2rad(45),
        dropShadowDistance: 1,
        dropShadowAlpha: 0.8,
      }
    );
    characters.sort(() => 0.5 - Math.random());
    characters.forEach((c) => {
      // c.alpha = 0;
      container.addChild(c);
    });

    const waveUniform = {
      uTime: 0.1,
      uPhaseX: 0.1,
      uPhaseY: 0.1,
      x1: 5.9,
      y1: -10.0,
      amp1: 0.005,
      amp2: 0.005,
    };
    const waveFilter = new Filter(undefined, waveFragment, waveUniform);
    // const paperUniform = {
    //   uTime: 0.1,
    //   uPhaseX: 0.1,
    //   uPhaseY: 0.1,
    //   x1: 1000.1,
    //   y1: 1000.1,
    //   amp1: 0.001,
    //   amp2: 0.01,
    // };
    // const paperFilter = new Filter(undefined, paperFragment, paperUniform);

    const filter = new filters.NoiseFilter(0.5);
    filter.blendMode = BLEND_MODES.ADD;

    container.filters = [waveFilter, filter];

    return { renderer, container, waveUniform, filter };
  },

  mounted() {
    this.container.children.forEach((text) => {
      text.alpha = 0;
    });
    const animate = anime({
      targets: this.container.children,
      keyframes: [{ alpha: 0 }, { alpha: () => Math.random() }, { alpha: 1 }],
      delay: anime.stagger(50, { start: 300 }),
      // easing: "steps(3)",
      duration: 300,
      autoplay: false,
    });
    // console.log(animate);

    // this.renderer.addAnimation(animate);

    // const animate: Animate = (delta, elapsed, currentTime, progress) => {
    //   // const step = Math.floor(elapsed % this.container.children.length);
    //   // this.container.children.forEach((text, i) => {
    //   //   if (i === step) text.alpha = text.alpha >= 1 ? 1 : text.alpha + 0.4;
    //   // });
    //   const step = Math.floor(currentTime % 5);
    //   // console.log(currentTime);

    //   // console.log(step);

    //   if (!step) {
    //     this.filter.seed = progress;
    //     this.waveUniform.uPhaseX = elapsed * 0.1;
    //     this.waveUniform.uPhaseY = elapsed * 0.1;
    //     // this.paperUniform.uPhaseX = elapsed * 0.1;
    //     // this.paperUniform.uPhaseY = elapsed * 0.1;
    //   }
    // };

    // this.renderer.addAnimation(animate);

    // watch(
    //   () => this.renderer.state.paused,
    //   (paused) => {
    //     if (paused) this.renderer.removeAnimation(animate);
    //     else this.renderer.addAnimation(animate);
    //   }
    // );

    // this.container.children.forEach((t, i) => {
    //   t.alpha = 0;
    //   this.renderer.addAnimation(
    //     { targets: t, alpha: 1, easing: "steps(2)", duration: 1000 },
    //     500 + Math.random() * 500
    //   );
    // });
    // this.renderer.addAnimation(
    //   {
    //     targets: this.container.children,
    //     alpha: 1,
    //     easing: "steps(100)",
    //     // delay: anime.stagger(100, { start: 500 }),
    //   },
    //   1000
    // );

    // const render = () => {
    //   this.container.children.forEach((t) => {
    //     t.alpha = Math.random();
    //   });
    //   requestAnimationFrame(render);
    // };
    // render();

    watch(
      () => state.text,
      (text) => {
        const { width, height } = this.renderer.getScreenDimension();
        const layouts = createLayout(text, { width, height });
        const characters = createCharacters(
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
        );
        characters.sort(() => 0.5 - Math.random());
        characters.forEach((c) => this.container.addChild(c));
      }
    );
  },

  unmounted() {
    this.renderer.removeChild(this.container);
    this.container.removeChild();
    this.container.destroy();
  },
});

export default RendererText;
