import { onMounted, onUnmounted } from "vue";

const onResize = (cb: () => void) => {
  onMounted(() => {
    window.addEventListener("resize", cb);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", cb);
  });
};

export default onResize;
