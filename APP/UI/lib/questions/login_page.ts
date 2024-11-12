import { expect, Page } from "@playwright/test";
import { Question } from "@testla/screenplay-playwright";
import { login } from "../locators/login_page";

export class IsCorrectErrorShown extends Question<boolean> {
  private page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
  }

  public async answeredBy(): Promise<boolean> {
    var expected_error =
      'Login failed. Please check your email or password and try again. Hint: Click the "Show" button to see what you typed.';
    var errorMessage: string = await this.page
      .locator(login.errorText)
      .innerText();
    errorMessage = errorMessage.replace(/\n/g, " ");
    expect(errorMessage).toEqual(expected_error);
    return Promise.resolve(true);
  }

  public static atLogin(page: Page): IsCorrectErrorShown {
    return new IsCorrectErrorShown(page);
  }
}
