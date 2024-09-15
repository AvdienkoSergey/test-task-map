import { shallowMount } from "@vue/test-utils";
import BaseHeader from "@/components/BaseHeader.vue";

describe("BaseIcon.vue", () => {
  it("renders when it exists", () => {
    const wrapper = shallowMount(BaseHeader, {
      props: { name: "home" },
    });
    const svgElement = wrapper.find("svg");
    expect(svgElement.exists()).toBe(true);
  });
});
