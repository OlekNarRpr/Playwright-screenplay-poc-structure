import { Task } from "@testla/screenplay-playwright";
import { Page } from "@playwright/test";

export class SearchProperty extends Task {
  private page: Page;
  private propertyAddress: string;

  constructor(page: Page, propertyAddress: string) {
    super();
    this.page = page;
    this.propertyAddress = propertyAddress;
  }

  public async performAs(): Promise<void> {
    await this.page
      .getByPlaceholder("Enter Address, Place, APN/Tax")
      .fill(this.propertyAddress);
    if (this.propertyAddress.trim().split(/\s+/).length == 1) {
      await this.page.getByText("Find all listings matching").click();
    } else {
      await this.page
        .getByRole("button", { name: "Search", exact: true })
        .click();
    }
  }

  public static fromHomePage(
    page: Page,
    propertyAddress: string
  ): SearchProperty {
    return new SearchProperty(page, propertyAddress);
  }
}
