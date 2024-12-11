import { expect, Page } from "@playwright/test";
import { Question } from "@testla/screenplay-playwright";

export class AreCorrecCardsShown extends Question<boolean> {
  private page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
  }

  public async answeredBy(): Promise<boolean> {
    //necessary in order to fully load the Property Information page
    await this.page.waitForLoadState("networkidle");
    for (var i = 0; i < 3000; i = i + 100) {
      await this.page.mouse.wheel(i, i + 100);
      await this.page.waitForLoadState("domcontentloaded");
    }

    await expect
      .soft(this.page.getByRole("button", { name: "Photos" }))
      .toBeVisible();
    await expect
      .soft(this.page.getByRole("button", { name: "Street" }))
      .toBeVisible();
    await expect
      .soft(this.page.getByRole("button", { name: "Satellite" }))
      .toBeVisible();
    await expect
      .soft(this.page.getByRole("button", { name: "Historical" }))
      .toBeVisible();
    await expect
      .soft(
        this.page
          .locator("div")
          .filter({ hasText: /^List Price$/ })
          .first()
      )
      .toBeVisible();
    await expect
      .soft(this.page.locator("div").filter({ hasText: /^AVM$/ }))
      .toBeVisible();
    await expect
      .soft(this.page.getByRole("heading", { name: "Basic Facts" }))
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Pricing Tools" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Description", exact: true })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page.getByRole("heading", { name: "Map" }).getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Property Facts" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Additional Resources" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Listing Agent" })
          .getByRole("paragraph")
      )
      .toBeVisible();

    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Interior Features" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Exterior Features" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Listing Details" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Financing Terms" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Legal Description" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Schools" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Listing History" })
          .getByRole("paragraph")
      )
      .toBeVisible();

    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Public Record History" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Sales and Financing Activity" })
          .getByRole("paragraph")
      )
      .toBeVisible();
    await expect
      .soft(
        this.page
          .getByRole("heading", { name: "Estimated Value" })
          .getByRole("paragraph")
      )
      .toBeVisible();

    return Promise.resolve(true);
  }

  public static atPropertyInformationPage(page: Page): AreCorrecCardsShown {
    return new AreCorrecCardsShown(page);
  }
}
