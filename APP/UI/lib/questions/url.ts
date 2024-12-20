import { expect, Page } from "@playwright/test";
import { Question } from "@testla/screenplay-playwright";

export class IsCorrectOrgIdShown extends Question<boolean> {
  private actualOrgId: string;
  private expectedOrgId: string;

  constructor(actualOrgId: string, expectedOrgId: string) {
    super();
    this.actualOrgId = actualOrgId;
    this.expectedOrgId = expectedOrgId;
  }

  public async answeredBy(): Promise<void> {
    expect.soft(this.actualOrgId).toMatch(this.expectedOrgId);
  }

  public static atUrl(
    actualOrgId: string,
    expectedOrgId: string
  ): IsCorrectOrgIdShown {
    return new IsCorrectOrgIdShown(actualOrgId, expectedOrgId);
  }
}
