import { expect, Page } from "@playwright/test";
import { Question } from "@testla/screenplay-playwright";
import { details_popup } from "../locators/map_page";

export class IsHomePinShowsCorrectProperty extends Question<boolean> {
  private page: Page;
  private expectedPropertyAddress: string;

  constructor(page: Page, expectedPropertyAddress: string) {
    super();
    this.page = page;
    this.expectedPropertyAddress = expectedPropertyAddress;
  }

  public async answeredBy(): Promise<void> {
    await this.page.locator(".is-flex > .icon").first().click();
    var getPropertyAddress: string | null = await this.page
      .locator(details_popup.address)
      .textContent();
    var actualPropertyAddress: string = getPropertyAddress
      ? getPropertyAddress.trim()
      : "";
    expect(actualPropertyAddress).toEqual(this.expectedPropertyAddress);
  }

  public static atMapViewPage(
    page: Page,
    expectedPropertyAddress: string
  ): IsHomePinShowsCorrectProperty {
    return new IsHomePinShowsCorrectProperty(page, expectedPropertyAddress);
  }
}
