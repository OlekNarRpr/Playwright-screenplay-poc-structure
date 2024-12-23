import { expect, Page } from "@playwright/test";
import { Question } from "@testla/screenplay-playwright";
import { propertyHeader, summary } from "../locators/propertyInformationPage";
import { SummaryAndBasicFacts } from "../../interface/Data/propertyData";
import { PropertySummaryAndBasicFacts } from "../../interface/PropertyPage/proppertySummaryAndBasicFacts";
import { isValidPriceFormat } from "../../helper/stringHelper";

export class IsCorrectPropertyShown extends Question<boolean> {
  private actualPropertyAddress: string;
  private expectedPropertyAddress: string;

  constructor(actualPropertyAddress: string, expectedPropertyAddress: string) {
    super();
    this.actualPropertyAddress = actualPropertyAddress;
    this.expectedPropertyAddress = expectedPropertyAddress;
  }

  public async answeredBy(): Promise<void> {
    expect(this.actualPropertyAddress).toMatch(this.expectedPropertyAddress);
  }

  public static asAddressSearchResult(
    actualPropertyAddress: string,
    expectedPropertyAddress: string
  ): IsCorrectPropertyShown {
    return new IsCorrectPropertyShown(
      actualPropertyAddress,
      expectedPropertyAddress
    );
  }
}

export class IsCorrectListingIdShown extends Question<void> {
  private page: Page;
  private actualListingId: string;
  private expectedListingId: string;

  constructor(
    page: Page,
    actualListingId: string,
    expectedPropertyListingId: string
  ) {
    super();
    this.page = page;
    this.actualListingId = actualListingId;
    this.expectedListingId = expectedPropertyListingId;
  }

  public async answeredBy(): Promise<void> {
    await this.page.waitForLoadState("networkidle");

    expect.soft(this.actualListingId).toMatch(this.expectedListingId);
  }

  public static atPropertyPage(
    page: Page,
    actualListingId: string,
    expectedPropertyListingId: string
  ): IsCorrectListingIdShown {
    return new IsCorrectListingIdShown(
      page,
      actualListingId,
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

export class IsPriceShownAndMachFormat extends Question<void> {
  private actualPrice: string;

  constructor(actualPrice: string) {
    super();
    this.actualPrice = actualPrice;
  }

  public async answeredBy(): Promise<void> {
    expect(isValidPriceFormat(this.actualPrice)).toBe(true);
  }

  public static atPropertySummary(
    actualPrice: string
  ): IsPriceShownAndMachFormat {
    return new IsPriceShownAndMachFormat(actualPrice);
  }
}
