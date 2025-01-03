export const searchResultHeader = {
  buttonView: "//button[@title='View']",
};

export const searchResultGrid = {
  firtResultAdress:
    "//div[@class='search-grid column-content ng-star-inserted']/rpr-property-row-view[@class='align-items-center columns is-gapless is-mobile ng-star-inserted'][1]/div[@class='column address address-column ng-star-inserted']/a[@href]",
  testFirtResultAdress:
    "//div[@class='search-grid column-content ng-star-inserted']/rpr-property-row-view[@class][2]/div[@class='column address address-column ng-star-inserted']/a[@href]",
  propertyAddressLink: "//a[contains(text(),'Address')]",
  multipleListings:
    "//rpr-feature-tag[contains(text(),'NEW')]/following-sibling::div/a[contains(text(),' Multiple Listings')]/../../following-sibling::div/a[contains(text(),'Address')]",
};
