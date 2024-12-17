export const propertyHeader = {
  streetAddress: "//span[contains(@class, 'street-address')]",
  cityStateZip: "//span[contains(@class, 'city-state-zip')]",
};

export const summary = {
  listingId:
    "//div[@class='label'][contains(text(),'Listing ID')]/following-sibling::div[@class='value']",
  beds: "//i[@aria-label='Bedrooms']/../following-sibling::span[@class='value']",
  baths:
    "//i[@aria-label='Bathrooms']/../following-sibling::span[@class='value']",
  livingArea:
    "//i[@aria-label='Living Area']/../following-sibling::span[@class='value']",
  lotSize:
    "//i[@aria-label='Lot Size']/../following-sibling::span[@class='value']",
};

export const legalDescription = {
  county: "//div[contains(text(),'County')]//following-sibling::div/span",
};
