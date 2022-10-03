// TODO : component to optimize because of expensive computation from Text()
// look after https://github.com/PixelsCommander/pixi-sdf-text
// or https://github.com/avgjs/pixi-richtext
// aricle : https://blog.mapbox.com/drawing-text-with-signed-distance-fields-in-mapbox-gl-b0933af6f817

import { defineComponent } from "vue";
import { Container } from "pixi.js";
import anime from "animejs";

import useTimeline from "@timeline/useTimeline";
import useRendererProvider from "@renderer/useRendererProvider";
import BaseComponent from "@renderer/items/BaseComponent";

import {
  createCharacters,
  createLayout,
  createNoiseFilter,
  createWaveFilter,
} from "./methods";
import state from "./store";

const RendererText = defineComponent({
  name: "RendererText",
  extends: BaseComponent,
  props: {
    fill: { type: String, default: "#ffffff" },
    waveFrequencyX: { type: Number, default: 3.0 },
    waveFrequencyY: { type: Number, default: -2.0 },
    waveAmplitude: { type: Number, default: 3.0 },
  },
  setup(props) {
    const renderer = useRendererProvider();
    const timeline = useTimeline();
    const container = new Container();
    const noise = createNoiseFilter();
    const wave = createWaveFilter({
      frequencyX: props.waveFrequencyX,
      frequencyY: props.waveFrequencyY,
      amplitude: props.waveAmplitude,
      phase: 0.0,
    });

    const date = performance.now();
    const fadeAnimationID = `TextFade-${date}`;
    const waveAnimationID = `TextWave-${date}`;
    const noiseAnimationID = `TextNoise-${date}`;

    return {
      props,
      renderer,
      timeline,
      container,
      wave,
      noise,
      fadeAnimationID,
      waveAnimationID,
      noiseAnimationID,
    };
  },

  mounted() {
    this.container.filters = [this.wave, this.noise];
    this.renderer.addChild(this.container);

    const populateContainer = (text: string, fontFamily: string) => {
      const { width, height } = this.renderer.getScreenDimension();
      const layouts = createLayout(
        text,
        { width, height },
        { fill: "#000000", fontFamily: fontFamily }
      );
      const characters = createCharacters(
        text,
        { width, layouts },
        { fill: this.props.fill }
      );
      const randomConstant = Math.floor(Math.sqrt(characters.length));
      let inc = 0;
      characters.sort(() => {
        return 0.5 - Math.random() + (inc % randomConstant);
        inc += 1;
      });
      this.container.removeChildren();
      characters.forEach((c) => this.container.addChild(c));
    };
    populateContainer(state.text, state.fontFamily);

    const refreshFadeAnime = () => {
      this.container.children.forEach((t) => {
        t.alpha = 0;
      });
      this.timeline.remove(this.fadeAnimationID);
      this.timeline.add(this.fadeAnimationID, {
        targets: this.container.children,
        keyframes: [{ alpha: 0 }, { alpha: () => Math.random() }, { alpha: 1 }],
        delay: anime.stagger(10, { start: 200 }),
        autoplay: false,
      });
    };
    refreshFadeAnime();

    const refreshWaveAnime = () => {
      this.container.children.forEach((t) => {
        t.alpha = 0;
      });
      this.timeline.remove(this.waveAnimationID);
      this.timeline.add(this.waveAnimationID, {
        targets: this.wave.uniforms,
        loop: true,
        phase: 10,
        easing: "steps(10)",
        duration: 2000,
        autoplay: false,
      });
    };
    refreshWaveAnime();

    const refreshNoiseAnime = () => {
      this.container.children.forEach((t) => {
        t.alpha = 0;
      });
      this.timeline.remove(this.noiseAnimationID);
      this.timeline.add(this.noiseAnimationID, {
        targets: this.noise,
        loop: true,
        seed: 5,
        easing: "steps(5)",
        duration: 2000,
        autoplay: false,
      });
    };
    refreshNoiseAnime();

    this.$watch(
      () => [state.text, state.fontFamily],
      ([text, fontFamily]: string[]) => {
        if (!text) {
          this.container.removeChildren();
          this.timeline.remove(this.fadeAnimationID);
          return;
        }
        populateContainer(text, fontFamily);
        refreshFadeAnime();
      }
    );
  },

  unmounted() {
    this.renderer.removeChild(this.container);
    this.timeline.remove(this.fadeAnimationID);
    this.timeline.remove(this.waveAnimationID);
    this.timeline.remove(this.noiseAnimationID);
    this.container.removeChild();
    this.container.destroy();
  },
});

export default RendererText;
