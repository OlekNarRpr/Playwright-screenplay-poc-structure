import { test } from "@playwright/test";
import { Actor } from "@testla/screenplay-playwright";
import { BrowseTheWeb } from "@testla/screenplay-playwright/web";
import { PlaywrightLogin } from "../lib/tasks/login_page";
import { PropertySearch } from "../lib/tasks/property_search";
import property_search from "../data/property_search.json";
import { AreCorrecCardsShown } from "../lib/questions/property_information";

test.describe("Property Information: ", () => {
  //TODO:
  //   test.beforeAll(async () => {
  //      DB HELPER:
  //          Connect to DB
  //          Query DB for Property Info
  //          Close connection to DB//
  //      Save Property Info
  //      Validate over property Info
  //   });

  //   test.afterAll(async () => {
  //     Do I need one? Probably no
  //   });

  test("Validate property information @PropertyInformation", async ({
    page,
  }) => {
    var searchCriteriaAddress: string = property_search.address;
    const agentMember = Actor.named("Agent")
      .with("email", process.env.AGENT_USER)
      .with("password", process.env.AGENT_PASSWORD)
      .can(BrowseTheWeb.using(page));

    await agentMember.attemptsTo(PlaywrightLogin.toWebsite(page));
    await agentMember.attemptsTo(
      PropertySearch.fromHomePage(page, searchCriteriaAddress)
    );

    await agentMember.asks(AreCorrecCardsShown.atPropertyInformationPage(page));
  });
});
