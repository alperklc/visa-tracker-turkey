
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
  gdpPerCapita: string;
  population: string;
  seeall: string;
  noApplicationsFound: string;
  applications: string;
  common: {
    refresh: string;
  };
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

export interface CountryTranslations {
  germany: string;
  italy: string;
  france: string;
  spain: string;
  unitedkingdom: string;
  portugal: string;
  greece: string;
  austria: string;
  switzerland: string;
  netherlands: string;
  belgium: string;
  sweden: string;
  denmark: string;
  finland: string;
  norway: string;
  ireland: string;
  poland: string;
  czechrepublic: string;
  hungary: string;
  croatia: string;
  bulgaria: string;
  romania: string;
  unitedstates: string;
  canada: string;
  australia: string;
  newzealand: string;
  estonia: string;
  latvia: string;
  lithuania: string;
  luxembourg: string;
  malta: string;
  slovakia: string;
  slovenia: string;
  iceland: string;
  liechtenstein: string;
  argentina: string;
  georgia: string;
  bosniaandherzegovina: string;
  southafrica: string;
  venezuela: string;
  russia: string;
  malaysia: string;
  moldova: string;
  northmacedonia: string;
  turkey: string;
  southkorea: string;
}

export interface FormTranslations {
  detailsTitle: string;
  detailsDescription: string;
  country: string;
  selectCountry: string;
  countryDescription: string;
  city: string;
  selectCity: string;
  cityDescription: string;
  duration: string;
  durationPlaceholder: string;
  durationDescription: string;
  purpose: string;
  selectPurpose: string;
  purposeDescription: string;
  submitDate: string;
  pickDate: string;
  submitDateDescription: string;
  appointmentDateQuestion: string;
  sameAsSubmitDate: string;
  differentDate: string;
  sameAppointmentDate: string;
  sameAppointmentDateDescription: string;
  appointmentDate: string;
  appointmentDateDescription: string;
  resultStatus: string;
  selectResultStatus: string;
  resultDescription: string;
  validity: string;
  validityPlaceholder: string;
  validityDescription: string;
  entryType: string;
  selectEntryType: string;
  entryTypeDescription: string;
  rejectionReason: string;
  rejectionReasonPlaceholder: string;
  rejectionDescription: string;
  successMessage: string;
  successDescription: string;
  errorMessage: string;
  submitting: string;
  submit: string;
  next: string;
  back: string;
  resultTitle: string;
  resultStatusDescription: string;
  validityDaysDescription: string;
  validityDaysPlaceholder: string;
  captchaTitle: string;
  captchaDescription: string;
  pleaseCompleteAllFields?: string;
  captchaRequired?: string;
  singleEntry?: string;
  multipleEntry?: string;
}

export interface GeneralTranslations {
  appName: string;
  tagline?: string; // Make tagline optional
  welcome?: string;
  loading: string;
  error: string;
  retry: string;
  cancel: string;
  save: string;
  edit: string;
  delete: string;
  confirm: string;
  search: string;
  filter: string;
  sortBy: string;
  ascending: string;
  descending: string;
  noResults: string;
  backToHome: string;
  menu: string;
  home: string;
  about: string;
  services: string;
  products: string;
  blog: string;
  contactUs: string;
  faq: string;
  login: string;
  register: string;
  logout: string;
  profile: string;
  settings: string;
  notifications: string;
  darkMode: string;
  lightMode: string;
  moreInfo: string;
  readMore: string;
  viewAll: string;
  seeMore: string;
  showLess: string;
  submitApplication: string;
  reviewEntries: string;
  discussions: string;
  seeAllData: string;
  madeWith: string;
}

export interface HeroTranslations {
  title: string;
  subtitle: string;
  crowdsourced: string;
  realExperiences: string;
  transparentProcess: string;
  secondaryButton?: string;
  // Add the additional properties used in Turkish translations
  visaData?: string;
  visaDataSubtitle?: string;
  processingTime?: string;
  processingTimeSubtitle?: string;
  communityDriven?: string;
  communityDrivenSubtitle?: string;
  schengenVisa?: string;
  schengenVisaDescription?: string;
  nationalVisa?: string;
  nationalVisaDescription?: string;
  processingTitle?: string;
}

export interface DashboardTranslations {
  title: string;
  allCountries: string;
  totalApplications: string;
  avgProcessingTime: string;
  approvalRate: string;
  latestApplication: string;
  lastupdated: string;
  processingTime: string;
  processingTimeDesc: string;
  applicationResults: string;
  applicationResultsDesc: string;
  days: string;
  approved: string;
  rejected: string;
  pending: string;
  worstCities: string;
}

export interface FooterTranslations {
  rights: string;
  privacy: string;
  terms: string;
  contact: string;
}

export interface LanguageTranslations {
  language: string;
  turkish: string;
  english: string;
  german: string;
}

export interface CookieTranslations {
  title: string;
  description: string;
  accept: string;
  decline: string;
  preferences: string;
  privacy: string;
  necessary: string;
  analytics: string;
  marketing: string;
  acceptSelected: string;
  acceptAll: string;
  close: string;
}

export interface ActionsTranslations {
  title: string;
  subtitle: string;
  disclaimer: {
    title: string;
    text: string;
  };
  diaspora: {
    title: string;
    description: string;
    point1: string;
    point2: string;
    point3: string;
  };
  tourism: {
    title: string;
    description: string;
    point1: string;
    point2: string;
    point3: string;
  };
  awareness: {
    title: string;
    description: string;
    point1: string;
    point2: string;
    point3: string;
  };
  legal: {
    title: string;
    description: string;
    point1: string;
    point2: string;
    point3: string;
  };
  alternatives: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    description: string;
    email: string;
  };
  shareTitle: string;
  shareDescription: string;
  shareButton: string;
  copyLink: string;
  joinDiscussion: string;
}

export interface DiscussionTranslations {
  community: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface FactsTranslations {
  facts: string;
  title: string;
  subtitle: string;
  general: string;
  schengen: string;
  comparison: {
    aspect: string;
    diplomaticRelations?: string;
    historicalContext?: string;
    title?: string;
    paragraph1?: string;
    subtitle?: string;
  };
  comparisonTitle?: string;
  comparisonDesc?: string;
  fees: string;
  visaRequirements?: string;
  visaRequirementsDesc?: string;
  turkeyRepublic?: string;
  idCardTravel?: string;
  noVisaRequired?: string;
  visaOnArrival?: string;
  eVisa?: string;
  visaAvailableBoth?: string;
  visaRequired?: string;
  destination?: string;
  fee?: string;
  notes?: string;
  visaFees?: string;
  visaFeesDesc?: string;
  allSchengenCountries?: string;
  standardFee?: string;
  unitedKingdom?: string;
  ukFeeDesc?: string;
  unitedStates?: string;
  usFeeDesc?: string;
  canada?: string;
  canadaFeeDesc?: string;
  australia?: string;
  australiaFeeDesc?: string;
  historicalChanges?: string;
  historicalChangesDesc?: string;
  fee2014?: string;
  fee2020?: string;
  fee2022?: string;
  schengenVisa?: string;
  schengenFee?: string;
  visaFreeCountries?: string;
  required?: string;
  notRequired?: string;
}

// Add other interface categories as needed
