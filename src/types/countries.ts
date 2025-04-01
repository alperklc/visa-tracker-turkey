export enum CountryCode {
  DE = "DE", // Germany
  IT = "IT", // Italy
  FR = "FR", // France
  ES = "ES", // Spain
  UK = "UK", // United Kingdom
  GB = "GB", // Great Britain
  PT = "PT", // Portugal
  GR = "GR", // Greece
  AT = "AT", // Austria
  CH = "CH", // Switzerland
  NL = "NL", // Netherlands
  BE = "BE", // Belgium
  SE = "SE", // Sweden
  DK = "DK", // Denmark
  FI = "FI", // Finland
  NO = "NO", // Norway
  IE = "IE", // Ireland
  PL = "PL", // Poland
  CZ = "CZ", // Czech Republic
  HU = "HU", // Hungary
  HR = "HR", // Croatia
  BG = "BG", // Bulgaria
  RO = "RO", // Romania
  US = "US", // United States
  CA = "CA", // Canada
  AU = "AU", // Australia
  NZ = "NZ", // New Zealand
  EE = "EE", // Estonia
  LV = "LV", // Latvia
  LT = "LT", // Lithuania
  LU = "LU", // Luxembourg
  MT = "MT", // Malta
  SK = "SK", // Slovakia
  SI = "SI", // Slovenia
  IS = "IS", // Iceland
  LI = "LI", // Liechtenstein
  AR = "AR", // Argentina
  GE = "GE", // Georgia
  BA = "BA", // Bosnia
  ZA = "ZA", // South Africa
  VE = "VE", // Venezuela
  RU = "RU", // Russia
  MY = "MY", // Malaysia
  TR = "TR", // Turkey
}

export enum Country {
  Germany = "Germany",
  Italy = "Italy",
  France = "France",
  Spain = "Spain",
  UnitedKingdom = "United Kingdom",
  Portugal = "Portugal",
  Greece = "Greece",
  Austria = "Austria",
  Switzerland = "Switzerland",
  Netherlands = "Netherlands",
  Belgium = "Belgium",
  Sweden = "Sweden",
  Denmark = "Denmark",
  Finland = "Finland",
  Norway = "Norway",
  Ireland = "Ireland",
  Poland = "Poland",
  CzechRepublic = "Czech Republic",
  Hungary = "Hungary",
  Croatia = "Croatia",
  Bulgaria = "Bulgaria",
  Romania = "Romania",
  UnitedStates = "United States",
  Canada = "Canada",
  Australia = "Australia",
  NewZealand = "New Zealand",
  Estonia = "Estonia",
  Latvia = "Latvia",
  Lithuania = "Lithuania",
  Luxembourg = "Luxembourg",
  Malta = "Malta",
  Slovakia = "Slovakia",
  Slovenia = "Slovenia",
  Iceland = "Iceland",
  Liechtenstein = "Liechtenstein",
  Argentina = "Argentina",
  Georgia = "Georgia",
  Bosnia = "Bosnia and Herzegovina",
  SouthAfrica = "South Africa",
  Venezuela = "Venezuela",
  Russia = "Russia",
  Malaysia = "Malaysia",
  Turkey = "Turkey",
}

// Country statistics type
export type CountryStats = {
  country: Country;
  democracyIndex: number;
  refugeeCount: number;
  gdpPerCapita: number;
  population: string;
  visaFreeCountries: number;
  needsSchengenVisa: boolean;
  schengenFee?: string;
  needsUKVisa: boolean;
  needsUSVisa: boolean;
};
