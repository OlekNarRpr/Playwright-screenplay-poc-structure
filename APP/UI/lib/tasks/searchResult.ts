import { Task } from "@testla/screenplay-playwright";
import { Page } from "@playwright/test";
import { searchResultGrid, searchResultHeader } from "../locators/searchResult";

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

export class SelectPropertyByAddrees extends Task {
  private page: Page;
  private address: string;

  constructor(page: Page, address: string) {
    super();
    this.page = page;
    this.address = address;
  }

  public async performAs(): Promise<void> {
    const addressParts = this.address.split(",");
    const streetAddress = addressParts[0].trim();

    await this.page
      .locator(
        searchResultGrid.propertyAddressLink.replace("Address", streetAddress)
      )
      .click();
  }

  public static fromSearchResults(
    page: Page,
    address: string
  ): SelectPropertyByAddrees {
    return new SelectPropertyByAddrees(page, address);
  }
}

export class SelectFirtsProperty extends Task {
  private page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
  }

  public async performAs(): Promise<void> {
    //await this.page.waitForLoadState("networkidle");
    await this.page.locator(searchResultGrid.testFirtResultAdress).click();
    //await this.page.waitForLoadState("networkidle");
  }

  public static fromListView(page: Page): SelectFirtsProperty {
    return new SelectFirtsProperty(page);
  }
}
