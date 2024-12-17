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
  bath?: number;
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
    if (
      this.propertyType == "sfr" ||
      this.propertyType == "other" ||
      this.propertyType == "farm"
    ) {
      const getBeds = await this.page.locator(summary.beds).textContent();
      const actualBeds = convertStringToNumberForPropertySummary(getBeds);
      const getBaths = await this.page.locator(summary.baths).textContent();
      const actualBaths = convertStringToNumberForPropertySummary(getBaths);
      const getLivingArea = await this.page
        .locator(summary.livingArea)
        .textContent();
      const actualLivingArea =
        convertStringToNumberForPropertySummary(getLivingArea);
      const getLotSize = await this.page.locator(summary.lotSize).textContent();
      const actualLotSize = convertStringToNumberForPropertySummary(getLotSize);
      expect.soft(actualBeds).toEqual(this.propertyData.beds);
      expect.soft(actualBaths).toEqual(this.propertyData.bath);
      expect.soft(actualLivingArea).toEqual(this.propertyData.livingArea);
      expect.soft(actualLotSize).toEqual(this.propertyData.lotSize);
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
    // ///
    // let streetAddress = await this.page
    //   .locator(propertyHeader.streetAddress)
    //   .textContent();
    // let cityStateZip = await this.page
    //   .locator(propertyHeader.cityStateZip)
    //   .textContent();
    // var actualPropertyAddress = streetAddress.trim().concat(" ", cityStateZip);
    // expect(actualPropertyAddress).toMatch(this.propertyType);
  }

  public static forPropertyType(
    page: Page,
    propertyType: string,
    propertyData: PropertyData
  ): IsCorrectSummaryShown {
    return new IsCorrectSummaryShown(page, propertyType, propertyData);
  }
}
// console.log((this.propertyData as any).address);
// console.log(this.propertyData?.address);
// await this.page.waitForLoadState("networkidle");

// if (
//   this.propertyType == "sfr" ||
//   this.propertyType == "other" ||
//   this.propertyType == "farm"
// ) {
//   interface Property {
//     address: string;
//     beds: number;
//     bath: number;
//     livingArea: number;
//     lotSize: number;
//   }

//   const propertySfr: Property = this.propertyData.;
//   console.log(propertySfr.address);
// } else if (
//   this.propertyType == "condoTh" ||
//   this.propertyType == "coop" ||
//   this.propertyType == "mobi"
// ) {
// } else if (this.propertyType == "mult") {
// } else if (this.propertyType == "land") {
// } else {
//   throw new Error(
//     `${this.propertyType} is not valuable option. Check speling or update the if statement for IsCorrectSummaryShown.forPropertyType`
//   );
// }
/////
// let streetAddress = await this.page
//   .locator(propertyHeader.streetAddress)
//   .textContent();
// let cityStateZip = await this.page
//   .locator(propertyHeader.cityStateZip)
//   .textContent();
// var actualPropertyAddress = streetAddress.trim().concat(" ", cityStateZip);
// expect(actualPropertyAddress).toMatch(this.propertyType);

function convertStringToNumberForPropertySummary(stringNumber: string): number {
  return Number(stringNumber.replace(",", ""));
}
