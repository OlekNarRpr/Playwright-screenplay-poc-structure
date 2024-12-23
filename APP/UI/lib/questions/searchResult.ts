import { expect, Page } from "@playwright/test";
import { Question } from "@testla/screenplay-playwright";
import { searchResultGrid } from "../locators/searchResult";
import { legalDescription, summary } from "../locators/propertyInformationPage";

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
        throw new Error(
          `Option ${this.key} is not avaliable. Check spelling or add case: ${this.key} to switch statement`
        );
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

export class IsCorrectTypeAndStatus extends Question<boolean> {
  private page: Page;
  private type: string;
  private status: string;

  constructor(page: Page, type: string, status: string) {
    super();
    this.page = page;
    this.type = type;
    this.status = status;
  }

  public async answeredBy(): Promise<void> {
    await this.page.locator(searchResultGrid.firtResultAdress).click();
    await this.page.waitForLoadState("networkidle");
    let getStatusType = await this.page
      .locator(summary.statusType)
      .allTextContents();
    const [status, type] = getStatusType.map((item) => {
      const parts = item.trim().split("/");
      return parts.slice(0, 2).map((s) => s.trim());
    })[0];

    expect.soft(type).toMatch(this.type);
    expect.soft(status).toMatch(this.status);
  }

  public static shownInSearchResult(
    page: Page,
    type: string,
    status: string
  ): IsCorrectTypeAndStatus {
    return new IsCorrectTypeAndStatus(page, type, status);
  }
}
