import { mount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

describe("HomeView", () => {
  it("renders the component", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.exists()).toBe(true);
  });

  it("fetches articles on mount", async () => {
    const mockArticles = [
      { title: "Article 1", summary: "Summary 1" },
      { title: "Article 2", summary: "Summary 2" },
      { title: "Article 3", summary: "Summary 3" },
    ];
    jest.spyOn(ArticleService, "getArticles").mockResolvedValue(mockArticles);

    const wrapper = mount(HomeView);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.articles).toEqual(mockArticles);
  });

  it("displays articles in the carousel", async () => {
    const mockArticles = [
      { title: "Article 1", summary: "Summary 1" },
      { title: "Article 2", summary: "Summary 2" },
      { title: "Article 3", summary: "Summary 3" },
    ];
    jest.spyOn(ArticleService, "getArticles").mockResolvedValue(mockArticles);

    const wrapper = mount(HomeView);
    await wrapper.vm.$nextTick();

    const carouselItems = wrapper.findAll(".p-carousel-item");
    expect(carouselItems).toHaveLength(mockArticles.length);

    carouselItems.forEach((item, index) => {
      const article = mockArticles[index];
      expect(item.find(".font-bold").text()).toBe(article.title);
      expect(item.find("h4").text()).toBe(article.summary);
    });
  });
});
