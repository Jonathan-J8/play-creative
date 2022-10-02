// import useTimeline from "@/components/timeline/useTimeline";
import { defineComponent } from "vue";
// import useRendererProvider from "../useRendererProvider";
import { RENDERER_KEY } from "../store";

const RendererText = defineComponent({
  name: "ItemBaseComponent",

  methods: {
    // TODO resize in each component
    resize: () => {},
  },
  inject: [RENDERER_KEY],
  // setup() {
  //   const renderer = useRendererProvider();
  //   const timeline = useTimeline();
  //   return { renderer, timeline };
  // },

  // mounted() {
  //   window.addEventListener("resize", this.resize);
  // },
  // umounted() {
  //   window.removeEventListener("resize", this.resize);
  // },

  render() {
    return null;
  },
});

export default RendererText;
