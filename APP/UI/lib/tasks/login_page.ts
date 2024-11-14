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
    await this.page.fill(login.emailInput, actor.states("email"));
    await this.page.fill(login.passwordInput, actor.states("password"));
    await this.page.locator(login.signInBtn).click();
  }

  public static toWebsite(page: Page): Login {
    return new Login(page);
  }
}

export class PlaywrightLogin extends Task {
  private page: Page;

  constructor(page: Page) {
    super();
    this.page = page;
  }

  public async performAs(actor: IActor): Promise<void> {
    await this.page.goto("");
    await this.page
      .getByPlaceholder("e.g. user@gmail.com")
      .fill(actor.states("email"));
    await this.page
      .getByPlaceholder("Case Sensitive")
      .fill(actor.states("password"));
    await this.page.getByRole("button", { name: "Sign In" }).click();
  }

  public static toWebsite(page: Page): PlaywrightLogin {
    return new PlaywrightLogin(page);
  }
}
