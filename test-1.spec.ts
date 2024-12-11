import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://auth-qa.narrpr.com/auth/sign-in?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dmain_website%26redirect_uri%3Dhttps%253A%252F%252Fqa.narrpr.com%252Fauth%252Fcallback%26response_type%3Dcode%26scope%3Dopenid%2520email%2520rpr_contact%2520rpr_current_user%2520rpr_permissions%2520rpr_roles%2520main_api_access%2520web_api_access%2520auth_api_access%26state%3D05d4cb93c18b436b8aa4b6f72e02608c%26code_challenge%3D3ZDIfrCbKkZ8GnZh8UtUIbHrGijrTeRViN0_xmuWU6o%26code_challenge_method%3DS256%26response_mode%3Dquery"
  );
  await page.getByPlaceholder("e.g. user@gmail.com").fill("olekl@narprp.com");
  await page.getByPlaceholder("e.g. user@gmail.com").press("Tab");
  await page.getByPlaceholder("e.g. user@gmail.com").click();
  await page.getByPlaceholder("e.g. user@gmail.com").click();
  await page.getByPlaceholder("e.g. user@gmail.com").fill("olekl@narrpr.com");
  await page.getByPlaceholder("e.g. user@gmail.com").press("Tab");
  await page.getByPlaceholder("Case Sensitive").fill("Cur10s1ty.!");
  await page.getByPlaceholder("Case Sensitive").press("Enter");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Map/Location" }).click();
  await page.getByRole("link", { name: "Property Information" }).click();
  await page.getByRole("link", { name: "Market Trends" }).click();
  await page.getByRole("link", { name: "Refined Value" }).click();
  await page.getByRole("link", { name: "CMA" }).click();
  await page.getByRole("link", { name: "Neighborhood" }).click();
  await page.getByRole("link", { name: " Property" }).click();
  await page.getByRole("link", { name: "My Updates" }).click();
  await page.getByRole("link", { name: "Property Information" }).click();
  await page.getByRole("button", { name: " Photos" }).click();
  await page
    .getByText("PhotosPhotosStreetStreetSatelliteSatelliteHistoricalHistorical")
    .click();
  await page.getByRole("button", { name: " Street" }).click();
  await page.getByRole("button", { name: " Satellite" }).click();
  await page.getByRole("button", { name: " Historical" }).click();
  await page.getByLabel("Close", { exact: true }).click();
  await page
    .locator("div")
    .filter({ hasText: /^List Price$/ })
    .first()
    .click();
  await page.locator("div").filter({ hasText: /^AVM$/ }).click();
  await page.getByRole("heading", { name: "Basic Facts" }).click();
  await page
    .getByRole("heading", { name: "Pricing Tools" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Description" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Map" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Property Facts" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Additional Resources" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Listing Agent" })
    .getByRole("paragraph")
    .click();
  await page
    .getByText("Interior Features Interior Features Expand card Collapse card")
    .click();
  await page
    .getByRole("heading", { name: "Exterior Features" })
    .getByRole("paragraph")
    .click();
  await page
    .getByText("Listing Details Listing Details Expand card Collapse card")
    .click();
  await page
    .getByRole("heading", { name: "Legal Description" })
    .getByRole("paragraph")
    .click();
  await page.getByRole("heading", { name: "Schools" }).click();
  await page.getByRole("button", { name: " Photos" }).click();
  await page.getByRole("button", { name: " Street" }).click();
  await page.getByRole("button", { name: " Satellite" }).click();
  await page.getByRole("button", { name: " Historical" }).click();
  await page.getByLabel("Close", { exact: true }).click();
  await page.locator("div").filter({ hasText: /^AVM$/ }).click();
  await page.getByRole("heading", { name: "Basic Facts" }).click();
  await page
    .getByRole("heading", { name: "Pricing Tools" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Description", exact: true })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Map" })
    .getByRole("paragraph")
    .click();
  await page.getByRole("heading", { name: "Property Facts" }).click();
  await page
    .getByRole("heading", { name: "Property Facts" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Additional Resources" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Interior Features" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Listing Agent" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Exterior Features" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Listing Details" })
    .getByRole("paragraph")
    .click();
  await page.getByRole("heading", { name: "Legal Description" }).click();
  await page
    .getByRole("heading", { name: "Financing Terms" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Schools" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Owner Facts" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Listing History" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Public Record History" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Sales and Financing Activity" })
    .getByRole("paragraph")
    .click();
  await page
    .getByRole("heading", { name: "Estimated Value" })
    .getByRole("paragraph")
    .click();
});
