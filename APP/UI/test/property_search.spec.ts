import { test } from "@playwright/test";
import { Actor } from "@testla/screenplay-playwright";
import { BrowseTheWeb } from "@testla/screenplay-playwright/web";
import { Login } from "../lib/tasks/login_page";
import { SearchProperty } from "../lib/tasks/property_search";
import { SelectTab } from "../lib/tasks/property_page";
import { IsHomePinShowsCorrectProperty } from "../lib/questions/property_map_page";
import {
  SelectPropertyByAddrees,
  SelectSearchResultView,
} from "../lib/tasks/search_result";
import { IsPropertyAddressLocated } from "../lib/questions/search_result";
import propertySearchData from "../data/property_search.json";
import {
  IsCorrectAddressAndListingIdShown,
  IsCorrectPropertyShown,
} from "../lib/questions/property_information";

test.describe("Property search: ", () => {
  test("Validate property shown on map @PropertySearch", async ({ page }) => {
    var searchCriteriaAddress: string = propertySearchData.address;
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
});
