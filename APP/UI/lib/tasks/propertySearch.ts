import { Task } from "@testla/screenplay-playwright";
import { Page } from "@playwright/test";
import { searchResultGrid } from "../locators/searchResult";
import { PropertyData } from "../../interface/Data/propertyData";
import { propertyHeader } from "../locators/propertyInformationPage";

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

export class ApplyTypeStatusFilter extends Task {
  private page: Page;
  private type: string;
  private status: string;

  constructor(page: Page, type: string, status: string) {
    super();
    this.page = page;
    this.type = type;
    this.status = status;
  }

  public async performAs(): Promise<void> {
    await uncheckTypeStatusFilterCheckboxesCheckPublickRecords(this.page);
    await this.page.getByLabel(this.type, { exact: true }).check();
    await this.page.getByLabel(this.status, { exact: true }).check();
  }

  public static fromHomePage(
    page: Page,
    type: string,
    status: string
  ): ApplyTypeStatusFilter {
    return new ApplyTypeStatusFilter(page, type, status);
  }
}

async function uncheckTypeStatusFilterCheckboxesCheckPublickRecords(
  page: Page
) {
  const checkboxes = [
    "Active",
    "Active Under Contract",
    "Pending",
    "Hold",
    "Closed",
    "Withdrawn",
    "Canceled",
    "Expired",
    "For Lease",
    "For Sale",
  ];
  await page.getByLabel("type/status").click();
  for (const checkbox of checkboxes) {
    await page.getByLabel(checkbox, { exact: true }).uncheck();
  }
  await page.getByLabel("Public Records").check();
}

export class SearchPropertyByData extends Task {
  private page: Page;
  private propertyData: PropertyData;

  constructor(page: Page, propertyData: PropertyData) {
    super();
    this.page = page;
    this.propertyData = propertyData;
  }

  public async performAs(): Promise<void> {
    const addressParts = this.propertyData.address.split(",");
    const streetAddress = addressParts[0].trim();
    switch (this.propertyData.searchType) {
      case "address":
        await this.page
          .getByPlaceholder("Enter Address, Place, APN/Tax")
          .fill(this.propertyData.address);
        await this.page
          .getByRole("button", { name: "Search", exact: true })
          .click();
        await this.page.waitForLoadState("networkidle");

        if (
          await this.page
            .locator(
              searchResultGrid.multipleListings.replace(
                "Address",
                streetAddress
              )
            )
            .isVisible()
        ) {
          await this.page
            .locator(
              searchResultGrid.propertyAddressLink.replace(
                "Address",
                streetAddress
              )
            )
            .click();
          await this.page.waitForSelector(
            propertyHeader.propertyInformationText
          );
        }
        break;

      case "listingId":
        await this.page
          .getByPlaceholder("Enter Address, Place, APN/Tax")
          .fill(this.propertyData.listingId);
        await this.page.getByText("Find all listings matching").click();
        await this.page
          .getByRole("button", { name: "Search", exact: true })
          .click();
        await this.page
          .locator(
            searchResultGrid.propertyAddressLink.replace(
              "Address",
              streetAddress
            )
          )
          .click();
        break;

      default:
        throw new Error(
          `Option ${this.propertyData.searchType} is not avaliable. Check spelling or add case: ${this.propertyData.searchType} to switch statement`
        );
    }
  }

  public static fromHomePage(
    page: Page,
    propertyData: PropertyData
  ): SearchPropertyByData {
    return new SearchPropertyByData(page, propertyData);
  }
}
