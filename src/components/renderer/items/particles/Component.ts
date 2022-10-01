import { defineComponent, watch } from "vue";
import type { RenderTexture } from "pixi.js";

import { deg2rad } from "@/utils/converter";
import injectRenderer from "@renderer/injectRenderer";
import type { Animate } from "@renderer/store";

import BaseComponent from "../BaseComponent";
import { createGrid, createGraphic, createCells } from "./methods";
import state from "./store";

const RendererBackground = defineComponent({
  name: "RendererParticles",

  extends: BaseComponent,
  setup() {
    const renderer = injectRenderer();
    const { width, height } = renderer.getScreenDimension();

    const grid = createGrid({ width, height, rotation: state.rotation });

    const texture = renderer.generateTexture(
      createGraphic({ width, height, color: state.color })
    );

    createCells({
      texture,
      width,
      height,
      count: state.count,
    }).forEach((cell) => {
      const xy = Math.random() * state.turbulenceXY - state.turbulenceXY / 2;
      cell.x = cell.x + xy;
      cell.y = cell.y + xy;
      cell.rotation = deg2rad(Math.random() * state.turbulenceRotation);
      grid.addChild(cell);
    });
    grid.scale.set(1.3);

    const cellRotations: number[] = grid.children.map((cell) => cell.rotation);

    renderer.addChild(grid);

    return { renderer, grid, cellRotations };
  },

  mounted() {
    let dir = -1;
    const angle = deg2rad(80);
    const animate: Animate = (delta, elapsed, currentTime, progress) => {
      // const step = Math.floor(progress % 50);

      // if (step === 0) {

      this.grid.children.forEach((cell, i) => {
        cell.rotation = dir * angle + this.cellRotations[i];
      });
      dir = -dir;
      // }
    };

    // this.resize = () => {
    //   // const { width, height } = this.renderer.getScreenDimension();

    //   this.grid.scale.set(1, 1);
    // };
    // window.addEventListener("resize", this.resize);

    // this.renderer.addAnimation(animate);

    // watch(
    //   () => this.renderer.state.paused,
    //   (paused) => {
    //     if (paused) this.renderer.removeAnimation(animate);
    //     else this.renderer.addAnimation(animate);
    //   }
    // );

    watch(
      () => [state.count, state.turbulenceXY],
      ([count, turbulenceXY]) => {
        const { width, height } = this.renderer.getScreenDimension();
        if (count === 0) {
          this.grid.removeChildren();
          return;
        }

        let texture =
          (this.grid.children[0]?.texture as RenderTexture) || undefined;
        if (!texture) {
          texture = this.renderer.generateTexture(
            createGraphic({ width, height, color: state.color })
          );
        }

        this.grid.removeChildren();
        this.cellRotations = [];
        createCells({
          texture,
          width,
          height,
          count,
        }).forEach((cell) => {
          const xy = Math.random() * turbulenceXY - turbulenceXY / 2;
          cell.x = cell.x + xy;
          cell.y = cell.y + xy;
          cell.rotation = deg2rad(Math.random() * state.turbulenceRotation);
          this.cellRotations.push(cell.rotation);
          this.grid.addChild(cell);
        });
      }
    );

    watch(
      () => state.turbulenceRotation,
      (turbulenceRotation) => {
        this.grid.children.forEach((cell, i) => {
          cell.rotation = deg2rad(Math.random() * turbulenceRotation);
          this.cellRotations[i] = cell.rotation;
        });
      }
    );

    watch(
      () => state.color,
      (color) => {
        const { width, height } = this.renderer.getScreenDimension();
        const texture = this.renderer.generateTexture(
          createGraphic({ width, height, color })
        );

        this.grid.children.forEach((sprite) => {
          sprite.texture = texture;
        });
      }
    );

    watch(
      () => state.rotation,
      (rotation) => {
        this.grid.rotation = deg2rad(rotation);
      }
    );
  },

  unmounted() {
    this.renderer.removeChild(this.grid);
    this.grid.removeChildren();
    this.grid.destroy();
  },
});

export default RendererBackground;

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
