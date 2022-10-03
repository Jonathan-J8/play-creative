import { defineComponent } from "vue";
import type { Sprite, RenderTexture } from "pixi.js";

import { deg2rad } from "@/utils/converter";
import useTimeline from "@timeline/useTimeline";
import useRendererProvider from "@renderer/useRendererProvider";
import BaseComponent from "@renderer/items/BaseComponent";

import { createGrid, createRect, createCells } from "./methods";
import state from "./store";

const RendererBackground = defineComponent({
  name: "RendererParticles",

  extends: BaseComponent,
  setup() {
    const renderer = useRendererProvider();
    const timeline = useTimeline();
    const { width, height } = renderer.getScreenDimension();
    const grid = createGrid({ width, height, rotation: state.rotation });
    const rotateAnimationID = `ParticlesRotate-${performance.now()}`;

    return {
      renderer,
      timeline,
      grid,
      rotateAnimationID,
    };
  },

  mounted() {
    this.renderer.addChild(this.grid);

    const populateGrid = () => {
      const { width, height } = this.renderer.getScreenDimension();

      const texture =
        (this.grid.children[0]?.texture as RenderTexture) ||
        this.renderer.generateTexture(
          createRect({ width, height, color: state.color })
        );

      this.grid.removeChildren();
      const cells = createCells({
        texture,
        width,
        height,
        count: state.count,
      });
      cells.forEach((cell) => {
        const turbulenceXY =
          Math.random() * state.turbulenceXY - state.turbulenceXY / 2;
        cell.x = cell.x + turbulenceXY;
        cell.y = cell.y + turbulenceXY;
        cell.rotation = deg2rad(Math.random() * state.turbulenceRotation);
        this.grid.addChild(cell);
      });
    };
    populateGrid();

    const refreshAnimation = () => {
      this.timeline.remove(this.rotateAnimationID);
      this.timeline.add(this.rotateAnimationID, {
        targets: this.grid.children,
        rotation: (el: Sprite) => {
          return el.rotation + deg2rad(20);
        },
        loop: true,
        duration: 1500,
        easing: "steps(2)",
        autoplay: false,
      });
    };
    refreshAnimation();

    this.$watch(
      () => [state.count, state.turbulenceXY, state.turbulenceRotation],
      ([count]: number[]) => {
        if (count === 0) {
          this.grid.removeChildren();
          this.timeline.remove(this.rotateAnimationID);
          return;
        }

        populateGrid();
        refreshAnimation();
      }
    );

    this.$watch(
      () => state.color,
      (color: string) => {
        const { width, height } = this.renderer.getScreenDimension();

        const texture = this.renderer.generateTexture(
          createRect({ width, height, color })
        );

        this.grid.children.forEach((sprite) => {
          sprite.texture = texture;
        });
      }
    );

    this.$watch(
      () => state.rotation,
      (rotation: number) => {
        this.grid.rotation = deg2rad(rotation);
      }
    );
  },

  unmounted() {
    this.renderer.removeChild(this.grid);
    this.timeline.remove(this.rotateAnimationID);
    this.grid.removeChildren();
    this.grid.destroy();
  },
});

export default RendererBackground;
