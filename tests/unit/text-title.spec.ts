import { shallowMount } from "@vue/test-utils";
import TextTitle from "@/components/TextTitle.vue";

jest.mock("vuetify", () => ({
  useLocale: () => ({
    t: (key: string) => key, // Простой мок для функции t
  }),
}));

describe("TextTitle.vue", () => {
  it("renders h1 when titleType is 1", () => {
    const wrapper = shallowMount(TextTitle, {
      props: { titleType: 1, titleText: "Test Title" },
    });
    const h1Element = wrapper.find("h1");
    expect(h1Element.exists()).toBe(true);
    expect(h1Element.text()).toBe("Test Title");
  });

  it("renders h2 when titleType is 2", () => {
    const wrapper = shallowMount(TextTitle, {
      props: { titleType: 2, titleText: "Test Title" },
    });
    const h2Element = wrapper.find("h2");
    expect(h2Element.exists()).toBe(true);
    expect(h2Element.text()).toBe("Test Title");
  });

  it("renders h3 when titleType is 3", () => {
    const wrapper = shallowMount(TextTitle, {
      props: { titleType: 3, titleText: "Test Title" },
    });
    const h3Element = wrapper.find("h3");
    expect(h3Element.exists()).toBe(true);
    expect(h3Element.text()).toBe("Test Title");
  });
});
