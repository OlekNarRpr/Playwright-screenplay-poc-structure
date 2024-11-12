import { Task } from "@testla/screenplay-playwright";
import { IActor } from "@testla/screenplay/lib/interfaces";
import { Page } from "@playwright/test";
import { login } from "../locators/login_page";

export class Login extends Task {
  private page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
  }

  public async performAs(actor: IActor): Promise<void> {
    await this.page.goto("");
    await this.page.locator(login.emailInput).click();
    await this.page.fill(login.emailInput, actor.states("email"));
    await this.page.locator(login.passwordInput).click();
    await this.page.fill(login.passwordInput, actor.states("password"));
    await this.page.locator(login.signInBtn).click();
  }

  public static toWebsite(page: Page): Login {
    return new Login(page);
  }
}

export class SeeLoginFailed extends Task {
  private page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
  }

  public async performAs(): Promise<void> {
    await this.page.waitForSelector(login.errorText);
  }

  public static errorMessage(page: Page): SeeLoginFailed {
    return new SeeLoginFailed(page);
  }
}
