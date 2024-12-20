import { expect, Page } from "@playwright/test";
import { Question } from "@testla/screenplay-playwright";
import { propertyHeader, summary } from "../locators/propertyInformationPage";
import { SummaryAndBasicFacts } from "../../interface/propertyData";
import { PropertySummaryAndBasicFacts } from "../../interface/proppertySummaryAndBasicFacts";

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

export class IsCorrectSummaryAndBasicFactsShown extends Question<void> {
  private page: Page;
  private actualPropertyData: PropertySummaryAndBasicFacts;
  private expectedPropertyData: SummaryAndBasicFacts;

  constructor(
    page: Page,
    actualPropertyData: PropertySummaryAndBasicFacts,
    expectedPropertyData: SummaryAndBasicFacts
  ) {
    super();
    this.page = page;
    this.actualPropertyData = actualPropertyData;
    this.expectedPropertyData = expectedPropertyData;
  }

  public async answeredBy(): Promise<void> {
    await this.page.waitForLoadState("networkidle");

    for (const key in this.expectedPropertyData) {
      expect
        .soft(this.actualPropertyData[key])
        .toEqual(this.expectedPropertyData[key]);
    }
  }

  public static forProperty(
    page: Page,
    actualPropertyData: PropertySummaryAndBasicFacts,
    expectedPropertyData: SummaryAndBasicFacts
  ): IsCorrectSummaryAndBasicFactsShown {
    return new IsCorrectSummaryAndBasicFactsShown(
      page,
      actualPropertyData,
      expectedPropertyData
    );
  }
}

export class IsCorrectAddressAndListindIdShown extends Question<boolean> {
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

  public static forProperty(
    page: Page,
    expectedPropertyInformation: string
  ): IsCorrectAddressAndListindIdShown {
    return new IsCorrectAddressAndListindIdShown(
      page,
      expectedPropertyInformation
    );
  }
}
