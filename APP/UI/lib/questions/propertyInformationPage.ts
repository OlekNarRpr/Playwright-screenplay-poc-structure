import { expect, Page } from "@playwright/test";
import { Question } from "@testla/screenplay-playwright";
import { propertyHeader, summary } from "../locators/propertyInformationPage";
import { SummaryAndBasicFacts } from "../../interface/Data/propertyData";
import { PropertySummaryAndBasicFacts } from "../../interface/PropertyPage/proppertySummaryAndBasicFacts";

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
  private actualPropertiesData: PropertySummaryAndBasicFacts;
  private expectedPropertiesData: SummaryAndBasicFacts;

  constructor(
    page: Page,
    actualPropertiesData: PropertySummaryAndBasicFacts,
    expectedPropertiesData: SummaryAndBasicFacts
  ) {
    super();
    this.page = page;
    this.actualPropertiesData = actualPropertiesData;
    this.expectedPropertiesData = expectedPropertiesData;
  }

  public async answeredBy(): Promise<void> {
    await this.page.waitForLoadState("networkidle");

    for (const propertyInfo in this.expectedPropertiesData) {
      expect
        .soft(this.actualPropertiesData[propertyInfo])
        .toEqual(this.expectedPropertiesData[propertyInfo]);
    }
  }

  public static forProperty(
    page: Page,
    actualPropertiesData: PropertySummaryAndBasicFacts,
    expectedPropertiesData: SummaryAndBasicFacts
  ): IsCorrectSummaryAndBasicFactsShown {
    return new IsCorrectSummaryAndBasicFactsShown(
      page,
      actualPropertiesData,
      expectedPropertiesData
    );
  }
}

export class IsCorrectListOrgNameShown extends Question<void> {
  private actualListOrgName: string;
  private expectedListOrgName: string;

  constructor(actualListOrgName: string, expectedactualListOrgName: string) {
    super();
    this.actualListOrgName = actualListOrgName;
    this.expectedListOrgName = expectedactualListOrgName;
  }

  public async answeredBy(): Promise<void> {
    expect.soft(this.actualListOrgName).toContain(this.expectedListOrgName);
  }

  public static atListingDeteails(
    actualListOrgName: string,
    expectedListOrgName: string
  ): IsCorrectListOrgNameShown {
    return new IsCorrectListOrgNameShown(
      actualListOrgName,
      expectedListOrgName
    );
  }
}
