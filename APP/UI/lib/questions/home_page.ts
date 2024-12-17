import { expect, Page } from "@playwright/test";
import { Question } from "@testla/screenplay-playwright";

export class IsCorrecUrlShown extends Question<boolean> {
  private page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
  }

  public async answeredBy(): Promise<boolean> {
    await expect(this.page).toHaveURL(/home/, { timeout: 10_000 });
    return Promise.resolve(true);
  }

  public static atHomePage(page: Page): IsCorrecUrlShown {
    return new IsCorrecUrlShown(page);
  }
}
