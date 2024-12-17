export const propertyHeader = {
  streetAddress: "//span[contains(@class, 'street-address')]",
  cityStateZip: "//span[contains(@class, 'city-state-zip')]",
};

export const summary = {
  listingId:
    "//div[@class='label'][contains(text(),'Listing ID')]/following-sibling::div[@class='value']",
};

export const legalDescription = {
  county: "//div[contains(text(),'County')]//following-sibling::div/span",
};
