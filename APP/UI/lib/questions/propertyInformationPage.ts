import { expect, Page } from "@playwright/test";
import { Question } from "@testla/screenplay-playwright";
import { propertyHeader, summary } from "../locators/propertyInformationPage";

export class AreCorrecCardsShown extends Question<boolean> {
  private page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
  }

  public async answeredBy(): Promise<void> {
    //necessary in order to fully load the Property Information page
    await this.page.waitForLoadState("networkidle");
    for (var i = 0; i < 3000; i = i + 100) {
      await this.page.mouse.wheel(i, i + 100);
      await this.page.waitForLoadState("domcontentloaded");
    }

    await expect
      .soft(this.page.getByRole("button", { name: "Photos" }))
      .toBeVisible();
    await expect
      .soft(this.page.getByRole("button", { name: "Street" }))
      .toBeVisible();
    await expect
      .soft(this.page.getByRole("button", { name: "Satellite" }))
      .toBeVisible();
    await expect
      .soft(this.page.getByRole("button", { name: "Historical" }))
      .toBeVisible();
    await expect
      .soft(
        this.page
          .locator("div")
          .filter({ hasText: /^List Price$/ })
          .first()
      )
      .toBeVisible();
    await expect
      .soft(this.page.locator("div").filter({ hasText: /^AVM$/ }))
      .toBeVisible();
    await expect
      .soft(this.page.getByRole("heading", { name: "Basic Facts" }))
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Pricing Tools" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Description", exact: true })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page.getByRole("heading", { name: "Map" }).getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Property Facts" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Additional Resources" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Listing Agent" })
          .getByRole("paragraph")
      )
      .toBeVisible();

    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Interior Features" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Exterior Features" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Listing Details" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Financing Terms" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Legal Description" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Schools" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Listing History" })
          .getByRole("paragraph")
      )
      .toBeVisible();

    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Public Record History" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Sales and Financing Activity" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Estimated Value" })
          .getByRole("paragraph")
      )
      .toBeVisible();
  }

  public static atPropertyInformationPage(page: Page): AreCorrecCardsShown {
    return new AreCorrecCardsShown(page);
  }
}

export class IsCorrectPropertyShown extends Question<boolean> {
  private page: Page;
  private expectedPropertyInformation: string;

  constructor(page: Page, expectedPropertyInformation: string) {
    super();
    this.page = page;
    this.expectedPropertyInformation = expectedPropertyInformation;
  }

  public async answeredBy(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    let streetAddress = await this.page
      .locator(propertyHeader.streetAddress)
      .textContent();
    let cityStateZip = await this.page
      .locator(propertyHeader.cityStateZip)
      .textContent();
    var actualPropertyAddress = streetAddress.trim().concat(" ", cityStateZip);
    expect(actualPropertyAddress).toMatch(this.expectedPropertyInformation);
  }

  public static asAddressSearchResult(
    page: Page,
    expectedPropertyInformation: string
  ): IsCorrectPropertyShown {
    return new IsCorrectPropertyShown(page, expectedPropertyInformation);
  }
}

export class IsCorrectAddressAndListingIdShown extends Question<void> {
  private page: Page;
  private expectedAddress: string;
  private expectedListingId: string;

  constructor(
    page: Page,
    expectedPropertyAddress: string,
    expectedPropertyListingId: string
  ) {
    super();
    this.page = page;
    this.expectedAddress = expectedPropertyAddress;
    this.expectedListingId = expectedPropertyListingId;
  }

  public async answeredBy(): Promise<void> {
    await this.page.waitForLoadState("networkidle");

    let streetAddress = await this.page
      .locator(propertyHeader.streetAddress)
      .textContent();
    let cityStateZip = await this.page
      .locator(propertyHeader.cityStateZip)
      .textContent();
    var actualPropertyAddress = streetAddress.trim().concat(" ", cityStateZip);
    var actualListingId = await this.page
      .locator(summary.listingId)
      .textContent();

    expect.soft(actualPropertyAddress).toMatch(this.expectedAddress);
    expect.soft(actualListingId).toMatch(this.expectedListingId);
  }

  public static atPropertyPage(
    page: Page,
    expectedPropertyAddress: string,
    expectedPropertyListingId: string
  ): IsCorrectAddressAndListingIdShown {
    return new IsCorrectAddressAndListingIdShown(
      page,
      expectedPropertyAddress,
      expectedPropertyListingId
    );
  }
}

interface PropertyData {
  address: string;
  beds?: number;
  baths?: number;
  livingArea?: number;
  lotSize?: number;
  yearBuilt?: number;
  units?: number;
  zoning?: string;
}

export class IsCorrectSummaryShown extends Question<void> {
  private page: Page;
  private propertyType: string;
  private propertyData: PropertyData;

  constructor(page: Page, propertyType: string, propertyData: PropertyData) {
    super();
    this.page = page;
    this.propertyType = propertyType;
    this.propertyData = propertyData;
  }

  public async answeredBy(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    var actualSummaryData = await collectSummaryData(this.page);
    if (
      this.propertyType == "sfr" ||
      this.propertyType == "other" ||
      this.propertyType == "farm"
    ) {
      expect.soft(actualSummaryData.beds).toEqual(this.propertyData.beds);
      expect.soft(actualSummaryData.baths).toEqual(this.propertyData.baths);
      expect
        .soft(actualSummaryData.livingArea)
        .toEqual(this.propertyData.livingArea);
      expect.soft(actualSummaryData.lotSize).toEqual(this.propertyData.lotSize);
    } else if (
      this.propertyType == "condoTh" ||
      this.propertyType == "coop" ||
      this.propertyType == "mobi"
    ) {
    } else if (this.propertyType == "mult") {
    } else if (this.propertyType == "land") {
    } else {
      throw new Error(
        `${this.propertyType} is not valuable option. Check speling or update the if statement for IsCorrectSummaryShown.forPropertyType`
      );
    }
  }

  public static forPropertyType(
    page: Page,
    propertyType: string,
    propertyData: PropertyData
  ): IsCorrectSummaryShown {
    return new IsCorrectSummaryShown(page, propertyType, propertyData);
  }
}

async function collectSummaryData(page: Page) {
  var summaryInformation = {
    beds: null,
    baths: null,
    livingArea: null,
    lotSize: null,
    yearBuilt: null,
    units: null,
    zoning: null,
  };

  const locators = {
    beds: summary.beds,
    baths: summary.baths,
    livingArea: summary.livingArea,
    lotSize: summary.lotSize,
    yearBuilt: summary.yearBuilt,
    units: summary.units,
    zoning: summary.zoning,
  };

  for (const locator in locators) {
    if (await page.locator(locators[locator]).isVisible()) {
      const value = await page.locator(locators[locator]).textContent();
      if (locator == "zoning") summaryInformation[locator] = value;
      else {
        const convertedValue = convertStringToNumberForPropertySummary(value);
        summaryInformation[locator] = convertedValue;
      }
    }
  }
  return summaryInformation;
}

function convertStringToNumberForPropertySummary(stringNumber: string): number {
  return Number(stringNumber.replace(",", ""));
}
