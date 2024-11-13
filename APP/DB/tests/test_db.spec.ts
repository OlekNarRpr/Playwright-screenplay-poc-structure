import { expect, test } from "@playwright/test";
import { getPropertyByPropertyId } from "../helpers/testDb";
import property from "../data/propertyDetails.json";

test("Validate property details @L2", async () => {
  let expectedPropertyDetails = property;
  let propertyId = 1234;
  let propertyDetails = await getPropertyByPropertyId(propertyId);

  expect
    .soft(propertyDetails[0].avaliable)
    .toEqual(expectedPropertyDetails.avaliable);
  expect.soft(propertyDetails[0].name).toEqual(expectedPropertyDetails.name);
  expect.soft(propertyDetails[0].price).toEqual(expectedPropertyDetails.price);
  expect.soft(propertyDetails[0].state).toEqual(expectedPropertyDetails.state);
});
