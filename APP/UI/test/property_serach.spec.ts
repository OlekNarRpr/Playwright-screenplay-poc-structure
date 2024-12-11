import { test } from "@playwright/test";
import { Actor } from "@testla/screenplay-playwright";
import { BrowseTheWeb } from "@testla/screenplay-playwright/web";
import { PlaywrightLogin } from "../lib/tasks/login_page";
import { PropertySearch } from "../lib/tasks/property_search";
import { SelectTab } from "../lib/tasks/property_page";
import { IsHomePinShowsCorrectProperty } from "../lib/questions/property_map_page";
import property_search from "../data/property_search.json";

test.describe("Property search: ", () => {
  test("Validate property shown on map @PropertySearch", async ({ page }) => {
    var searchCriteriaAddress: string = property_search.address;
    const agentMember = Actor.named("Agent")
      .with("email", process.env.AGENT_USER)
      .with("password", process.env.AGENT_PASSWORD)
      .can(BrowseTheWeb.using(page));

    await agentMember.attemptsTo(PlaywrightLogin.toWebsite(page));
    await agentMember.attemptsTo(
      PropertySearch.fromHomePage(page, searchCriteriaAddress)
    );
    await agentMember.attemptsTo(
      SelectTab.atPropertyDetails(page, "Map/Location")
    );
    await agentMember.asks(
      IsHomePinShowsCorrectProperty.atMapViewPage(page, searchCriteriaAddress)
    );
  });
});
