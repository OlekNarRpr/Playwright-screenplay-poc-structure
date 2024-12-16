import { expect, Page } from "@playwright/test";
import { Question } from "@testla/screenplay-playwright";
import { searchResultGrid } from "../locators/search_result";
import { legalDescription } from "../locators/property_page";

export class IsPropertyAddressLocated extends Question<boolean> {
  private page: Page;
  private expectedPropertyAddress: string;
  private key: string;

  constructor(page: Page, expectedPropertyAddress: string, key: string) {
    super();
    this.page = page;
    this.expectedPropertyAddress = expectedPropertyAddress;
    this.key = key;
  }

  public async answeredBy(): Promise<void> {
    var actualPropertyAddress: string | null;
    switch (this.key) {
      case "cityStateZip":
        actualPropertyAddress = await this.page
          .locator(searchResultGrid.firtResultAdress)
          .textContent();

        expect(actualPropertyAddress).toContain(this.expectedPropertyAddress);
        break;
      case "county":
        await this.page.locator(searchResultGrid.firtResultAdress).click();
        await this.page.waitForLoadState("networkidle");
        for (var i = 0; i < 3000; i = i + 100) {
          await this.page.mouse.wheel(i, i + 100);
          await this.page.waitForLoadState("domcontentloaded");
        }
        actualPropertyAddress = await this.page
          .locator(legalDescription.county)
          .textContent();

        expect(actualPropertyAddress).toMatch(this.expectedPropertyAddress);
        break;

      default:
        console.log(
          `Option ${this.key} is not avaliable. Check spelling or add case: ${this.key} to switch statement`
        );
        break;
    }
  }

  public static withinSearchArea(
    page: Page,
    expectedPropertyAddress: string,
    key: string
  ): IsPropertyAddressLocated {
    return new IsPropertyAddressLocated(page, expectedPropertyAddress, key);
  }
}
