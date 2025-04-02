// Import any existing Turkish translation modules we might have created
// If we don't have them yet, we'll create a basic structure to keep the app working

export const tr = {
  // Basic translations to keep the app functioning
  appName: "Vize Takip Türkiye",
  madeWith: "sevgiyle yapıldı",
  
  // Match the structure of the English translations
  hero: {
    title: "Vize Başvuru Deneyimlerini Birlikte Takip Ediyoruz",
    subtitle: "Bu platform, Türk vatandaşlarının yaşadığı vize başvuru sürecini ve zaman çizelgelerini belgeler. Toplu deneyimlerimizi paylaşarak, sürece şeffaflık getirmeyi ve adil muameleyi savunmayı umuyoruz.",
    crowdsourced: "Toplu Veriler",
    realExperiences: "Gerçek Deneyimler",
    transparentProcess: "Şeffaf Süreç"
  },
  
  dashboard: {
    title: "Güncel İstatistikler",
    allCountries: "Tüm Ülkeler",
    totalApplications: "Toplam Başvuru",
    avgProcessingTime: "Ort. İşlem Süresi",
    approvalRate: "Onay Oranı",
    latestApplication: "Son Başvuru",
    lastupdated: "Son Güncelleme",
    processingTime: "İşlem Süresi",
    processingTimeDesc: "Başvuru gönderiminden pasaport iadesi gününe kadar",
    applicationResults: "Başvuru Sonuçları",
    applicationResultsDesc: "Vize başvuru sonuçlarının dağılımı",
    days: "Gün",
    approved: "Onaylandı",
    rejected: "Reddedildi",
    pending: "Beklemede",
    worstCities: "En Uzun Bekleme Süreleri"
  },
  
  table: {
    country: "Ülke",
    city: "Şehir",
    purpose: "Amaç",
    submissionDate: "Başvuru Tarihi",
    appointmentDate: "Randevu Tarihi",
    returnDate: "Dönüş Tarihi",
    processingTime: "İşlem Süresi",
    result: "Sonuç",
    days: "Gün",
    approved: "Onaylandı",
    rejected: "Reddedildi",
    pending: "Beklemede",
    caption: "Son Vize Başvuru Sonuçları"
  },
  
  review: {
    title: "Vize Başvurularını İncele",
    subtitle: "Topluluk tarafından gönderilen vize başvuru deneyimlerini keşfedin",
    search: "Ara",
    searchPlaceholder: "Ülke veya amaç ara...",
    filterCountry: "Ülkeye Göre Filtrele",
    selectCountry: "Ülke seç",
    allCountries: "Tüm Ülkeler",
    allPurposes: "Tüm Amaçlar",
    sortBy: "Sırala",
    newestFirst: "En Yeniler Önce",
    oldestFirst: "En Eskiler Önce",
    noResults: "Sonuç bulunamadı",
    tryAdjusting: "Filtrelerinizi ayarlamayı deneyin",
    clearFilters: "Filtreleri Temizle",
    cards: "Kartlar",
    table: "Tablo",
    gdpPerCapita: "Kişi Başına GSYH",
    population: "Nüfus",
    seeall: "Tümünü Gör",
    noApplicationsFound: "Başvuru bulunamadı",
    applications: "Başvurular",
    common: {
      refresh: "Yenile"
    }
  },
  
  submit: {
    title: "Vize Başvuru Detaylarını Gönder",
    subtitle: "Deneyimlerinizi toplulukla paylaşın."
  },
  
  recentApplications: {
    community: "Topluluk Başvuruları",
    submit: "Başvuru Gönder",
    noApplications: "Henüz başvuru yok",
    beFirst: "Başvuru verilerini paylaşan ilk kişi olun",
    submitApplication: "Başvuru Gönder"
  },
  
  discussions: {
    title: "Topluluk Tartışmaları",
    subtitle: "Düşüncelerinizi ve deneyimlerinizi başkalarıyla paylaşın.",
    community: "Topluluk Forumu",
    description: "Vize başvuruları hakkında tartışın, sorular sorun ve deneyimlerinizi paylaşın."
  },
  
  actions: {
    title: "Ne Yapabiliriz?",
    subtitle: "Vize sürecini iyileştirmeye katkıda bulunmak için çeşitli yollar var.",
    shareTitle: "Bu kaynağı paylaşın",
    shareDescription: "Başkalarının bilinçli kararlar vermesine yardımcı olun.",
    shareButton: "Paylaş",
    joinDiscussion: "Tartışmaya Katıl",
    copied: "Bağlantı kopyalandı!",
    copyLink: "Bağlantıyı Kopyala",
    shareText: "Vize süreciyle ilgili bu faydalı kaynağa göz atın:",
    awareness: {
      title: "Farkındalık Oluşturma",
      point1: "Deneyimlerinizi sosyal medyada paylaşın",
      point2: "Yerel temsilcilerle konuşun",
      point3: "Vize şeffaflığı için çalışan kuruluşları destekleyin"
    },
    legal: {
      title: "Yasal Yollar",
      point1: "Vize düzenlemeleri hakkında bilgi edinin",
      point2: "Redler için açıklama isteyin",
      point3: "Yasa dışı uygulamaları ilgili makamlara bildirin"
    },
    tourism: {
      title: "Değiştirilmiş Seyahat Planları",
      point1: "Alternatif seyahat destinasyonlarını keşfedin",
      point2: "Deneyimlerinizi tur operatörlerine bildirin",
      point3: "Büyükelçiliklere ve konsolosluklara yapıcı geri bildirim verin"
    },
    diaspora: {
      title: "Diaspora Katılımı",
      point1: "Karşılıklı destek için topluluk grupları oluşturun",
      point2: "Kaynakları ve ipuçlarını diğer başvuru sahipleriyle paylaşın",
      point3: "Daha iyi savunuculuk için veri toplayın"
    }
  },
  
  facts: {
    title: "Schengen Vize İşlemi Hakkında Gerçekler",
    subtitle: "Schengen gereksinimlerini öğrenin ve diğer ülkelerle karşılaştırın.",
    general: "Genel",
    schengen: "Schengen",
    comparison: "Karşılaştırmalar",
    fees: "Ücretler",
    
    // Add more fact translations
    visaRequirements: "Vize Gereksinimleri",
    visaRequirementsDesc: "Türk vatandaşları için dünya genelinde vize gereksinimleri",
    turkeyRepublic: "Türkiye Cumhuriyeti",
    idCardTravel: "Kimlik kartı ile seyahat edilebilir",
    noVisaRequired: "Vize gerekmez",
    visaOnArrival: "Varışta vize",
    eVisa: "E-Vize",
    visaAvailableBoth: "Her iki vize türü de mevcut",
    visaRequired: "Vize gerekli",
    
    // Comparison tab translations
    comparisonTitle: "Ülke Karşılaştırmaları",
    comparisonDesc: "Farklı ülkelerin vize gereksinimleri ve uygulamaları",
    keyDifferences: "Önemli Farklılıklar",
    destination: "Hedef",
    fee: "Ücret",
    notes: "Notlar",
    
    // Schengen tab translations
    schengenFacts: "Schengen Bölgesi Gerçekleri",
    schengenFactsDesc: "Schengen bölgesi ve vize gereksinimleri hakkında temel bilgiler",
    schengenMembers: "Schengen Üye Ülkeleri",
    schengenRules: "Temel Schengen Kuralları",
    schengenRule1: "90 günlük herhangi bir 180 günlük dönemde maksimum 90 gün kalış",
    schengenRule2: "İlk giriş genellikle başvurulan ülkeden olmalıdır",
    schengenRule3: "Bölge içinde serbestçe hareket edebilme",
    schengenRule4: "Tüm üye ülkelerde aynı standart başvuru formu",
    schengenVisaFree: "Schengen'e Vizesiz Giriş Yapabilen Ülkeler",
    schengenVisaFreeDesc: "Bu ülkelerin vatandaşları Schengen bölgesine vizesiz girebilir",
    
    // Visa fees tab translations
    visaFees: "Vize Ücretleri",
    visaFeesDesc: "Farklı ülkelerin vize ücretleri karşılaştırması",
    standardFee: "Standart ücret",
    ukFeeDesc: "Vize türüne göre değişir",
    usFeeDesc: "Turist/iş vizesi için (B1/B2)",
    canadaFeeDesc: "Geçici ziyaretçi vizesi",
    australiaFeeDesc: "Ziyaretçi vizesi",
    historicalChanges: "Tarihsel Değişiklikler",
    historicalChangesDesc: "Schengen vize ücretlerinin zaman içindeki değişimi",
    fee2014: "2014: Standart vize ücreti 60€",
    fee2020: "2020: Standart vize ücreti 80€'ya yükseltildi",
    fee2022: "2022: Yeni vize kodeksi uygulandı",
    
    // Country related translations
    allSchengenCountries: "Tüm Schengen ülkeleri",
    unitedKingdom: "Birleşik Krallık",
    unitedStates: "Amerika Birleşik Devletleri",
    canada: "Kanada",
    australia: "Avustralya",
    
    // Fact comparison translations
    schengenVisa: "Schengen Vizesi",
    schengenFee: "Schengen Ücreti",
    visaFreeCountries: "Vizesiz Ülkeler",
    
    // More fact translations
    venezuelaFact: "Venezuela Pasaportu ile Türkiye",
    venezuelaFactDesc: "Venezuela vatandaşları Türkiye'ye vizesiz girebilir, ancak Türk vatandaşları Venezuela için vizeye ihtiyaç duyar.",
    russiaFact: "Türkiye ve Rusya",
    russiaFactDesc: "Türk iş insanları 2017'den beri Rusya'ya resmi davetiyeyle vizesiz giriş yapabilir.",
    turkeyFact: "Türkiye Vize Uygulaması",
    turkeyFactDesc: "Türkiye 90'dan fazla ülkenin vatandaşlarına vizesiz veya e-vize ile giriş izni verir.",
    georgiaFact: "Türkiye ve Gürcistan",
    georgiaFactDesc: "Türk vatandaşları Gürcistan'a kimlik kartı ile giriş yapabilir."
  },
  
  // Add more structure to match English
  form: {
    detailsTitle: "Başvuru Detayları",
    detailsDescription: "Vize başvurunuz hakkında bilgi verin",
    country: "Ülke",
    selectCountry: "Ülke seçin",
    countryDescription: "Hangi ülkeye başvurdunuz?",
    city: "Şehir",
    selectCity: "Şehir seçin",
    cityDescription: "Hangi konsolosluk/büyükelçiliğe başvurdunuz?",
    duration: "Süre",
    durationPlaceholder: "Gün sayısı girin",
    durationDescription: "Planlanan kalış süreniz",
    purpose: "Amaç",
    selectPurpose: "Amaç seçin",
    purposeDescription: "Ziyaretinizin amacı",
    submitDate: "Başvuru Tarihi",
    pickDate: "Tarih seçin",
    submitDateDescription: "Başvuruyu ne zaman gönderdiniz?",
    appointmentDateQuestion: "Başvuru tarihi ve randevu tarihi aynı mı?",
    sameAsSubmitDate: "Evet, aynı gün",
    differentDate: "Hayır, farklı gün",
    sameAppointmentDate: "Başvuru ve randevu tarihi aynı mı?",
    sameAppointmentDateDescription: "Başvuru gönderimi ve biyometrik randevu aynı gün mü?",
    appointmentDate: "Randevu Tarihi",
    appointmentDateDescription: "Biyometrik/doküman randevunuz ne zamandı?",
    resultStatus: "Sonuç Durumu",
    selectResultStatus: "Sonuç seçin",
    resultDescription: "Başvurunuzun sonucu",
    validity: "Geçerlilik",
    validityPlaceholder: "Gün sayısı girin",
    validityDescription: "Vizenizin geçerlilik süresi (gün)",
    entryType: "Giriş Türü",
    selectEntryType: "Giriş türü seçin",
    entryTypeDescription: "Tek veya çoklu giriş hakkınız var mı?",
    rejectionReason: "Red Nedeni",
    rejectionReasonPlaceholder: "Red nedeni girin (isteğe bağlı)",
    rejectionDescription: "Vize reddi nedeni (biliyorsanız)",
    successMessage: "Başvuru Gönderildi!",
    successDescription: "Vize deneyiminizi paylaştığınız için teşekkürler.",
    errorMessage: "Hata!",
    submitting: "Gönderiliyor...",
    submit: "Gönder",
    next: "İleri",
    back: "Geri",
    resultTitle: "Sonuç Detayları",
    resultStatusDescription: "Başvurunuzun sonucu nedir?",
    validityDaysDescription: "Vizenizin geçerlilik süresi (gün olarak)",
    validityDaysPlaceholder: "Örn. 90, 180, 365",
    captchaTitle: "Güvenlik Doğrulama",
    captchaDescription: "Lütfen insan olduğunuzu doğrulayın",
    pleaseCompleteAllFields: "Lütfen tüm alanları doldurun",
    captchaRequired: "Lütfen CAPTCHA'yı tamamlayın",
    singleEntry: "Tek Giriş",
    multipleEntry: "Çoklu Giriş"
  },
  
  pagination: {
    rowsPerPage: "Sayfa başına satır",
    showing: "Gösteriliyor",
    of: "/"
  },
  
  purposes: {
    tourism: "Turizm",
    business: "İş",
    familyReunification: "Aile Birleşimi",
    visit: "Ziyaret",
    transit: "Transit",
    study: "Eğitim",
    work: "Çalışma",
    medical: "Sağlık",
    other: "Diğer"
  },
  
  countries: {
    germany: "Almanya",
    france: "Fransa",
    italy: "İtalya",
    spain: "İspanya",
    unitedkingdom: "Birleşik Krallık",
    portugal: "Portekiz",
    greece: "Yunanistan",
    austria: "Avusturya",
    switzerland: "İsviçre",
    netherlands: "Hollanda",
    belgium: "Belçika",
    sweden: "İsveç",
    denmark: "Danimarka",
    finland: "Finlandiya",
    norway: "Norveç",
    ireland: "İrlanda",
    poland: "Polonya",
    czechrepublic: "Çek Cumhuriyeti",
    hungary: "Macaristan",
    croatia: "Hırvatistan",
    bulgaria: "Bulgaristan",
    romania: "Romanya",
    unitedstates: "Amerika Birleşik Devletleri",
    canada: "Kanada",
    australia: "Avustralya",
    newzealand: "Yeni Zelanda",
    estonia: "Estonya",
    latvia: "Letonya",
    lithuania: "Litvanya",
    luxembourg: "Lüksemburg",
    malta: "Malta",
    slovakia: "Slovakya",
    slovenia: "Slovenya",
    iceland: "İzlanda",
    liechtenstein: "Lihtenştayn",
    argentina: "Arjantin",
    georgia: "Gürcistan",
    bosniaandherzegovina: "Bosna Hersek",
    southafrica: "Güney Afrika",
    venezuela: "Venezuela",
    russia: "Rusya",
    malaysia: "Malezya",
    moldova: "Moldova",
    northmacedonia: "Kuzey Makedonya",
    turkey: "Türkiye",
    southkorea: "Güney Kore"
  },
  
  footer: {
    rights: "Tüm hakları saklıdır.",
    privacy: "Gizlilik Politikası",
    terms: "Kullanım Şartları",
    contact: "İletişim"
  },
  
  language: {
    language: "Dil",
    turkish: "Türkçe",
    english: "İngilizce",
    german: "Almanca"
  },
  
  cookies: {
    title: "Çerez Bildirimi",
    description: "Bu web sitesi gezinme deneyiminizi geliştirmek için çerezler kullanır.",
    accept: "Kabul Et",
    decline: "Reddet",
    preferences: "Tercihler",
    privacy: "Gizlilik Politikası",
    necessary: "Gerekli Çerezler",
    analytics: "Analiz Çerezleri",
    marketing: "Pazarlama Çerezleri",
    acceptSelected: "Seçilenleri Kabul Et",
    acceptAll: "Tümünü Kabul Et",
    close: "Kapat"
  }
};
