
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
  seeall?: string;
  noApplicationsFound?: string;
  applications?: string;
  common?: {
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
  resultStatusDescription?: string;
  validityDaysDescription?: string;
  validityDaysPlaceholder?: string;
  captchaTitle?: string;
  captchaDescription?: string;
}
