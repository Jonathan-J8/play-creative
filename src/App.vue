<script setup lang="ts">
import IconLogo from "@icons/Logo.vue";
import LinkHome from "@ui/LinkHome.vue";
import ContainerRoot from "@ui/ContainerRoot.vue";
import ContainerMain from "@ui/ContainerMain.vue";

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
  <ContainerRoot>
    <header>
      <h1 class="sr-only">Play Creative</h1>
      <nav>
        <LinkHome>
          <IconLogo />
        </LinkHome>
      </nav>
    </header>

    <ContainerMain>
      <template #left>
        <h2 class="sr-only">Animation Parameters Form</h2>
        <ControllerText />
        <ControllerParticles />
        <ControllerBackground />
      </template>
      <template #right>
        <h2 class="sr-only">Animation Renderer</h2>
        <RendererProvider :options="{ width: 720, height: 720 }">
          <RendererBackground />
          <RendererParticles />
          <RendererText
            fill="#4d9a9d"
            :waveFrequencyX="-5.0"
            :waveFrequencyY="-2.0"
            :waveAmplitude="15.0"
          />
          <RendererText
            fill="#ffffff"
            :waveFrequencyX="3.0"
            :waveFrequencyY="-2.0"
            :waveAmplitude="5.0"
          />
          <VideoPreview />
        </RendererProvider>
        <div>
          <h3 class="sr-only">Animation Controls Form</h3>
          <TimelineController />
          <VideoPreviewController />
        </div>
      </template>
    </ContainerMain>
  </ContainerRoot>
</template>

<style scoped>
header {
  display: flex;
  place-items: center;
  margin-bottom: 4rem;
}
</style>
