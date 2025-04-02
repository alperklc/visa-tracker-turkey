// Import any existing German translation modules we might have created
// If we don't have them yet, we'll create a basic structure to keep the app working

export const de = {
  // Basic translations to keep the app functioning
  appName: "Visum Tracker Türkei",
  madeWith: "gemacht mit",
  
  // Match the structure of the English translations
  hero: {
    title: "Nachverfolgung von Visumsanträgen gemeinsam",
    subtitle: "Diese Plattform dokumentiert den Visumantragsprozess und Zeitpläne für türkische Staatsbürger. Durch die gemeinsame Nutzung unserer Erfahrungen hoffen wir, Transparenz in den Prozess zu bringen und für eine faire Behandlung einzutreten.",
    crowdsourced: "Crowdsourced-Daten",
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
    processingTimeDesc: "Tage von der Antragsabgabe bis zur Passlückgabe",
    applicationResults: "Antragsergebnisse",
    applicationResultsDesc: "Verteilung der Visumantragsresultate",
    days: "Tage",
    approved: "Genehmigt",
    rejected: "Abgelehnt",
    pending: "Ausstehend",
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
    pending: "Ausstehend",
    caption: "Aktuelle Visumantragsresultate"
  },
  
  review: {
    title: "Anträge überprüfen",
    subtitle: "Entdecken Sie Visumantragserfaghrungen, die von der Community eingereicht wurden",
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
  
  form: {
    detailsTitle: "Antragsdetails",
    detailsDescription: "Teilen Sie Informationen zu Ihrem Visumantrag",
    country: "Land",
    selectCountry: "Land auswählen",
    countryDescription: "Für welches Land haben Sie ein Visum beantragt?",
    city: "Stadt",
    selectCity: "Stadt auswählen",
    cityDescription: "In welchem Konsulat/welcher Botschaft haben Sie den Antrag gestellt?",
    duration: "Dauer",
    durationPlaceholder: "Anzahl der Tage eingeben",
    durationDescription: "Ihre geplante Aufenthaltsdauer",
    purpose: "Zweck",
    selectPurpose: "Zweck auswählen",
    purposeDescription: "Der Zweck Ihres Besuchs",
    submitDate: "Einreichungsdatum",
    pickDate: "Datum auswählen",
    submitDateDescription: "Wann haben Sie den Antrag eingereicht?",
    appointmentDateQuestion: "Sind Einreichungsdatum und Termindatum identisch?",
    sameAsSubmitDate: "Ja, gleicher Tag",
    differentDate: "Nein, anderer Tag",
    sameAppointmentDate: "Sind Einreichungs- und Termindatum gleich?",
    sameAppointmentDateDescription: "Sind Antragseinreichung und biometrischer Termin am selben Tag?",
    appointmentDate: "Termindatum",
    appointmentDateDescription: "Wann war Ihr biometrischer/Dokument-Termin?",
    resultStatus: "Ergebnisstatus",
    selectResultStatus: "Ergebnis auswählen",
    resultDescription: "Das Ergebnis Ihres Antrags",
    validity: "Gültigkeit",
    validityPlaceholder: "Anzahl der Tage eingeben",
    validityDescription: "Gültigkeitsdauer Ihres Visums (Tage)",
    entryType: "Einreisetyp",
    selectEntryType: "Einreisetyp auswählen",
    entryTypeDescription: "Haben Sie einen einmaligen oder mehrfachen Einreiseanspruch?",
    rejectionReason: "Ablehnungsgrund",
    rejectionReasonPlaceholder: "Ablehnungsgrund eingeben (optional)",
    rejectionDescription: "Grund der Visumsablehnung (falls bekannt)",
    successMessage: "Antrag eingereicht!",
    successDescription: "Vielen Dank für das Teilen Ihrer Visumserfahrung.",
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
    captchaRequired: "Bitte füllen Sie das CAPTCHA aus",
    singleEntry: "Einmalige Einreise",
    multipleEntry: "Mehrfache Einreise"
  },
  
  pagination: {
    rowsPerPage: "Zeilen pro Seite",
    showing: "Zeige",
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
    other: "Andere"
  },
  
  facts: {
    title: "Fakten zum Schengen-Visumsprozess",
    subtitle: "Erfahren Sie mehr über Schengen-Anforderungen und vergleichen Sie mit anderen Ländern.",
    general: "Allgemein",
    schengen: "Schengen",
    comparison: {
      aspect: "Aspekt"
    },
    fees: "Gebühren",
    
    // More fact translations
    visaRequirements: "Visumsanforderungen",
    visaRequirementsDesc: "Visumsanforderungen weltweit für türkische Staatsbürger",
    turkeyRepublic: "Republik Türkei",
    idCardTravel: "Reisen mit Personalausweis möglich",
    noVisaRequired: "Kein Visum erforderlich",
    visaOnArrival: "Visum bei Ankunft",
    eVisa: "E-Visum",
    visaAvailableBoth: "Beide Visumsarten verfügbar",
    visaRequired: "Visum erforderlich",
    
    required: "Erforderlich",
    notRequired: "Nicht erforderlich",
    
    // Other translations
    schengenVisa: "Schengen-Visum",
    schengenFee: "Schengen-Gebühr",
    visaFreeCountries: "Visafreie Länder"
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
    privacy: "Datenschutzerklärung",
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
    privacy: "Datenschutzerklärung",
    necessary: "Notwendige Cookies",
    analytics: "Analyse-Cookies",
    marketing: "Marketing-Cookies",
    acceptSelected: "Ausgewählte akzeptieren",
    acceptAll: "Alle akzeptieren",
    close: "Schließen"
  },
  
  actions: {
    title: "Was können wir tun?",
    subtitle: "Verschiedene Wege, um zur Verbesserung des Visumprozesses beizutragen.",
    disclaimer: {
      title: "Wichtiger Hinweis",
      text: "Die folgenden Vorschläge sind friedliche und rechtmäßige Wege, um Veränderungen zu fördern. Stellen Sie sicher, dass Ihre Aktionen den lokalen Gesetzen entsprechen."
    },
    diaspora: {
      title: "Engagement der Diaspora",
      description: "Nutzen Sie den Einfluss türkischer Gemeinschaften im Ausland",
      point1: "Bilden Sie Gemeinschaftsgruppen für gegenseitige Unterstützung",
      point2: "Teilen Sie Ressourcen und Tipps mit anderen Antragstellern",
      point3: "Sammeln Sie Daten für bessere Interessenvertretung"
    },
    tourism: {
      title: "Alternative Reiseplanung",
      description: "Erwägen Sie alternative Ziele für Tourismus und Geschäftsreisen",
      point1: "Erkunden Sie alternative Reiseziele",
      point2: "Melden Sie Ihre Erfahrungen an Reiseveranstalter",
      point3: "Geben Sie konstruktives Feedback an Botschaften und Konsulate"
    },
    awareness: {
      title: "Bewusstsein schaffen",
      description: "Teilen Sie Informationen und Erfahrungen",
      point1: "Teilen Sie Ihre Erfahrungen in sozialen Medien",
      point2: "Sprechen Sie mit lokalen Vertretern",
      point3: "Unterstützen Sie Organisationen, die für Visumstransparenz arbeiten"
    },
    legal: {
      title: "Rechtliche Wege",
      description: "Unterstützen Sie rechtliche Initiativen für faire Behandlung",
      point1: "Informieren Sie sich über Visumsbestimmungen",
      point2: "Fordern Sie Erklärungen für Ablehnungen",
      point3: "Melden Sie illegale Praktiken an die zuständigen Behörden"
    },
    alternatives: {
      title: "Alternative Ziele",
      description: "Erwägen Sie diese Länder mit günstigeren Visumspolitiken für türkische Staatsbürger:"
    },
    contact: {
      title: "Mitmachen",
      description: "Möchten Sie zu dieser Initiative beitragen? Kontaktieren Sie uns mit Ihren Ideen und Vorschlägen.",
      email: "Senden Sie uns eine E-Mail"
    },
    shareTitle: "Teilen Sie diese Ressource",
    shareDescription: "Helfen Sie anderen, informierte Entscheidungen zu treffen.",
    shareButton: "Teilen",
    copyLink: "Link kopieren",
    joinDiscussion: "An Diskussionen teilnehmen"
  },
  
  discussion: {
    community: "Community-Diskussionen",
    title: "Community-Diskussionen",
    subtitle: "Teilen Sie Ihre Gedanken und Erfahrungen mit anderen.",
    description: "Diskutieren Sie über Visumsanträge, stellen Sie Fragen und teilen Sie Ihre Erfahrungen."
  }
};
