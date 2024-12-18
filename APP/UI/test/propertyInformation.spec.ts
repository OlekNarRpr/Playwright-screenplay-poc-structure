import { test } from "@playwright/test";
import { Actor } from "@testla/screenplay-playwright";
import { BrowseTheWeb } from "@testla/screenplay-playwright/web";
import { Login } from "../lib/tasks/loginPage";
import { SearchProperty } from "../lib/tasks/propertySearch";
import {
  AreCorrecCardsShown,
  IsCorrectSummaryShown,
} from "../lib/questions/propertyInformationPage";
import propertySearchData from "../data/propertySearch.json";
import propertySummaryData from "../data/propertySummary.json";

test.describe("Property Information: ", () => {
  test("Validate property information @PropertyInformation", async ({
    page,
  }) => {
    const searchCriteriaAddress: string = propertySearchData.address;
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

for (const propertyType in propertySummaryData) {
  test(`Validate property summary for property type: ${propertyType} @PropertyInformation`, async ({
    page,
  }) => {
    const propertyData = propertySummaryData[propertyType];
    const agentMember = Actor.named("Agent")
      .with("email", process.env.AGENT_USER)
      .with("password", process.env.AGENT_PASSWORD)
      .can(BrowseTheWeb.using(page));

    await agentMember.attemptsTo(Login.toWebsite(page));
    await agentMember.attemptsTo(
      SearchProperty.fromHomePage(page, propertyData.address)
    );

    await agentMember.asks(
      IsCorrectSummaryShown.forPropertyType(page, propertyData)
    );
  });
}
