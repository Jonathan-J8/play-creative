import { defineComponent, watch } from "vue";
import { Graphics } from "pixi.js";
import { hex2num } from "@utils/converter";
import useRendererProvider from "@renderer/useRendererProvider";
import BaseComponent from "@/components/renderer/items/BaseComponent";
import state from "./store";

const RendererBackground = defineComponent({
  name: "RendererBackground",
  extends: BaseComponent,
  setup() {
    const renderer = useRendererProvider();
    const square = new Graphics();

    return { renderer, square };
  },

  mounted() {
    this.renderer.addChild(this.square);

    const fillRect = (color: string) => {
      const { width, height } = this.renderer.getScreenDimension();
      this.square.clear();
      this.square.beginFill(hex2num(color));
      this.square.drawRect(0, 0, width, height);
      this.square.endFill();
    };
    fillRect(state.color);

    watch(() => state.color, fillRect);
  },

  unmounted() {
    this.renderer.removeChild(this.square);
    this.square.destroy();
  },
});

export default RendererBackground;
