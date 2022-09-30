// import { describe, it, expect } from "vitest";

// import { mount } from "@vue/test-utils";
// import HelloWorld from "../HelloWorld.vue";

// describe("HelloWorld", () => {
//   it("renders properly", () => {
//     const wrapper = mount(HelloWorld, { props: { msg: "Hello Vitest" } });
//     expect(wrapper.text()).toContain("Hello Vitest");
//   });
// });

import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import RendererProvider from "@renderer/items/particles/Controller.vue";
// import onResize from "@hooks/onResize";
// import "pixi.js-legacy";

describe("RendererProvider", () => {
  it("renders properly", () => {
    const wrapper = mount(RendererProvider, {});

    // const comps = wrapper.getComponent("RendererTimeline");
    // console.log(comps);

    expect(wrapper.text()).toContain("");
  });
});
