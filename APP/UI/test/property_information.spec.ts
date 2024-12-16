import { test } from "@playwright/test";
import { Actor } from "@testla/screenplay-playwright";
import { BrowseTheWeb } from "@testla/screenplay-playwright/web";
import { Login } from "../lib/tasks/login_page";
import { SearchProperty } from "../lib/tasks/property_search";
import { AreCorrecCardsShown } from "../lib/questions/property_information";
import propertySearchData from "../data/property_search.json";

test.describe("Property Information: ", () => {
  test("Validate property information @PropertyInformation", async ({
    page,
  }) => {
    var searchCriteriaAddress: string = propertySearchData.address;
    const agentMember = Actor.named("Agent")
      .with("email", process.env.AGENT_USER)
      .with("password", process.env.AGENT_PASSWORD)
      .can(BrowseTheWeb.using(page));

    await agentMember.attemptsTo(Login.toWebsite(page));
    await agentMember.attemptsTo(
      SearchProperty.fromHomePage(page, searchCriteriaAddress)
    );

    await agentMember.asks(AreCorrecCardsShown.atPropertyInformationPage(page));
  });
});
