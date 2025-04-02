import { TableTranslations, ReviewTranslations, PaginationTranslations, PurposeTranslations, CountryTranslations, FormTranslations } from '@/types/interfaces';

// Define a type that allows both string values and specific interfaces
type TranslationType = {
  [key: string]: string | TableTranslations | ReviewTranslations | PaginationTranslations | PurposeTranslations | CountryTranslations | FormTranslations;
  table: TableTranslations;
  review: ReviewTranslations;
  pagination: PaginationTranslations;
  purposes: PurposeTranslations;
  countries: CountryTranslations;
  form: FormTranslations;
};

export const en: TranslationType = {
  // General
  "appName": "Visa Tracker Turkey",
  "home": "Home",
  "submitApplication": "Submit Application",
  "reviewEntries": "Review Entries",
  "discussions": "Discussions",
  "seeAllData": "See All Data",
  "madeWith": "made with",
  
  // Hero
  "hero.title": "Tracking Visa Application Experiences Together",
  "hero.subtitle": "This platform documents the visa application process and timelines experienced by Turkish citizens. By sharing our collective experiences, we hope to bring transparency to the process and advocate for fair treatment.",
  "hero.crowdsourced": "Crowdsourced Data",
  "hero.realExperiences": "Real Experiences",
  "hero.transparentProcess": "Transparent Process",
  
  // Dashboard
  "dashboard.title": "Applications From Community",
  "dashboard.allCountries": "All Countries",
  "dashboard.totalApplications": "Total Applications",
  "dashboard.avgProcessingTime": "Avg. Processing Time",
  "dashboard.approvalRate": "Approval Rate",
  "dashboard.latestApplication": "Latest Application",
  "dashboard.lastupdated": "Last updated",
  "dashboard.processingTime": "Processing Time",
  "dashboard.processingTimeDesc": "Days from application submission to passport return",
  "dashboard.applicationResults": "Application Results",
  "dashboard.applicationResultsDesc": "Distribution of visa application outcomes",
  "dashboard.days": "Days",
  "dashboard.approved": "Approved",
  "dashboard.rejected": "Rejected",
  "dashboard.pending": "Pending",
  "dashboard.worstCities": "Longest Wait Times",
  
  // Trends
  "trends.title": "Waiting Times in Last 3 Months",
  "trends.subtitle": "Average waiting time for visa applications (in days)",
  "trends.worstCities": "Longest Waiting Times",
  
  // Financial
  "financial.title": "Financial Impact",
  "financial.subtitle": "Economic impact of visa applications",
  "financial.applications": "Annual Applications",
  "financial.cost": "Total Annual Cost",
  "financial.breakdown": "Cost Breakdown",
  "financial.visaFee": "Visa Fee",
  "financial.serviceFee": "Service Fee",
  "financial.otherCosts": "Other Costs",
  "financial.perVisit": "Total Per Person",
  
  // Recent Applications
  "recentApplications.title": "Recent Applications",
  "recentApplications.submit": "Submit Your Experience",
  "recentApplications.community": "Community Applications",
  "recentApplications.noApplications": "No applications yet",
  "recentApplications.beFirst": "Be the first to share your visa application experience",
  "recentApplications.submitApplication": "Submit Application",
  "recentApplications.last10": "Last 10 Applications",
  
  // Submit Page
  "submit.title": "Share Your Visa Experience",
  "submit.subtitle": "Help other Turkish citizens by sharing your visa application experience. Your contribution makes the process more transparent for everyone.",
  
  // Facts Page
  "facts": "Facts",
  "facts.title": "Visa Facts",
  "facts.subtitle": "Important facts, comparisons, and requirements for understanding visa application processes",
  "facts.general": "General Information",
  "facts.schengen": "Schengen Area",
  "facts.comparison": "Comparisons",
  "facts.fees": "Visa Fees",
  "facts.visaRequirements": "Visa Requirements",
  "facts.visaRequirementsDesc": "Visa requirements for Turkish citizens with an ordinary (burgundy) passport",
  "facts.visaTableCaption": "Visa requirements for Turkish citizens",
  "facts.country": "Country",
  "facts.requiresVisa": "Requires Visa",
  "facts.processingTime": "Processing Time",
  "facts.notes": "Notes",
  "facts.schengenRules": "Schengen Rules Apply",
  "facts.separateApplication": "Separate Application",
  "facts.longProcessing": "Long Processing Time",
  "facts.electronicVisa": "Electronic Visa",
  "facts.yes": "Yes",
  "facts.no": "No",
  "facts.days": "days",
  "facts.schengenFacts": "About Schengen Area",
  "facts.schengenFactsDesc": "Information about the Schengen area and visa rules for Turkish citizens",
  "facts.schengenMembers": "Schengen Member Countries",
  "facts.schengenRule1": "Visa subject to 90/180 day rule",
  "facts.schengenRule2": "One visa allows travel to all member states",
  "facts.schengenRule3": "Application must be made to main destination country",
  "facts.schengenRule4": "No work permit with type C short-stay visa",
  "facts.schengenVisaFree": "Visa-Free Countries",
  "facts.schengenVisaFreeDesc": "Citizens of the following countries can enter the Schengen area without a visa:",
  "facts.comparisonTitle": "Country Comparison",
  "facts.comparisonDesc": "Comparison of visa requirements for countries with various attributes",
  "facts.aspect": "Aspect",
  "facts.turkey": "Turkey",
  "facts.venezuela": "Venezuela",
  "facts.russia": "Russia",
  "facts.georgia": "Georgia",
  "facts.northMacedonia": "North Macedonia",
  "facts.moldova": "Moldova",
  "facts.southKorea": "South Korea",
  "facts.malaysia": "Malaysia",
  "facts.schengenVisa": "Schengen Visa",
  "facts.schengenFee": "Schengen Visa Fee",
  "facts.ukVisa": "UK Visa",
  "facts.usVisa": "US Visa",
  "facts.visaFreeCountries": "Visa-Free Countries",
  "facts.required": "Required",
  "facts.notRequired": "Not Required",
  "facts.keyDifferences": "Key Differences",
  "facts.venezuelaFact": "Venezuela - Schengen Exemption",
  "facts.venezuelaFactDesc": "Venezuelan citizens have enjoyed visa-free access to the Schengen area since 2015, despite economic challenges.",
  "facts.russiaFact": "Russia - Fee Increase",
  "facts.russiaFactDesc": "Before the war in Ukraine, Russian citizens paid 35€, but after February 2022, this was increased to 90€.",
  "facts.turkeyFact": "Turkey - Standard Fees",
  "facts.turkeyFactDesc": "Turkish citizens have paid the standard 90€ visa fee for many years with strict document scrutiny.",
  "facts.georgiaFact": "Georgia - Close EU Relations",
  "facts.georgiaFactDesc": "Georgian citizens have enjoyed visa-free access to the Schengen area since 2017, as part of closer relations with the EU.",
  "facts.southKoreaFact": "South Korea - Extensive Visa-Free Travel",
  "facts.southKoreaFactDesc": "The South Korean passport is one of the most powerful in the world, with citizens able to travel visa-free to over 190 countries.",
  "facts.malaysiaFact": "Malaysia - Strong Visa Advantages",
  "facts.malaysiaFactDesc": "Malaysian passport holders can travel visa-free or with visa-on-arrival to over 170 countries, as a majority-Muslim country.",
  "facts.visaFees": "Visa Fees",
  "facts.visaFeesDesc": "Visa fees paid by Turkish citizens when applying to different countries",
  "facts.destination": "Destination",
  "facts.fee": "Fee",
  "facts.unitedKingdom": "United Kingdom",
  "facts.unitedStates": "United States",
  "facts.canada": "Canada",
  "facts.australia": "Australia",
  "facts.standardFee": "Standard fee",
  "facts.ukFeeDesc": "Varies by visa type",
  "facts.usFeeDesc": "Application fee, non-refundable",
  "facts.canadaFeeDesc": "Includes biometric registration",
  "facts.australiaFeeDesc": "Electronic visa fee",
  "facts.historicalChanges": "Historical Fee Changes",
  "facts.historicalChangesDesc": "Changes in Schengen visa fees over the years:",
  "facts.fee2014": "2014: Standard visa fee was 60€",
  "facts.fee2020": "2020: Fee increased to 80€",
  "facts.fee2022": "2022: Fee for Russians increased from 35€ to 90€",
  "facts.allSchengenCountries": "All Schengen countries",
  "facts.turkeyRepublic": "Republic of Turkey",
  "facts.idCardTravel": "ID card travel",
  "facts.noVisaRequired": "No visa required",
  "facts.visaOnArrival": "Visa on arrival",
  "facts.eVisa": "Electronic visa",
  "facts.visaAvailableBoth": "Visa available both on arrival and online",
  "facts.visaRequired": "Visa required",
  
  // Footer
  "footer.rights": "All rights reserved.",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Service",
  "footer.contact": "Contact",
  
  // Language Selection
  "language": "Language",
  "language.turkish": "Türkçe",
  "language.english": "English",
  "language.german": "Deutsch",
  
  // Cookie and Analytics
  "cookies.title": "Cookie Notice",
  "cookies.description": "This website uses cookies to enhance your browsing experience.",
  "cookies.accept": "Accept",
  "cookies.decline": "Decline",
  "cookies.preferences": "Preferences",
  "cookies.privacy": "Privacy Policy",
  "cookies.necessary": "Necessary Cookies",
  "cookies.analytics": "Analytics Cookies",
  "cookies.marketing": "Marketing Cookies",
  "cookies.acceptSelected": "Accept Selected",
  "cookies.acceptAll": "Accept All",
  "cookies.close": "Close",
  
  // Actions
  "actions.title": "What Can We Do?",
  "actions.subtitle": "Collective actions to advocate for fair visa policies",
  "actions.disclaimer.title": "Important Note",
  "actions.disclaimer.text": "The suggestions below are meant to be peaceful and legal ways to advocate for change. Always ensure your actions comply with local laws.",
  
  "actions.diaspora.title": "Engage with Turkish Diaspora",
  "actions.diaspora.description": "Leverage the influence of Turkish communities abroad",
  "actions.diaspora.point1": "Contact Turkish citizens living abroad to raise awareness with their local representatives",
  "actions.diaspora.point2": "Organize peaceful demonstrations in countries where Turkish communities are present",
  "actions.diaspora.point3": "Create petitions through diaspora organizations",
  
  "actions.tourism.title": "Alternative Tourism",
  "actions.tourism.description": "Consider alternative destinations for tourism and business",
  "actions.tourism.point1": "Explore visa-free countries or those with easier visa processes",
  "actions.tourism.point2": "Support countries that maintain fair visa policies for Turkish citizens",
  "actions.tourism.point3": "Share positive experiences from alternative destinations",
  
  "actions.awareness.title": "Raise Awareness",
  "actions.awareness.description": "Share information and experiences",
  "actions.awareness.point1": "Document and share visa rejection stories on social media",
  "actions.awareness.point2": "Contact journalists and media outlets to cover visa issues",
  "actions.awareness.point3": "Create content highlighting the impact on families and businesses",
  
  "actions.legal.title": "Legal Advocacy",
  "actions.legal.description": "Support legal initiatives for fair treatment",
  "actions.legal.point1": "Support organizations challenging discriminatory visa practices",
  "actions.legal.point2": "Document cases of unfair treatment for potential legal action",
  "actions.legal.point3": "Advocate for reciprocal visa policies through legal channels",
  
  "actions.alternatives.title": "Alternative Destinations",
  "actions.alternatives.description": "Consider these countries with more favorable visa policies for Turkish citizens:",
  
  "actions.contact.title": "Get Involved",
  "actions.contact.description": "Want to contribute to this initiative? Contact us with your ideas and suggestions.",
  "actions.contact.email": "Send us an email",
  
  "discussion.community": "Community Discussions",
  "discussion.title": "Community Discussions",
  "discussion.subtitle": "Share your visa experiences and questions with other members",
  "discussion.description": "This platform provides a space to share your experiences with the visa process and ask questions.",
  
  // Table translations
  table: {
    country: "Country",
    city: "City",
    purpose: "Purpose",
    submissionDate: "Submission Date",
    appointmentDate: "Appointment Date",
    returnDate: "Return Date",
    processingTime: "Processing Time",
    result: "Result",
    days: "Days",
    approved: "Approved",
    rejected: "Rejected",
    pending: "Pending",
    caption: "Recent Visa Application Results"
  },
  
  // Review translations
  review: {
    title: "Review Entries",
    subtitle: "Explore visa application experiences submitted by the community",
    search: "Search",
    searchPlaceholder: "Search country or purpose...",
    filterCountry: "Filter by Country",
    selectCountry: "Select country",
    allCountries: "All Countries",
    allPurposes: "All Purposes",
    sortBy: "Sort by",
    newestFirst: "Newest First",
    oldestFirst: "Oldest First",
    noResults: "No results found",
    tryAdjusting: "Try adjusting your filters",
    clearFilters: "Clear Filters",
    cards: "Cards",
    table: "Table",
    gdpPerCapita: "GDP Per Capita",
    population: "Population",
    seeall: "See All",
    noApplicationsFound: "No applications found",
    applications: "Applications",
    common: {
      refresh: "Refresh"
    }
  },
  
  // Pagination translations
  pagination: {
    rowsPerPage: "Rows per page",
    showing: "Showing",
    of: "of"
  },
  
  // Purpose translations
  purposes: {
    tourism: "Tourism",
    business: "Business",
    familyReunification: "Family Reunification",
    visit: "Visit",
    transit: "Transit",
    study: "Study",
    work: "Work",
    medical: "Medical",
    other: "Other"
  },
  
  // Country translations
  countries: {
    germany: "Germany",
    france: "France",
    italy: "Italy",
    spain: "Spain",
    unitedkingdom: "United Kingdom",
    portugal: "Portugal",
    greece: "Greece",
    austria: "Austria",
    switzerland: "Switzerland",
    netherlands: "Netherlands",
    belgium: "Belgium",
    sweden: "Sweden",
    denmark: "Denmark",
    finland: "Finland",
    norway: "Norway",
    ireland: "Ireland",
    poland: "Poland",
    czechrepublic: "Czech Republic",
    hungary: "Hungary",
    croatia: "Croatia",
    bulgaria: "Bulgaria",
    romania: "Romania",
    unitedstates: "United States",
    canada: "Canada",
    australia: "Australia",
    newzealand: "New Zealand",
    estonia: "Estonia",
    latvia: "Latvia",
    lithuania: "Lithuania",
    luxembourg: "Luxembourg",
    malta: "Malta",
    slovakia: "Slovakia",
    slovenia: "Slovenia",
    iceland: "Iceland",
    liechtenstein: "Liechtenstein",
    argentina: "Argentina",
    georgia: "Georgia",
    bosniaandherzegovina: "Bosnia and Herzegovina",
    southafrica: "South Africa",
    venezuela: "Venezuela",
    russia: "Russia",
    malaysia: "Malaysia",
    moldova: "Moldova",
    northmacedonia: "North Macedonia",
    turkey: "Turkey",
    southkorea: "South Korea"
  },
  
  // Form translations
  form: {
    detailsTitle: "Application Details",
    detailsDescription: "Share the basic information about your visa application",
    country: "Country",
    selectCountry: "Select country",
    countryDescription: "The country you applied for a visa to",
    city: "City",
    selectCity: "Select city",
    cityDescription: "The location of the consulate or embassy where you applied",
    duration: "Duration of Visit (days)",
    durationPlaceholder: "e.g. 12 days",
    durationDescription: "Number of days requested for the visa",
    purpose: "Purpose of Visit",
    selectPurpose: "Select purpose",
    purposeDescription: "The main reason for the visa application",
    submitDate: "Submission Date",
    pickDate: "Pick a date",
    submitDateDescription: "Date when all documents and application were submitted",
    appointmentDateQuestion: "Is the appointment date the same as the submission date?",
    sameAsSubmitDate: "Yes, same date",
    differentDate: "No, different date",
    sameAppointmentDate: "Same appointment date",
    sameAppointmentDateDescription: "The appointment date is the same as the submission date",
    appointmentDate: "Appointment Date",
    appointmentDateDescription: "Date of your appointment for fingerprints and document check",
    resultStatus: "Result Status",
    selectResultStatus: "Select result",
    resultDescription: "The final outcome of your visa application",
    validity: "Validity Period",
    validityPlaceholder: "e.g. 90 days, 1 year",
    validityDescription: "Duration of the visa validity",
    entryType: "Entry Type",
    selectEntryType: "Select entry type",
    entryTypeDescription: "Whether the visa allows single or multiple entries",
    rejectionReason: "Rejection Reason",
    rejectionReasonPlaceholder: "Rejection reason (optional)",
    rejectionDescription: "The reason your visa application was rejected (if applicable)",
    successMessage: "Application submitted successfully",
    successDescription: "Thank you for sharing your visa experience",
    errorMessage: "An error occurred while submitting your application",
    submitting: "Submitting...",
    submit: "Submit",
    next: "Next",
    back: "Back",
    resultTitle: "Result Information",
    resultStatusDescription: "The result of your visa application",
    validityDaysDescription: "The period for which the visa is valid",
    validityDaysPlaceholder: "e.g. 90 days, 1 year",
    captchaTitle: "Robot Check",
    captchaDescription: "Please verify that you are not a robot",
    pleaseCompleteAllFields: "Please complete all required fields",
    captchaRequired: "Please verify that you are not a robot",
    singleEntry: "Single Entry",
    multipleEntry: "Multiple Entry"
  }
};
