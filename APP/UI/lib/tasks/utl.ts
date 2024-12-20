import { Task } from "@testla/screenplay-playwright";
import { Page } from "@playwright/test";

export class GetQueryParameter extends Task {
  private page: Page;
  private queryParameter: string;

  constructor(page: Page, queryParameter: string) {
    super();
    this.page = page;
    this.queryParameter = queryParameter;
  }

  public async performAs(): Promise<string> {
    const ordId = new URLSearchParams(this.page.url().split("?")[1]);
    return ordId.get(this.queryParameter);
  }

  public static fromUrl(page: Page, queryParameter: string): GetQueryParameter {
    return new GetQueryParameter(page, queryParameter);
  }
}
