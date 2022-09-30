import { inject } from "vue";
import { RENDERER_KEY, type RendererContext } from "./store";

const injectRenderer = (): RendererContext => {
  const renderer = inject<RendererContext>(RENDERER_KEY);
  if (!renderer) throw new Error(`Renderer is ${renderer}`);
  return renderer;
};

export default injectRenderer;
