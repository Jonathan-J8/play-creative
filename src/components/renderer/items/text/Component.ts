import { defineComponent, watch } from "vue";
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
    animationID: { type: String, default: "" },
    fill: { type: String, default: "#ffffff" },
    waveFrequencyX: { type: Number, default: 3.0 },
    waveFrequencyY: { type: Number, default: -2.0 },
    waveAmplitude: { type: Number, default: 3.0 },
    wavePhase: { type: Number, default: 0.0 },
  },
  setup(props) {
    const renderer = useRendererProvider();
    const timeline = useTimeline();
    const container = new Container();
    const wave = createWaveFilter({
      frequencyX: props.waveFrequencyX,
      frequencyY: props.waveFrequencyY,
      amplitude: props.waveAmplitude,
      phase: props.wavePhase,
    });

    const noise = createNoiseFilter();
    const fadeAnimationID = `TextFade-${props.animationID}`;
    const waveAnimationID = `TextWave-${props.animationID}`;
    const noiseAnimationID = `TextNoise-${props.animationID}`;

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

    const populateContainer = (text: string) => {
      const { width, height } = this.renderer.getScreenDimension();
      const layouts = createLayout(
        text,
        { width, height },
        { fill: "#000000" }
      );
      const characters = createCharacters(
        text,
        { width, layouts },
        { fill: this.props.fill }
      );
      // const randomConstant = Math.floor(Math.sqrt(characters.length));
      // console.log(randomConstant);

      characters.sort(() => 0.5 - Math.random());
      this.container.removeChildren();
      // layouts.forEach((l) => this.container.addChild(l));
      characters.forEach((c) => this.container.addChild(c));
    };
    populateContainer(state.text);

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

    watch(
      () => state.text,
      (text) => {
        if (!text) {
          this.container.removeChildren();
          this.timeline.remove(this.fadeAnimationID);
          return;
        }
        populateContainer(text);
        refreshFadeAnime();
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
