import { defineComponent } from "vue";

const RendererText = defineComponent({
  name: "ItemBaseComponent",

  methods: {
    // TODO resize in each component
    resize: () => {},
  },

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
