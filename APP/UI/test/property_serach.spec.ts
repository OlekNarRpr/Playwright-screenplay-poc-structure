import { test } from "@playwright/test";
import { Actor } from "@testla/screenplay-playwright";
import { BrowseTheWeb } from "@testla/screenplay-playwright/web";
import { PlaywrightLogin } from "../lib/tasks/login_page";
import { PropertySearch } from "../lib/tasks/property_search";
import { SelectTab } from "../lib/tasks/property_page";
import { IsHomePinShowsCorrectProperty } from "../lib/questions/property_map_page";

test.describe("Login: ", () => {
  test("Validate property shonw on map @L1", async ({ page }) => {
    var propertyAddress: string = "13990 Hickory St, Poway, CA 92064";

    const agentMember = Actor.named("Invalid member")
      .with("email", process.env.AGENT_USER)
      .with("password", process.env.AGENT_PASSWORD)
      .can(BrowseTheWeb.using(page));

    await agentMember.attemptsTo(PlaywrightLogin.toWebsite(page));
    await agentMember.attemptsTo(
      PropertySearch.fromHomePage(page, propertyAddress)
    );
    await agentMember.attemptsTo(
      SelectTab.atPropertyDetails(page, "Map/Location")
    );
    await agentMember.asks(
      IsHomePinShowsCorrectProperty.atMapViewPage(page, propertyAddress)
    );
  });
});
