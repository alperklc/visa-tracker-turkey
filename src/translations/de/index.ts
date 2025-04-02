
// Import individual translation modules
// For now, this is a placeholder. In a real implementation,
// this would have all modules like the English version.

// This structure allows the application to continue functioning
// while we gradually refactor the German translations
export const de = {
  // Basic translations to keep the app functioning
  appName: "Visa-Tracker Türkei",
  madeWith: "gemacht mit Liebe",
  
  // Match the structure of the English translations
  hero: {
    title: "Visa-Antragserfahrungen gemeinsam verfolgen",
    subtitle: "Diese Plattform dokumentiert den Visaantragsprozess und die Zeitpläne türkischer Staatsbürger. Durch das Teilen unserer gemeinsamen Erfahrungen hoffen wir, Transparenz in den Prozess zu bringen und eine faire Behandlung zu fördern.",
    crowdsourced: "Gemeinschaftliche Daten",
    realExperiences: "Echte Erfahrungen",
    transparentProcess: "Transparenter Prozess"
  },
  
  dashboard: {
    title: "Aktuelle Statistiken",
    allCountries: "Alle Länder",
    totalApplications: "Gesamtanträge",
    avgProcessingTime: "Durchschn. Bearbeitungszeit",
    approvalRate: "Genehmigungsrate",
    latestApplication: "Neuester Antrag",
    lastupdated: "Zuletzt aktualisiert",
    processingTime: "Bearbeitungszeit",
    processingTimeDesc: "Tage von der Antragseinreichung bis zur Passrückgabe",
    applicationResults: "Antragsergebnisse",
    applicationResultsDesc: "Verteilung der Visaantragsergebnisse",
    days: "Tage",
    approved: "Genehmigt",
    rejected: "Abgelehnt",
    pending: "In Bearbeitung",
    worstCities: "Längste Wartezeiten"
  },
  
  table: {
    country: "Land",
    city: "Stadt",
    purpose: "Zweck",
    submissionDate: "Einreichungsdatum",
    appointmentDate: "Termindatum",
    returnDate: "Rückgabedatum",
    processingTime: "Bearbeitungszeit",
    result: "Ergebnis",
    days: "Tage",
    approved: "Genehmigt",
    rejected: "Abgelehnt",
    pending: "In Bearbeitung",
    caption: "Aktuelle Visaantragsergebnisse"
  },
  
  review: {
    title: "Alle Visumanträge überprüfen",
    subtitle: "Sehen Sie sich die Erfahrungen anderer Antragsteller an.",
    search: "Suche",
    searchPlaceholder: "Land oder Zweck suchen...",
    filterCountry: "Nach Land filtern",
    selectCountry: "Land auswählen",
    allCountries: "Alle Länder",
    allPurposes: "Alle Zwecke",
    sortBy: "Sortieren nach",
    newestFirst: "Neueste zuerst",
    oldestFirst: "Älteste zuerst",
    noResults: "Keine Ergebnisse gefunden",
    tryAdjusting: "Versuchen Sie, Ihre Filter anzupassen",
    clearFilters: "Filter löschen",
    cards: "Karten",
    table: "Tabelle",
    gdpPerCapita: "BIP pro Kopf",
    population: "Bevölkerung",
    seeall: "Alle anzeigen",
    noApplicationsFound: "Keine Anträge gefunden",
    applications: "Anträge",
    common: {
      refresh: "Aktualisieren"
    }
  },
  
  submit: {
    title: "Visumantragsdetails einreichen",
    subtitle: "Teilen Sie Ihre Erfahrungen mit der Community."
  },
  
  recentApplications: {
    community: "Community-Anträge",
    submit: "Antrag einreichen",
    noApplications: "Noch keine Anträge vorhanden",
    beFirst: "Seien Sie der Erste, der Antragsdaten teilt",
    submitApplication: "Antrag einreichen"
  },
  
  discussions: {
    title: "Community-Diskussionen",
    subtitle: "Teilen Sie Ihre Gedanken und Erfahrungen mit anderen.",
    community: "Community-Forum",
    description: "Diskutieren Sie über Visaanträge, stellen Sie Fragen und teilen Sie Ihre Erfahrungen."
  },
  
  actions: {
    title: "Was können wir tun?",
    subtitle: "Es gibt verschiedene Möglichkeiten, zur Verbesserung des Visumsprozesses beizutragen.",
    shareTitle: "Teilen Sie diese Ressource",
    shareDescription: "Helfen Sie anderen, informierte Entscheidungen zu treffen.",
    shareButton: "Teilen",
    joinDiscussion: "An Diskussion teilnehmen",
    copied: "Link kopiert!",
    copyLink: "Link kopieren",
    shareText: "Sehen Sie sich diese nützliche Ressource zum Visumsprozess an:",
    awareness: {
      title: "Bewusstsein schaffen",
      point1: "Teilen Sie Ihre Erfahrungen in sozialen Medien",
      point2: "Sprechen Sie mit lokalen Vertretern",
      point3: "Unterstützen Sie Organisationen, die für Visatransparenz arbeiten"
    },
    legal: {
      title: "Rechtliche Wege",
      point1: "Machen Sie sich mit den Visabestimmungen vertraut",
      point2: "Fordern Sie Erklärungen für Ablehnungen an",
      point3: "Melden Sie unrechtmäßige Praktiken bei den zuständigen Behörden"
    },
    tourism: {
      title: "Veränderte Reisepläne",
      point1: "Erkunden Sie alternative Reiseziele",
      point2: "Informieren Sie Reiseveranstalter über Ihre Erfahrungen",
      point3: "Geben Sie konstruktives Feedback an Botschaften und Konsulate"
    },
    diaspora: {
      title: "Diaspora-Engagement",
      point1: "Organisieren Sie Community-Gruppen für gegenseitige Unterstützung",
      point2: "Teilen Sie Ressourcen und Tipps mit anderen Antragstellern",
      point3: "Sammeln Sie Daten für eine bessere Interessenvertretung"
    }
  },
  
  facts: {
    title: "Fakten zur Schengen-Visaverarbeitung",
    subtitle: "Informieren Sie sich über die Schengen-Anforderungen und vergleichen Sie sie mit anderen Ländern.",
    general: "Allgemein",
    schengen: "Schengen",
    comparison: "Vergleiche",
    fees: "Gebühren",
    
    // Add more fact translations
    visaRequirements: "Visaanforderungen",
    visaRequirementsDesc: "Visaanforderungen für türkische Staatsbürger weltweit",
    turkeyRepublic: "Republik Türkei",
    idCardTravel: "Reisen mit Personalausweis möglich",
    noVisaRequired: "Kein Visum erforderlich",
    visaOnArrival: "Visum bei Ankunft",
    eVisa: "E-Visum",
    visaAvailableBoth: "Beide Visumarten verfügbar",
    visaRequired: "Visum erforderlich",
    
    // Comparison tab translations
    comparisonTitle: "Ländervergleiche",
    comparisonDesc: "Visaanforderungen und -praktiken verschiedener Länder",
    keyDifferences: "Wichtige Unterschiede",
    destination: "Ziel",
    fee: "Gebühr",
    notes: "Anmerkungen",
    
    // Schengen tab translations
    schengenFacts: "Fakten zum Schengen-Raum",
    schengenFactsDesc: "Grundlegende Informationen zum Schengen-Raum und zu Visaanforderungen",
    schengenMembers: "Schengen-Mitgliedstaaten",
    schengenRules: "Grundlegende Schengen-Regeln",
    schengenRule1: "Maximaler Aufenthalt von 90 Tagen in einem beliebigen Zeitraum von 180 Tagen",
    schengenRule2: "Erste Einreise in der Regel über das Land, bei dem der Antrag gestellt wurde",
    schengenRule3: "Freie Bewegung innerhalb des Gebiets",
    schengenRule4: "Einheitliches Antragsformular in allen Mitgliedstaaten",
    schengenVisaFree: "Länder mit visumfreiem Zugang zum Schengen-Raum",
    schengenVisaFreeDesc: "Bürger dieser Länder können ohne Visum in den Schengen-Raum einreisen",
    
    // Visa fees tab translations
    visaFees: "Visagebühren",
    visaFeesDesc: "Vergleich der Visagebühren verschiedener Länder",
    standardFee: "Standardgebühr",
    ukFeeDesc: "Variiert je nach Visumart",
    usFeeDesc: "Für Touristen-/Geschäftsvisum (B1/B2)",
    canadaFeeDesc: "Befristetes Besuchervisum",
    australiaFeeDesc: "Besuchervisum",
    historicalChanges: "Historische Änderungen",
    historicalChangesDesc: "Änderungen der Schengen-Visagebühren im Laufe der Zeit",
    fee2014: "2014: Standardvisagebühr 60€",
    fee2020: "2020: Standardvisagebühr auf 80€ erhöht",
    fee2022: "2022: Neuer Visakodex implementiert",
    
    // Country related translations
    allSchengenCountries: "Alle Schengen-Länder",
    unitedKingdom: "Vereinigtes Königreich",
    unitedStates: "Vereinigte Staaten",
    canada: "Kanada",
    australia: "Australien",
    
    // Fact comparison translations
    schengenVisa: "Schengen-Visum",
    schengenFee: "Schengen-Gebühr",
    visaFreeCountries: "Visumfreie Länder",
    
    // More fact translations
    venezuelaFact: "Venezuela-Pass in der Türkei",
    venezuelaFactDesc: "Venezolanische Staatsbürger können ohne Visum in die Türkei einreisen, während türkische Staatsbürger ein Visum für Venezuela benötigen.",
    russiaFact: "Türkei und Russland",
    russiaFactDesc: "Türkische Geschäftsleute können seit 2017 mit einer offiziellen Einladung visumfrei nach Russland einreisen.",
    turkeyFact: "Türkische Visapolitik",
    turkeyFactDesc: "Die Türkei gewährt Bürgern von mehr als 90 Ländern visumfreien oder E-Visum-Zugang.",
    georgiaFact: "Türkei und Georgien",
    georgiaFactDesc: "Türkische Staatsbürger können mit ihrem Personalausweis nach Georgien einreisen."
  },
  
  // Add more structure to match English
  form: {
    detailsTitle: "Antragsdetails",
    detailsDescription: "Informationen zu Ihrem Visumantrag",
    country: "Land",
    selectCountry: "Land auswählen",
    countryDescription: "Für welches Land haben Sie einen Antrag gestellt?",
    city: "Stadt",
    selectCity: "Stadt auswählen",
    cityDescription: "Bei welchem Konsulat/welcher Botschaft haben Sie den Antrag gestellt?",
    duration: "Dauer",
    durationPlaceholder: "Anzahl der Tage eingeben",
    durationDescription: "Geplante Aufenthaltsdauer",
    purpose: "Zweck",
    selectPurpose: "Zweck auswählen",
    purposeDescription: "Zweck Ihres Besuchs",
    submitDate: "Einreichungsdatum",
    pickDate: "Datum auswählen",
    submitDateDescription: "Wann haben Sie den Antrag eingereicht?",
    appointmentDateQuestion: "Sind Einreichungsdatum und Termindatum identisch?",
    sameAsSubmitDate: "Ja, am selben Tag",
    differentDate: "Nein, an einem anderen Tag",
    sameAppointmentDate: "Sind Einreichungs- und Termindatum identisch?",
    sameAppointmentDateDescription: "Waren Antragseinreichung und biometrischer Termin am selben Tag?",
    appointmentDate: "Termindatum",
    appointmentDateDescription: "Wann war Ihr biometrischer/Dokumententermin?",
    resultStatus: "Ergebnisstatus",
    selectResultStatus: "Ergebnis auswählen",
    resultDescription: "Ergebnis Ihres Antrags",
    validity: "Gültigkeit",
    validityPlaceholder: "Anzahl der Tage eingeben",
    validityDescription: "Gültigkeitsdauer Ihres Visums (in Tagen)",
    entryType: "Einreisetyp",
    selectEntryType: "Einreisetyp auswählen",
    entryTypeDescription: "Haben Sie Anspruch auf einmalige oder mehrfache Einreise?",
    rejectionReason: "Ablehnungsgrund",
    rejectionReasonPlaceholder: "Ablehnungsgrund eingeben (optional)",
    rejectionDescription: "Grund für die Visumablehnung (falls bekannt)",
    successMessage: "Antrag eingereicht!",
    successDescription: "Vielen Dank, dass Sie Ihre Visumerfahrung geteilt haben.",
    errorMessage: "Fehler!",
    submitting: "Wird eingereicht...",
    submit: "Einreichen",
    next: "Weiter",
    back: "Zurück",
    resultTitle: "Ergebnisdetails",
    resultStatusDescription: "Was ist das Ergebnis Ihres Antrags?",
    validityDaysDescription: "Gültigkeitsdauer Ihres Visums (in Tagen)",
    validityDaysPlaceholder: "z.B. 90, 180, 365",
    captchaTitle: "Sicherheitsüberprüfung",
    captchaDescription: "Bitte bestätigen Sie, dass Sie ein Mensch sind",
    pleaseCompleteAllFields: "Bitte füllen Sie alle Felder aus",
    captchaRequired: "Bitte vervollständigen Sie das CAPTCHA",
    singleEntry: "Einmalige Einreise",
    multipleEntry: "Mehrfache Einreise"
  },
  
  pagination: {
    rowsPerPage: "Zeilen pro Seite",
    showing: "Anzeige",
    of: "von"
  },
  
  purposes: {
    tourism: "Tourismus",
    business: "Geschäftlich",
    familyReunification: "Familienzusammenführung",
    visit: "Besuch",
    transit: "Transit",
    study: "Studium",
    work: "Arbeit",
    medical: "Medizinisch",
    other: "Sonstiges"
  },
  
  countries: {
    germany: "Deutschland",
    france: "Frankreich",
    italy: "Italien",
    spain: "Spanien",
    unitedkingdom: "Vereinigtes Königreich",
    portugal: "Portugal",
    greece: "Griechenland",
    austria: "Österreich",
    switzerland: "Schweiz",
    netherlands: "Niederlande",
    belgium: "Belgien",
    sweden: "Schweden",
    denmark: "Dänemark",
    finland: "Finnland",
    norway: "Norwegen",
    ireland: "Irland",
    poland: "Polen",
    czechrepublic: "Tschechische Republik",
    hungary: "Ungarn",
    croatia: "Kroatien",
    bulgaria: "Bulgarien",
    romania: "Rumänien",
    unitedstates: "Vereinigte Staaten",
    canada: "Kanada",
    australia: "Australien",
    newzealand: "Neuseeland",
    estonia: "Estland",
    latvia: "Lettland",
    lithuania: "Litauen",
    luxembourg: "Luxemburg",
    malta: "Malta",
    slovakia: "Slowakei",
    slovenia: "Slowenien",
    iceland: "Island",
    liechtenstein: "Liechtenstein",
    argentina: "Argentinien",
    georgia: "Georgien",
    bosniaandherzegovina: "Bosnien und Herzegowina",
    southafrica: "Südafrika",
    venezuela: "Venezuela",
    russia: "Russland",
    malaysia: "Malaysia",
    moldova: "Moldawien",
    northmacedonia: "Nordmazedonien",
    turkey: "Türkei",
    southkorea: "Südkorea"
  },
  
  footer: {
    rights: "Alle Rechte vorbehalten.",
    privacy: "Datenschutzrichtlinie",
    terms: "Nutzungsbedingungen",
    contact: "Kontakt"
  },
  
  language: {
    language: "Sprache",
    turkish: "Türkisch",
    english: "Englisch",
    german: "Deutsch"
  },
  
  cookies: {
    title: "Cookie-Hinweis",
    description: "Diese Website verwendet Cookies, um Ihr Surferlebnis zu verbessern.",
    accept: "Akzeptieren",
    decline: "Ablehnen",
    preferences: "Präferenzen",
    privacy: "Datenschutzrichtlinie",
    necessary: "Notwendige Cookies",
    analytics: "Analytics-Cookies",
    marketing: "Marketing-Cookies",
    acceptSelected: "Ausgewählte akzeptieren",
    acceptAll: "Alle akzeptieren",
    close: "Schließen"
  }
};

