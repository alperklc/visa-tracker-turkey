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
}

export enum PurposeOfVisit {
  Tourism = "Tourism",
  Business = "Business",
  FamilyReunification = "Family Reunification",
  Visit = "Visit",
  Study = "Study",
  Work = "Work",
  Transit = "Transit",
  Medical = "Medical",
  Other = "Other"
}

export enum ApplicationCenterCity {
  Istanbul = "Istanbul",
  Ankara = "Ankara",
  Izmir = "Izmir",
  Antalya = "Antalya",
  Bodrum = "Bodrum",
  Gaziantep = "Gaziantep",
}

export enum VisaResultStatus {
  Approved = "Approved",
  Rejected = "Rejected",
  Pending = "Pending"
}

export enum EntryType {
  Single = "Single",
  Multiple = "Multiple"
}

export type Language = "tr" | "en" | "de";

export type VisaApplication = {
  id: string;
  country: Country;
  city: ApplicationCenterCity;
  durationOfVisit: string; // In days or months
  purposeOfVisit: PurposeOfVisit;
  applicationSubmitDate: Date;
  idataReplyDate: Date | null;
  appointmentDate: Date | null;
  passportReturnDate: Date | null;
  result: VisaResult | null;
  createdAt: Date;
};

export type VisaResult = {
  status: VisaResultStatus;
  validity?: string; // e.g. "90 days", "6 months"
  entryType?: EntryType;
  rejectionReason?: string;
};

export type ApplicationStats = {
  totalApplications: number;
  byCountry: Record<Country, number>;
  averageProcessingDays: number;
  approvalRate: number;
  citiesProcessingTime: Array<{city: string, days: number}>;
  trendsLastThreeMonths: Array<{month: string, averageDays: number}>;
  totalAnnualApplications: number;
  totalAnnualCost: number; // in Euros
  worstCities: Array<{city: string, days: number}>;
};

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

export interface TableTranslations {
  country: string;
  city: string;
  purpose: string;
  submissionDate: string;
  appointmentDate: string;
  returnDate: string;
  processingTime: string;
  result: string;
  days: string;
  approved: string;
  rejected: string;
  pending: string;
  caption: string;
}

export interface ReviewTranslations {
  title: string;
  subtitle: string;
  search: string;
  searchPlaceholder: string;
  filterCountry: string;
  selectCountry: string;
  allCountries: string;
  allPurposes: string;
  sortBy: string;
  newestFirst: string;
  oldestFirst: string;
  noResults: string;
  tryAdjusting: string;
  clearFilters: string;
  cards: string;
  table: string;
}

export interface PaginationTranslations {
  rowsPerPage: string;
  showing: string;
  of: string;
}

export interface PurposeTranslations {
  tourism: string;
  business: string;
  familyReunification: string;
  visit: string;
  transit: string;
  study: string;
  work: string;
  medical: string;
  other: string;
}
