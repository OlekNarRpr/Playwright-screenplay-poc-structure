export interface PropertyData {
  searchType?: string;
  address?: string;
  listingId?: string;
  summaryAnfBasicFacts?: SummaryAndBasicFacts;
}

export interface SummaryAndBasicFacts {
  status?: string;
  type?: string;
  listPrice?: number;
  beds?: number;
  baths?: number;
  livingArea?: number;
  lotSize?: number;
  yearBuilt?: number;
  units?: number;
  zoning?: string;
  listingId?: string;

  daysOnRpr?: number;
  priceBySqft?: number;
  ownerName?: string;
  propertyType?: string;
  landUse?: string;
  numberOfBuildings?: number;
}
