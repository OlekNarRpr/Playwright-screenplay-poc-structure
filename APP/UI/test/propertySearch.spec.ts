import { test } from "@playwright/test";
import { Actor } from "@testla/screenplay-playwright";
import { BrowseTheWeb } from "@testla/screenplay-playwright/web";
import { Login } from "../lib/tasks/loginPage";
import {
  ApplyTypeStatusFilter,
  SearchProperty,
  SearchPropertyByData,
} from "../lib/tasks/propertySearch";
import {
  CollectSummaryAndBasicFactsData,
  SelectTab,
} from "../lib/tasks/propertyPage";
import { IsHomePinShowsCorrectProperty } from "../lib/questions/propertyMapPage";
import {
  SelectPropertyByAddrees,
  SelectSearchResultView,
} from "../lib/tasks/searchPesult";
import {
  IsCorrectTypeAndStatus,
  IsPropertyAddressLocated,
} from "../lib/questions/searchResult";
import propertySearchData from "../data/propertySearch.json";
import {
  IsCorrectAddressAndListingIdShown,
  IsCorrectPropertyShown,
  IsCorrectSummaryAndBasicFactsShown,
} from "../lib/questions/propertyInformationPage";

import propertiesData from "../data/propertiesData.json";
import { PropertySummaryAndBasicFacts } from "../interface/proppertySummaryAndBasicFacts";

test.describe("Property search: ", () => {
  test("Validate property shown on map @PropertySearch", async ({ page }) => {
    const searchCriteriaAddress: string = propertySearchData.address;
    const agentMember = Actor.named("Agent")
      .with("email", process.env.AGENT_USER)
      .with("password", process.env.AGENT_PASSWORD)
      .can(BrowseTheWeb.using(page));

    await agentMember.attemptsTo(Login.toWebsite(page));
    await agentMember.attemptsTo(
      SearchProperty.fromHomePage(page, searchCriteriaAddress)
    );
    await agentMember.attemptsTo(
      SelectTab.atPropertyDetails(page, "Map/Location")
    );

    await agentMember.asks(
      IsHomePinShowsCorrectProperty.atMapViewPage(page, searchCriteriaAddress)
    );
  });

  test(`Validate property search for City, State & Zip @PropertySearch`, async ({
    page,
  }) => {
    const agentMember = Actor.named("Agent")
      .with("email", process.env.AGENT_USER)
      .with("password", process.env.AGENT_PASSWORD)
      .can(BrowseTheWeb.using(page));

    await agentMember.attemptsTo(Login.toWebsite(page));
    await agentMember.attemptsTo(
      SearchProperty.fromHomePage(page, propertySearchData.cityStateZip)
    );
    await agentMember.attemptsTo(
      SelectSearchResultView.typeAs(page, "List View")
    );

    await agentMember.asks(
      IsPropertyAddressLocated.withinSearchArea(
        page,
        propertySearchData.cityStateZip,
        "cityStateZip"
      )
    );
  });

  test(`Validate property search by County @PropertySearch`, async ({
    page,
  }) => {
    const agentMember = Actor.named("Agent")
      .with("email", process.env.AGENT_USER)
      .with("password", process.env.AGENT_PASSWORD)
      .can(BrowseTheWeb.using(page));

    await agentMember.attemptsTo(Login.toWebsite(page));
    await agentMember.attemptsTo(
      SearchProperty.fromHomePage(page, propertySearchData.county)
    );
    await agentMember.attemptsTo(
      SelectSearchResultView.typeAs(page, "List View")
    );

    await agentMember.asks(
      IsPropertyAddressLocated.withinSearchArea(
        page,
        propertySearchData.county,
        "county"
      )
    );
  });

  test(`Validate property search by Address @PropertySearch`, async ({
    page,
  }) => {
    const agentMember = Actor.named("Agent")
      .with("email", process.env.AGENT_USER)
      .with("password", process.env.AGENT_PASSWORD)
      .can(BrowseTheWeb.using(page));

    await agentMember.attemptsTo(Login.toWebsite(page));
    await agentMember.attemptsTo(
      SearchProperty.fromHomePage(page, propertySearchData.address)
    );

    await agentMember.asks(
      IsCorrectPropertyShown.asAddressSearchResult(
        page,
        propertySearchData.address
      )
    );
  });

  test(`Validate property search by Listing ID @PropertySearch`, async ({
    page,
  }) => {
    const agentMember = Actor.named("Agent")
      .with("email", process.env.AGENT_USER)
      .with("password", process.env.AGENT_PASSWORD)
      .can(BrowseTheWeb.using(page));

    await agentMember.attemptsTo(Login.toWebsite(page));
    await agentMember.attemptsTo(
      SearchProperty.fromHomePage(page, propertySearchData.listingId)
    );
    await agentMember.attemptsTo(
      SelectPropertyByAddrees.fromSearchResults(
        page,
        propertySearchData.address
      )
    );
    await agentMember.asks(
      IsCorrectAddressAndListingIdShown.atPropertyPage(
        page,
        propertySearchData.address,
        propertySearchData.listingId
      )
    );
  });

  type TypeStatusPair = [string, string];
  const statusPairs: TypeStatusPair[] = [
    ["For Sale", "Active"],
    ["For Sale", "Active Under Contract"],
    ["For Sale", "Pending"],
    ["For Sale", "Hold"],
    ["For Sale", "Closed"],
    ["For Sale", "Withdrawn"],
    ["For Sale", "Canceled"],
    ["For Sale", "Expired"],
    ["For Lease", "Active"],
    ["For Lease", "Active Under Contract"],
    ["For Lease", "Pending"],
    ["For Lease", "Hold"],
    ["For Lease", "Closed"],
    ["For Lease", "Withdrawn"],
    ["For Lease", "Canceled"],
    ["For Lease", "Expired"],
  ];

  for (const [type, status] of statusPairs) {
    test(`Validate search filter. Type: ${type} and Status: ${status} @PropertySearch`, async ({
      page,
    }) => {
      const agentMember = Actor.named("Agent")
        .with("email", process.env.AGENT_USER)
        .with("password", process.env.AGENT_PASSWORD)
        .can(BrowseTheWeb.using(page));

      await agentMember.attemptsTo(Login.toWebsite(page));
      await agentMember.attemptsTo(
        ApplyTypeStatusFilter.fromHomePage(page, type, status)
      );
      await agentMember.attemptsTo(
        SearchProperty.fromHomePage(page, "Los Angeles, California")
      );
      await agentMember.attemptsTo(
        SelectSearchResultView.typeAs(page, "List View")
      );

      await agentMember.asks(
        IsCorrectTypeAndStatus.shownInSearchResult(page, type, status)
      );
    });
  }

  for (const data of propertiesData.data) {
    test(`Validate property Summary and Basic Facts for property with Listing ID: ${data.listingId} @PropertySearch`, async ({
      page,
    }) => {
      const agentMember = Actor.named("Agent")
        .with("email", process.env.AGENT_USER)
        .with("password", process.env.AGENT_PASSWORD)
        .can(BrowseTheWeb.using(page));

      await agentMember.attemptsTo(Login.toWebsite(page));
      await agentMember.attemptsTo(
        ApplyTypeStatusFilter.fromHomePage(page, "For Sale", "Active")
      );
      await agentMember.attemptsTo(
        SearchPropertyByData.fromHomePage(page, data)
      );
      //await page.waitForTimeout(10000);
      const actualPropertySummaryAndBasicFactsData: PropertySummaryAndBasicFacts =
        await agentMember.attemptsTo(
          CollectSummaryAndBasicFactsData.fromPropertyPage(page)
        );
      await agentMember.asks(
        IsCorrectSummaryAndBasicFactsShown.forProperty(
          page,
          actualPropertySummaryAndBasicFactsData,
          data.summaryInformation
        )
      );
    });
  }
});
