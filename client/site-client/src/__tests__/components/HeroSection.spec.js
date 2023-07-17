import { shallowMount } from "@vue/test-utils";
import HeroSection from "@/components/HeroSection.vue";

describe("HeroSection", () => {
  it("renders the correct title", () => {
    const wrapper = shallowMount(HeroSection);
    const title = wrapper.find(".text-6xl.font-bold.mb-1");
    expect(title.text()).toBe("Create the screens");
  });

  it("renders the correct subtitle", () => {
    const wrapper = shallowMount(HeroSection);
    const subtitle = wrapper.find(".text-6xl.text-primary.font-bold.mb-3");
    expect(subtitle.text()).toBe("visitors deserve to see");
  });

  it("renders the correct paragraph", () => {
    const wrapper = shallowMount(HeroSection);
    const paragraph = wrapper.find(".mt-0.mb-4.text-700.line-height-3");
    expect(paragraph.text()).toBe(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    );
  });

  it('opens the contact form when the "Contactez-nous" button is clicked', async () => {
    const wrapper = shallowMount(HeroSection);
    const button = wrapper.find(".p-button-raised");
    await button.trigger("click");
    expect(wrapper.vm.visible).toBe(true);
  });

  it("does not show the contact form by default", () => {
    const wrapper = shallowMount(HeroSection);
    const contactForm = wrapper.find("contact-form-stub");
    console.log(wrapper.html());
    expect(contactForm.attributes("visible")).toBe("false");
  });

  it('shows the contact form when the "Contactez-nous" button is clicked', async () => {
    const wrapper = shallowMount(HeroSection);
    const button = wrapper.find(".p-button-raised");
    await button.trigger("click");
    const contactForm = wrapper.find("contact-form-stub");
    expect(contactForm.exists()).toBe(true);
  });
});
