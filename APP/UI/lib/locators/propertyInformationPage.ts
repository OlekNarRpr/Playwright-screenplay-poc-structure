export const propertyHeader = {
  propertyInformationText: "//div[contains(text(),'Property Information')]",
  streetAddress: "//span[contains(@class, 'street-address')]",
  cityStateZip: "//span[contains(@class, 'city-state-zip')]",
};

export const summary = {
  statusType:
    "//div[@class='summary']/rpr-property-details-summary-panel/div/div/div/div/div[contains(@class, 'status')]",
  closedPrice:
    "//div[contains(text(),'Closed Price')]/../following-sibling::div[contains(@class,'price')]/span",
  listPrice:
    "//div[contains(text(),'List Price')]/../following-sibling::div[contains(@class,'price')]/span",
  listingId:
    "//div[@class='label'][contains(text(),'Listing ID')]/following-sibling::div[@class='value']",
  beds: "//i[@aria-label='Bedrooms']/../following-sibling::span[@class='value']",
  baths:
    "//i[@aria-label='Bathrooms']/../following-sibling::span[@class='value']",
  livingArea:
    "//i[@aria-label='Living Area']/../following-sibling::span[@class='value']",
  lotSize:
    "//i[@aria-label='Lot Size']/../following-sibling::span[@class='value']",
  units:
    "//i[@aria-label='# of Units']/../following-sibling::span[@class='value']",
  zoning:
    "//i[@aria-label='Zoning']/../following-sibling::div[@class='value break-word']",
  yearBuilt:
    "//i[@aria-label='Year Built']/../following-sibling::span[@class='value']",
};

export const basicFacts = {
  basicFactsText: "//div/h1[contains(text(), 'Basic Facts')]",
  yearBuilt:
    "//li[contains(@class, 'basic-fact')]/div[contains(text(),'Year Built')]/following-sibling::div/span",
  zoning:
    "//li[contains(@class, 'basic-fact')]/div[contains(text(),'Zoning')]/following-sibling::div/span",
  daysInRpr:
    "//li[contains(@class, 'basic-fact')]/div[contains(text(),'Days in RPR')]/following-sibling::div/span",
  priceBySqft:
    "//li[contains(@class, 'basic-fact')]/div[contains(text(),'Price by SqFt')]/following-sibling::div/span",
  ownerName:
    "//li[contains(@class, 'basic-fact')]/div[contains(text(),'Owner Name')]/following-sibling::div/span",
  propertyType:
    "//li[contains(@class, 'basic-fact')]/div[contains(text(),'Type')]/following-sibling::div/span",
  landUse:
    "//li[contains(@class, 'basic-fact')]/div[contains(text(),'Land Use')]/following-sibling::div/span",
  numberOfBuildings:
    "//li[contains(@class, 'basic-fact')]/div[contains(text(),'Number of Buildings')]/following-sibling::div/span",
};

export const legalDescription = {
  county: "//div[contains(text(),'County')]/following-sibling::div/span",
};

export const listingDetails = {
  listingId: "//div[contains(text(),'Listing ID')]/following-sibling::div/span",
  listingSource:
    "//div[contains(text(),'Listing Source')]/following-sibling::div/span",
  developmentStatus:
    "//div[contains(text(),'Development Status')]/following-sibling::div/span",
  showingInstructions:
    "//div[contains(text(),'Showing Instructions')]/following-sibling::div/span",
  listingAgreement:
    "//div[contains(text(),'Listing Agreement')]/following-sibling::div/span",
  occupant: "//div[contains(text(),'Occupant')]/following-sibling::div/span",
};
