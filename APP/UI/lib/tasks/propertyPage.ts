import { Task } from "@testla/screenplay-playwright";
import { Page } from "@playwright/test";
import { PropertySummaryAndBasicFacts } from "../../interface/proppertySummaryAndBasicFacts";
import { basicFacts, summary } from "../locators/propertyInformationPage";
import { isNumber } from "../../helper/stringHelper";

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
      throw new Error(
        `Option ${this.tabName} is invalid option. Check speling and tab name`
      );
    }
  }

  public static atPropertyDetails(page: Page, tabName: string): SelectTab {
    return new SelectTab(page, tabName);
  }
}

export class CollectSummaryAndBasicFactsData extends Task {
  private page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
  }

  public async performAs(): Promise<PropertySummaryAndBasicFacts> {
    var propertySummaryAndBasicFacts: PropertySummaryAndBasicFacts = {};

    const locators = {
      statusType: summary.statusType,
      listPrice: summary.listPrice,
      beds: summary.beds,
      baths: summary.baths,
      livingArea: summary.livingArea,
      lotSize: summary.lotSize,
      summaryYearBuilt: summary.yearBuilt,
      units: summary.units,
      summaryZoning: summary.zoning,
      listingId: summary.listingId,
      basicFactsYearBuilt: basicFacts.yearBuilt,
      basicFactsZoning: basicFacts.zoning,
      daysOnRpr: basicFacts.daysInRpr,
      priceBySqft: basicFacts.priceBySqft,
      ownerName: basicFacts.ownerName,
      propertyType: basicFacts.propertyType,
      landUse: basicFacts.landUse,
      numberOfBuildings: basicFacts.numberOfBuildings,
    };
    await this.page.waitForSelector(basicFacts.propertyType);
    for (var locator in locators) {
      if (await this.page.locator(locators[locator]).isVisible()) {
        const value = await this.page.locator(locators[locator]).textContent();
        if (locator == "statusType") {
          const [extractedStatus, extractedType] =
            await getStatusTypeFromSummary(this.page);
          propertySummaryAndBasicFacts["status"] = extractedStatus;
          propertySummaryAndBasicFacts["type"] = extractedType;
        } else if (
          locator.startsWith("basicFacts") ||
          locator.startsWith("summary")
        ) {
          const prefix = locator.startsWith("basicFacts")
            ? "basicFacts"
            : "summary";
          var objectProperty = locator.replace(prefix, "");
          objectProperty =
            objectProperty.charAt(0).toLowerCase() + objectProperty.slice(1);
          if (objectProperty == "zoning")
            propertySummaryAndBasicFacts[objectProperty] = value;
          else
            propertySummaryAndBasicFacts[objectProperty] =
              convertStringToNumber(value);
        } else if (value.startsWith("$")) {
          const convertedValue = convertStringToNumber(value);
          propertySummaryAndBasicFacts[locator] = convertedValue;
        } else if (!isNumber(value) || locator == "listingId") {
          propertySummaryAndBasicFacts[locator] = value;
        } else {
          const convertedValue = convertStringToNumber(value);
          propertySummaryAndBasicFacts[locator] = convertedValue;
        }
      }
    }
    return propertySummaryAndBasicFacts;
  }

  public static fromPropertyPage(page: Page): CollectSummaryAndBasicFactsData {
    return new CollectSummaryAndBasicFactsData(page);
  }
}

function convertStringToNumber(str: string): number | null {
  const num = parseFloat(str.replace(/[$,]/g, ""));
  return !isNaN(num) && isFinite(num) ? num : null;
}

async function getStatusTypeFromSummary(page: Page) {
  let getStatusType = await page.locator(summary.statusType).textContent();
  const [status, type] = getStatusType.trim().split("/");
  return [status.trim(), type.trim()];
}
