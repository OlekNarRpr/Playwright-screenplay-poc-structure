import { Task } from "@testla/screenplay-playwright";
import { Page } from "@playwright/test";

export class SelectTab extends Task {
  private page: Page;
  private tabName: string;

  constructor(page: Page, tabName: string) {
    super();
    this.page = page;
    this.tabName = tabName;
  }

  public async performAs(): Promise<void> {
    try {
      await this.page.getByRole("link", { name: this.tabName }).click();
    } catch (error) {
      console.log(
        this.tabName + " is invalid option. Check spesling and tab name"
      );
    }
  }

  public static atPropertyDetails(page: Page, tabName: string): SelectTab {
    return new SelectTab(page, tabName);
  }
}
