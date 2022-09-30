import { defineComponent, watch } from "vue";
import { Graphics } from "pixi.js";
import { hex2num } from "@utils/converter";
import injectRenderer from "@renderer/injectRenderer";
import BaseComponent from "@/components/renderer/items/BaseComponent";
import state from "./store";

const RendererBackground = defineComponent({
  name: "RendererBackground",
  extends: BaseComponent,
  setup() {
    const renderer = injectRenderer();
    const square = new Graphics();
    const { width, height } = renderer.getScreenDimension();

    square.beginFill(hex2num(state.color));
    square.drawRect(0, 0, width, height);
    square.endFill();
    square.scale.set(1);
    renderer.addChild(square);

    return { renderer, square };
  },

  mounted() {
    this.resize = () => {};
    window.addEventListener("resize", this.resize);

    watch(
      () => state.color,
      (color) => {
        const { width, height } = this.renderer.getScreenDimension();

        this.square.clear();
        this.square.beginFill(hex2num(color));
        this.square.drawRect(0, 0, width, height);
        this.square.endFill();
      }
    );
  },

  unmounted() {
    window.removeEventListener("resize", this.resize);

    this.renderer.removeChild(this.square);
    this.square.destroy();
  },
});

export default RendererBackground;
