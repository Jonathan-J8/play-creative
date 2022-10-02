<script setup lang="ts">
import IconLogo from "@icons/Logo.vue";
import ContainerMain from "@ui/ContainerMain.vue";
import LinkHome from "@ui/LinkHome.vue";

import RendererProvider from "@renderer/Provider.vue";

import RendererBackground from "@renderer/items/background/Component";
import RendererParticles from "@renderer/items/particles/Component";
import ControllerParticles from "@renderer/items/particles/Controller.vue";
import ControllerBackground from "@renderer/items/background/Controller.vue";
import RendererText from "@renderer/items/text/Component";
import ControllerText from "@renderer/items/text/Controller.vue";

import VideoPreview from "@/components/videoPreview/Component.vue";
import VideoPreviewController from "@/components/videoPreview/Controller.vue";
import TimelineController from "@/components/timeline/Controller.vue";
</script>

<template>
  <ContainerMain>
    <header>
      <h1 class="sr-only">Play Play</h1>

      <nav>
        <LinkHome>
          <IconLogo />
        </LinkHome>
      </nav>
    </header>

    <main>
      <div class="controller">
        <h2 class="sr-only">Animation Parameters Form</h2>
        <ControllerText />
        <ControllerParticles />
        <ControllerBackground />
      </div>
      <div class="renderer">
        <h2 class="sr-only">Animation Renderer</h2>
        <RendererProvider :options="{ width: 540, height: 540 }">
          <RendererBackground />
          <RendererParticles />
          <RendererText
            animationID="textShadow"
            fill="rgba(100,100,100,0.4)"
            :waveAmplitude="8.0"
          />

          <RendererText animationID="textFront" fill="#ffffff" />
          <VideoPreview />
        </RendererProvider>
        <div>
          <h3 class="sr-only">Animation Controls Form</h3>
          <TimelineController />
          <VideoPreviewController />
        </div>
      </div>
    </main>
  </ContainerMain>
</template>

<style scoped>
header {
  display: flex;
  place-items: center;
  margin-bottom: 4rem;
}

main {
  width: 100%;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
}

@media (max-width: 768px) {
  main {
    justify-content: center;
  }
  .renderer {
    width: 100%;
  }
}

.controller {
  min-width: 30%;
  /* min-width: 50%; */
}
.renderer {
  /* flex-grow: 1; */
  min-width: 50%;
}
</style>
