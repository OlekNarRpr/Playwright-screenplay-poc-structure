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

interface TypeStatusFilter {
  type: string[];
  status: string[];
}

export class SearchPropertyUsingTypeStatusFilter extends Task {
  private page: Page;
  private searchCriteria: string;
  private typeStatusFilter: TypeStatusFilter;

  constructor(
    page: Page,
    searchCriteria: string,
    typeStatusFilter: TypeStatusFilter
  ) {
    super();
    this.page = page;
    this.searchCriteria = searchCriteria;
    this.typeStatusFilter = typeStatusFilter;
  }

  public async performAs(): Promise<void> {
    await uncheckTypeStatusFilterCheckboxesCheckPublickRecords(this.page);
    // await this.page.waitForTimeout(2000);
    // await this.page.getByLabel("For Sale").check();
    // this.typeStatusFilter.type.forEach(async (type) => {
    //   await this.page.getByLabel(type, { exact: true }).check();
    // });
    // await this.page.waitForTimeout(1000);
    // this.typeStatusFilter.status.forEach(async (status) => {
    //   await this.page.getByLabel(status, { exact: true }).check();
    // });
    // await this.page.waitForTimeout(2000);
    await this.page.getByLabel("For Sale").check();
    // await this.page.getByLabel("For Lease").check();
    // await this.page.getByLabel("Active", { exact: true }).check();
    // await this.page.getByLabel("Active Under Contract").check();
    // await this.page.getByLabel("Pending").check();
    await this.page.getByLabel("Hold").check();
    await this.page.getByLabel("Closed").check();
    // await this.page.getByLabel("Withdrawn").check();
    await this.page.getByLabel("Canceled").check();
    // await this.page.getByLabel("Expired").check();
    await this.page.waitForTimeout(4000);
  }

  public static fromHomePage(
    page: Page,
    searchCriteria: string,
    typeStatusFilter: TypeStatusFilter
  ): SearchPropertyUsingTypeStatusFilter {
    return new SearchPropertyUsingTypeStatusFilter(
      page,
      searchCriteria,
      typeStatusFilter
    );
  }
}

// await this.page
//   .getByPlaceholder("Enter Address, Place, APN/Tax")
//   .fill(this.searchCriteria);
// if (this.searchCriteria.trim().split(/\s+/).length == 1) {
//   await this.page.getByText("Find all listings matching").click();
// } else {
//   await this.page
//     .getByRole("button", { name: "Search", exact: true })
//     .click();
// }

async function uncheckTypeStatusFilterCheckboxesCheckPublickRecords(
  page: Page
) {
  const checkboxes = [
    "For Lease",
    "Active",
    "Active Under Contract",
    "Pending",
    "Hold",
    "Closed",
    "Withdrawn",
    "Canceled",
    "Expired",
  ];
  await page.getByLabel("type/status").click();
  for (const checkbox of checkboxes) {
    await page.getByLabel(checkbox, { exact: true }).uncheck();
  }
  await page.getByLabel("Public Records").check();
}
