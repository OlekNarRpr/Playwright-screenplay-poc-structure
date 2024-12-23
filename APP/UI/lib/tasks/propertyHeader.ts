import { Task } from "@testla/screenplay-playwright";
import { Page } from "@playwright/test";
import { propertyHeader } from "../locators/propertyInformationPage";

export class GetPropertyAddress extends Task {
  private page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
  }

  public async performAs(): Promise<string> {
    let streetAddress = await this.page
      .locator(propertyHeader.streetAddress)
      .textContent();
    let cityStateZip = await this.page
      .locator(propertyHeader.cityStateZip)
      .textContent();
    var actualPropertyAddress = streetAddress.trim().concat(" ", cityStateZip);
    return actualPropertyAddress;
  }

  public static fromPropertyPage(page: Page): GetPropertyAddress {
    return new GetPropertyAddress(page);
  }
}
