import { Task } from "@testla/screenplay-playwright";
import { Page } from "@playwright/test";
import { location_dropdown_panel } from "../locators/home_page";

export class PropertySearch extends Task {
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
    await this.page.locator(location_dropdown_panel.suggestion_address).click();
  }

  public static fromHomePage(
    page: Page,
    propertyAddress: string
  ): PropertySearch {
    return new PropertySearch(page, propertyAddress);
  }
}
