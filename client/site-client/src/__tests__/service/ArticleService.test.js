const ArticleService = require("../../service/ArticleService");

describe("ArticleService", () => {
  describe("getArticles", () => {
    it("should return an array of articles", async () => {
      const articles = await ArticleService.getArticles();
      expect(Array.isArray(articles)).toBe(true);
      expect(articles.length).toBeGreaterThan(0);
    });
  });

  describe("getArticle", () => {
    it("should return an article with the given id", async () => {
      const article = await ArticleService.getArticle(5);
      expect(article).toBeDefined();
      expect(article.id).toBe(5);
    });

    it("should return undefined if no article with the given id is found", async () => {
      const article = await ArticleService.getArticle(999);
      expect(article).toBeUndefined();
    });
  });
});
