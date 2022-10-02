import { defineComponent, watch } from "vue";
import anime from "animejs";
import {
  BLEND_MODES,
  Container,
  Filter,
  filters,
  Graphics,
  Text,
} from "pixi.js";

import { deg2rad } from "@utils/converter";
import useRendererProvider from "@renderer/useRendererProvider";
import useTimeline from "@/components/timeline/useTimeline";
import BaseComponent from "@renderer/items/BaseComponent";

import { createCharacters, createLayout, waveFragment } from "./methods";
import { ANIMATION_FADE_KEY, ANIMATION_WAVE_KEY } from "./constants";
import state from "./store";

const RendererText = defineComponent({
  name: "RendererText",
  extends: BaseComponent,
  setup() {
    const renderer = useRendererProvider();
    const timeline = useTimeline();
    const container = new Container();

    const waveUniform = {
      uTime: 0.1,
      uPhaseX: 0.1,
      uPhaseY: 0.1,
      x1: 5.9,
      y1: -5.0,
      amp1: 0.0001,
      amp2: 0.01,
    };
    const waveFilter = new Filter(undefined, waveFragment, waveUniform);

    const noiseFilter = new filters.NoiseFilter(0.5);
    noiseFilter.blendMode = BLEND_MODES.ADD;
    noiseFilter.resolution = 0.8;

    container.filters = [waveFilter, noiseFilter];

    return { renderer, timeline, container, waveUniform, noiseFilter };
  },

  mounted() {
    this.renderer.addChild(this.container);

    const populateContainer = (text: string) => {
      const { width, height } = this.renderer.getScreenDimension();
      const layouts = createLayout(
        text,
        { width, height },
        { fill: "#000000" }
      );
      const characters = createCharacters(text, { width, layouts });
      // const randomConstant = Math.floor(Math.sqrt(characters.length));
      // console.log(randomConstant);

      characters.sort(() => 0.5 - Math.random());

      this.container.removeChildren();
      // layouts.forEach((l) => this.container.addChild(l));

      characters.forEach((c) => this.container.addChild(c));
    };
    populateContainer(state.text);

    const refreshAnimationFade = () => {
      this.container.children.forEach((t) => {
        t.alpha = 0;
      });
      this.timeline.remove(ANIMATION_FADE_KEY);
      this.timeline.add(ANIMATION_FADE_KEY, {
        targets: this.container.children,
        keyframes: [{ alpha: 0 }, { alpha: () => Math.random() }, { alpha: 1 }],
        delay: anime.stagger(10, { start: 200 }),
        autoplay: false,
      });
    };
    refreshAnimationFade();

    const refreshAnimationWave = () => {
      this.container.children.forEach((t) => {
        t.alpha = 0;
      });
      this.timeline.remove(ANIMATION_WAVE_KEY);
      this.timeline.add(ANIMATION_WAVE_KEY, {
        targets: this.waveUniform,
        loop: true,
        uPhaseX: 10,
        uPhaseY: 10,
        easing: "steps(10)",
        duration: 2000,
        // duration: 300,

        autoplay: false,
      });
    };
    refreshAnimationWave();
    const refreshAnimationNoise = () => {
      this.container.children.forEach((t) => {
        t.alpha = 0;
      });
      this.timeline.remove("blop");
      this.timeline.add("blop", {
        targets: this.noiseFilter,
        loop: true,
        seed: 5,
        easing: "steps(5)",
        duration: 2000,
        autoplay: false,
      });
    };
    refreshAnimationNoise();

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

    watch(
      () => state.text,
      (text) => {
        if (!text) {
          this.container.removeChildren();
          this.timeline.remove(ANIMATION_FADE_KEY);
          return;
        }
        populateContainer(text);
        refreshAnimationFade();
      }
    );
    // watch(
    //   () => state.text,
    //   (text) => {
    //     const { width, height } = this.renderer.getScreenDimension();
    //     const layouts = createLayout(text, { width, height });
    //     const characters = createCharacters(
    //       text,
    //       {
    //         width,
    //         layouts,
    //       },
    //       {
    //         dropShadow: true,
    //         dropShadowAngle: deg2rad(45),
    //         dropShadowDistance: 1,
    //         dropShadowAlpha: 0.8,
    //       }
    //     );

    //     characters.sort(() => 0.5 - Math.random());
    //     this.container.removeChildren();
    //     characters.forEach((c) => this.container.addChild(c));
    //   }
    // );
  },

  unmounted() {
    this.renderer.removeChild(this.container);
    this.container.removeChild();
    this.container.destroy();
  },
});

export default RendererText;
