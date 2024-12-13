import { test } from "@playwright/test";
import { Actor } from "@testla/screenplay-playwright";
import { BrowseTheWeb } from "@testla/screenplay-playwright/web";
import { Login } from "../lib/tasks/login_page";
import { IsCorrectErrorShown } from "../lib/questions/login_page";
import { IsCorrecUrlShown } from "../lib/questions/home_page";

test.describe("Login: ", () => {
  test("Validate error message for invalid user @Login", async ({ page }) => {
    const invalidMember = Actor.named("Invalid member")
      .with("email", process.env.INVALID_USER)
      .with("password", process.env.INVALID_PASSWORD)
      .can(BrowseTheWeb.using(page));

    await invalidMember.attemptsTo(Login.toWebsite(page));
    await invalidMember.asks(IsCorrectErrorShown.atLogin(page));
  });

  test("Validate login successful @Login", async ({ page }) => {
    const agentMember = Actor.named("Agent member")
      .with("email", process.env.AGENT_USER)
      .with("password", process.env.AGENT_PASSWORD)
      .can(BrowseTheWeb.using(page));

    await agentMember.attemptsTo(Login.toWebsite(page));
    await agentMember.asks(IsCorrecUrlShown.atHomePage(page));
  });
});
