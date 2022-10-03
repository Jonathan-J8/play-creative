import { defineComponent } from "vue";
import type { Sprite, RenderTexture } from "pixi.js";

import { deg2rad } from "@/utils/converter";
import useTimeline from "@timeline/useTimeline";
import useRendererProvider from "@renderer/useRendererProvider";
import BaseComponent from "@renderer/items/BaseComponent";

import { createGrid, createGraphic, createCells } from "./methods";
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
          createGraphic({ width, height, color: state.color })
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
      ([count]) => {
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
          createGraphic({ width, height, color })
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

// function minMax(val: number, min: number, max: number) {
//   return Math.min(Math.max(val, min), max);
// }
// Math.ceil((minMax(t, 0.000001, 1)) * steps) * (1 / steps);
// (Math.floor((t / dur) * steps) / steps);

// let dir = -1;
// const steps = 3;
// const angle = deg2rad(80);
// const animate: Animate = (delta, elapsed, currentTime, progress) => {
//   // const step = Math.floor(progress % 50);
//   // const s = Math.floor(
//   //   ((currentTime / this.renderer.state.duration) * steps) / steps
//   // );
//   const s = Math.floor(currentTime % 30);

//   if (!s) {
//     this.grid.children.forEach((cell, i) => {
//       cell.rotation = dir * angle + this.cellRotations[i];
//     });
//     dir = -dir;
//   }
// };

// watch(
//   () => this.renderer.state.paused,
//   (paused) => {
//     // if (paused) this.renderer.removeAnimation(animate);
//     // else this.renderer.addAnimation(animate);
//     if (paused) animate.pause();
//     else animate.play();
//   }
// );

// const animate = anime({
//   targets: this.grid.children,
//   rotation: (el: Sprite) => {
//     return el.rotation + deg2rad(20);
//   },
//   loop: true,
//   easing: "steps(2)",
//   duration: this.renderer.state.duration,
//   autoplay: false,
// });

//
//
//
//
//
//

// const rect = createGraphic({
//   width,
//   height,
//   color: state.color,
// });
// const texture = this.renderer.generateTexture(rect);
// const countSquare = Math.ceil(Math.sqrt(count));
// this.container.removeChildren();
// for (let index = 0; index < count; index++) {
//   const sprite = createSprite({
//     index,
//     countSquare,
//     width,
//     height,
//     texture,
//   });
//   this.container.addChild(sprite);
// }
// if (count > prevCount) {
//   const rect = createGraphic({
//     width,
//     height,
//     color: state.color,
//   });
//   const texture = this.renderer.generateTexture(rect);
//   const nextCount = count - prevCount;
//   for (let index = 0; index < nextCount; index++) {
//     const sprite = createSprite({ index, width, height, texture });
//     this.container.addChild(sprite);
//   }
// } else {
//   const nextCount = prevCount - count;
//   for (let i = nextCount; i > 0; --i) {
//     this.container.removeChildAt(this.container.children.length - 1);
//   }
// }
