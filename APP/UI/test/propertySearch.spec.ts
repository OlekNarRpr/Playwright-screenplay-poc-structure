import { test } from "@playwright/test";
import { Actor } from "@testla/screenplay-playwright";
import { BrowseTheWeb } from "@testla/screenplay-playwright/web";
import { Login } from "../lib/tasks/loginPage";
import { SearchProperty } from "../lib/tasks/propertySearch";
import { SelectTab } from "../lib/tasks/propertyPage";
import { IsHomePinShowsCorrectProperty } from "../lib/questions/propertyMapPage";
import {
  SelectPropertyByAddrees,
  SelectSearchResultView,
} from "../lib/tasks/searchPesult";
import { IsPropertyAddressLocated } from "../lib/questions/searchResult";
import propertySearchData from "../data/propertySearch.json";
import {
  IsCorrectAddressAndListingIdShown,
  IsCorrectPropertyShown,
} from "../lib/questions/propertyInformationPage";

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

  test(`Validate search filter: Type/Status @PropertySearch`, async ({
    page,
  }) => {
    const searchCriteria = "San Diego, California";
    const include = ["For Sale", "For Lease"];
    const colums = [
      "Active",
      "Active Under Contract",
      "Pending",
      "Hold",
      "Closed",
      "Withdrawn",
      "Canceled",
      "Expired",
    ];
    const agentMember = Actor.named("Agent")
      .with("email", process.env.AGENT_USER)
      .with("password", process.env.AGENT_PASSWORD)
      .can(BrowseTheWeb.using(page));

    await agentMember.attemptsTo(Login.toWebsite(page));
    await agentMember.attemptsTo(
      SearchProperty.fromHomePage(page, searchCriteria)
    );
    await agentMember.attemptsTo(
      SelectSearchResultView.typeAs(page, "List View")
    );

    var test = {
      orgId: "vanrv-a",
      orgName: "New River Valley Association of REALTORS® MLS",
      data: [
        {
          searchType: "address",
          address: "974 Round Meadow Dr,Christiansburg, VA 24073",
          listingId: "420515",
          summaryInformation:
            "status, beds, bath, listingId, livingArea, ownerName, listPrice, lotSize, type",
        },
        {
          searchType: "listingId",
          address: "2130 Lubna Dr,Christiansburg, VA 24073",
          listingId: "422298",
          summaryInformation:
            "status, beds, bath, listingId, livingArea, listPrice, lotSize, type",
        },
        {
          searchType: "address",
          address: "529 Free St,Dublin, VA 24084",
          listingId: "422674",
          summaryInformation:
            "status, beds, bath, daysOnRpr, livingArea, zoning, listingId, listPrice, type",
        },
        {
          searchType: "listingId",
          address: "6544 Owens Rd,Radford, VA 24141",
          listingId: "422503",
          summaryInformation:
            "status, beds, bath,livingArea, type, ownerName, listingId, listPrice, type",
        },
      ],
    };

    // await agentMember.asks();
  });
});
// getByLabel('type/status') - dropdown

//getByLabel('For Sale')
//getByLabel('For Lease')
//getByLabel('Active', { exact: true })
//getByLabel('Active Under Contract')
//getByLabel('Pending')
//getByLabel('Hold')
//getByLabel('Closed')
//getByLabel('Withdrawn')
//getByLabel('Canceled')
//getByLabel('Expired')

//getByLabel('Public Records')
//getByPlaceholder('MM/DD/YYYY').first()
//locator('#type-status-dropdown i').first()
//getByPlaceholder('MM/DD/YYYY').nth(1)
//locator('#type-status-dropdown i').nth(1)

//getByRole('button', { name: 'This Month' })
//getByRole('button', { name: 'Last 30 Days' })
//getByRole('button', { name: 'Last 3 Months' })
//getByRole('button', { name: 'Last 6 Months' })
//getByRole('button', { name: 'Last 12 Months' })
//getByRole('button', { name: 'Custom Date Range' })
//locator('mat-form-field div').filter({ hasText: 'MM/DD/YYYY–MM/DD/YYYY' }).first()
//getByLabel('Previous month')
//getByLabel('Next month')
//getByLabel('Choose month and year')
//
//
//
//
//
//
//
//
//
//
//
//
//

//getByLabel('Open calendar')

//getByRole('button', { name: 'Clear' })
