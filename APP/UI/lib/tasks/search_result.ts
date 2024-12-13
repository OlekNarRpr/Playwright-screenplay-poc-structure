import { Task } from "@testla/screenplay-playwright";
import { Page } from "@playwright/test";
import { searchResultHeader } from "../locators/search_result";

export class SelectSearchResultView extends Task {
  private page: Page;
  private viewType: string;

  constructor(page: Page, viewType: string) {
    super();
    this.page = page;
    this.viewType = viewType;
  }

  public async performAs(): Promise<void> {
    await this.page
      .locator(searchResultHeader.buttonView.replace("View", this.viewType))
      .click();
  }

  public static typeAs(page: Page, viewType: string): SelectSearchResultView {
    return new SelectSearchResultView(page, viewType);
  }
}
