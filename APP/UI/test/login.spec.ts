import { test } from "@playwright/test";
import { Actor } from "@testla/screenplay-playwright";
import { BrowseTheWeb } from "@testla/screenplay-playwright/web";
import { Login, SeeLoginFailed } from "../lib/tasks/login_page";
import { IsCorrectErrorShown } from "../lib/questions/login_page";

test("Verify user is able to login @L1", async ({ page }) => {
  const invalidMember = Actor.named("invalid member")
    .with("email", process.env.USER_NAME)
    .with("password", process.env.PASSWORD)
    .can(BrowseTheWeb.using(page));

  await invalidMember.attemptsTo(Login.toWebsite(page));
  await invalidMember.attemptsTo(SeeLoginFailed.errorMessage(page));
  await invalidMember.asks(IsCorrectErrorShown.atLogin(page));
});
