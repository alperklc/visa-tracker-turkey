
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from './types';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Dictionary for translations
const translations: Record<Language, Record<string, string>> = {
  tr: {
    // General
    "appName": "Vize İzleyici Türkiye",
    "home": "Ana Sayfa",
    "submitApplication": "Başvuru Gönder",
    "reviewEntries": "Başvuruları İncele",
    "discussions": "Tartışmalar",
    "seeAllData": "Tüm Verileri Gör",
    "madeWith": "ile yapıldı",
    
    // Hero
    "hero.badge": "Türk Vatandaşları İçin Bilgiler",
    "hero.title": "Vize Başvuru Deneyimlerini Birlikte Takip Ediyoruz",
    "hero.subtitle": "Bu platform, Türk vatandaşlarının yaşadığı vize başvuru süreçlerini ve zaman çizelgelerini belgelemektedir. Ortak deneyimlerimizi paylaşarak, sürece şeffaflık getirmeyi ve adil muamele için savunuculuk yapmayı umuyoruz.",
    "hero.crowdsourced": "Topluluk Verileri",
    "hero.realExperiences": "Gerçek Deneyimler",
    "hero.transparentProcess": "Şeffaf Süreç",
    
    // Dashboard
    "dashboard.title": "Vize Başvuru Panosu",
    "dashboard.allCountries": "Tüm Ülkeler",
    "dashboard.totalApplications": "Toplam Başvuru",
    "dashboard.avgProcessingTime": "Ort. İşlem Süresi",
    "dashboard.approvalRate": "Onay Oranı",
    "dashboard.latestApplication": "Son Başvuru",
    "dashboard.processingTime": "İşlem Süresi",
    "dashboard.processingTimeDesc": "Başvuru gönderiminden pasaport iadesi gününe kadar geçen gün",
    "dashboard.applicationResults": "Başvuru Sonuçları",
    "dashboard.applicationResultsDesc": "Vize başvuru sonuçlarının dağılımı",
    "dashboard.days": "Gün",
    "dashboard.approved": "Onaylandı",
    "dashboard.rejected": "Reddedildi",
    "dashboard.pending": "Beklemede",
    "dashboard.worstCities": "En Uzun Bekleme Süreleri",
    "dashboard.trends": "Son 3 Aydaki Eğilimler",
    "dashboard.financialImpact": "Ekonomik Etki",
    "dashboard.totalAnnualApplications": "Yıllık Toplam Başvuru",
    "dashboard.totalAnnualCost": "Yıllık Toplam Maliyet",
    "dashboard.description": "Başvuru gönderiminden sonuç gününe kadar",
    
    // Recent Applications
    "recentApplications.title": "Son Başvurular",
    "recentApplications.submit": "Deneyiminizi Paylaşın",
    "recentApplications.noApplications": "Henüz başvuru yok",
    "recentApplications.beFirst": "Vize başvuru deneyiminizi paylaşan ilk kişi olun",
    "recentApplications.submitApplication": "Başvuru Gönder",
    "recentApplications.last10": "Son 10 Başvuru",
    
    // Submit Page
    "submit.title": "Vize Deneyiminizi Paylaşın",
    "submit.subtitle": "Vize başvuru deneyiminizi paylaşarak diğer Türk vatandaşlarına yardımcı olun. Katkınız, herkes için süreci daha şeffaf hale getirir.",
    
    // Form
    "form.detailsTitle": "Başvuru Detayları",
    "form.detailsDescription": "Vize başvurunuzun temel bilgilerini paylaşın",
    "form.country": "Ülke",
    "form.selectCountry": "Ülke seçin",
    "form.countryDescription": "Vize başvurusu yaptığınız ülke",
    "form.city": "Şehir",
    "form.selectCity": "Şehir seçin",
    "form.cityDescription": "Başvuru yaptığınız VFS veya konsolosluk lokasyonu",
    "form.duration": "Ziyaret Süresi",
    "form.durationPlaceholder": "örn. 90 gün, 6 ay",
    "form.durationDescription": "Vize için talep ettiğiniz gün veya ay sayısı",
    "form.purpose": "Ziyaret Amacı",
    "form.selectPurpose": "Ziyaret amacı seçin",
    "form.purposeDescription": "Vize başvurusunun ana amacı",
    "form.submitDate": "Başvuru Tarihi",
    "form.pickDate": "Tarih seçin",
    "form.submitDateDescription": "Tüm belgeleri ve başvuruyu teslim ettiğiniz tarih",
    "form.replyDate": "iData Yanıt Tarihi",
    "form.replyDateDescription": "Başvurunuzun ilk değerlendirilmesinden sonraki yanıt tarihi (varsa)",
    "form.appointmentDate": "Randevu Tarihi",
    "form.appointmentDateDescription": "Parmak izi ve belge kontrolü için randevu tarihi",
    "form.returnDate": "Pasaport İade Tarihi",
    "form.returnDateDescription": "Pasaportunuzu geri aldığınız tarih",
    "form.resultTitle": "Sonuç Bilgileri",
    "form.resultStatus": "Sonuç Durumu",
    "form.selectResult": "Sonuç seçin",
    "form.resultStatusDescription": "Vize başvurunuzun nihai sonucu",
    "form.validity": "Geçerlilik Süresi",
    "form.validityPlaceholder": "örn. 90 gün, 1 yıl",
    "form.validityDescription": "Vize geçerliliğinin süresi",
    "form.entryType": "Giriş Tipi",
    "form.selectEntryType": "Giriş tipi seçin",
    "form.singleEntry": "Tek Giriş",
    "form.multipleEntry": "Çoklu Giriş",
    "form.entryTypeDescription": "Vizenin tek veya çoklu giriş hakkı sağlayıp sağlamadığı",
    "form.submit": "Gönder",
    "form.submitting": "Gönderiliyor...",
    "form.successMessage": "Başvuru başarıyla kaydedildi",
    "form.successDescription": "Vize deneyiminizi paylaştığınız için teşekkürler",
    "form.errorMessage": "Başvuru gönderilirken bir hata oluştu",
    
    // Footer
    "footer.rights": "Tüm hakları saklıdır.",
    "footer.privacy": "Gizlilik Politikası",
    "footer.terms": "Kullanım Şartları",
    "footer.contact": "İletişim",
    
    // Language Selection
    "language": "Dil",
    "language.turkish": "Türkçe",
    "language.english": "İngilizce",
    "language.german": "Almanca",
    
    // Table
    "table.country": "Ülke",
    "table.city": "Şehir",
    "table.purpose": "Amaç",
    "table.submissionDate": "Başvuru Tarihi",
    "table.appointmentDate": "Randevu Tarihi",
    "table.returnDate": "Dönüş Tarihi",
    "table.processingTime": "İşlem Süresi",
    "table.result": "Sonuç",
    "table.days": "Gün",
    "table.approved": "Onaylandı",
    "table.rejected": "Reddedildi",
    "table.pending": "Beklemede",
    "table.caption": "Son Vize Başvuru Sonuçları",
    
    // Discussions
    "discussions.title": "Vize Tartışmaları",
    "discussions.subtitle": "Vize deneyimlerinizi ve sorularınızı diğer kullanıcılarla paylaşın",
    "discussions.comingSoon": "Tartışma forumu yakında eklenecek",
    "discussions.stayTuned": "Güncellemeler için takipte kalın!",
  },
  en: {
    // General
    "appName": "Visa Tracker Turkey",
    "home": "Home",
    "submitApplication": "Submit Application",
    "reviewEntries": "Review Entries",
    "discussions": "Discussions",
    "seeAllData": "See All Data",
    "madeWith": "made with",
    
    // Hero
    "hero.badge": "Information for Turkish Citizens",
    "hero.title": "Tracking Visa Application Experiences Together",
    "hero.subtitle": "This platform documents the visa application process and timelines experienced by Turkish citizens. By sharing our collective experiences, we hope to bring transparency to the process and advocate for fair treatment.",
    "hero.crowdsourced": "Crowdsourced Data",
    "hero.realExperiences": "Real Experiences",
    "hero.transparentProcess": "Transparent Process",
    
    // Dashboard
    "dashboard.title": "Visa Application Dashboard",
    "dashboard.allCountries": "All Countries",
    "dashboard.totalApplications": "Total Applications",
    "dashboard.avgProcessingTime": "Avg. Processing Time",
    "dashboard.approvalRate": "Approval Rate",
    "dashboard.latestApplication": "Latest Application",
    "dashboard.processingTime": "Processing Time",
    "dashboard.processingTimeDesc": "Days from application submission to passport return",
    "dashboard.applicationResults": "Application Results",
    "dashboard.applicationResultsDesc": "Distribution of visa application outcomes",
    "dashboard.days": "Days",
    "dashboard.approved": "Approved",
    "dashboard.rejected": "Rejected",
    "dashboard.pending": "Pending",
    "dashboard.worstCities": "Longest Wait Times",
    "dashboard.trends": "Trends in Last 3 Months",
    "dashboard.financialImpact": "Financial Impact",
    "dashboard.totalAnnualApplications": "Total Annual Applications",
    "dashboard.totalAnnualCost": "Total Annual Cost",
    "dashboard.description": "from submission to result",

    // Recent Applications
    "recentApplications.title": "Recent Applications",
    "recentApplications.submit": "Submit Your Experience",
    "recentApplications.noApplications": "No applications yet",
    "recentApplications.beFirst": "Be the first to share your visa application experience",
    "recentApplications.submitApplication": "Submit Application",
    "recentApplications.last10": "Last 10 Applications",
    
    // Submit Page
    "submit.title": "Share Your Visa Experience",
    "submit.subtitle": "Help other Turkish citizens by sharing your visa application experience. Your contribution makes the process more transparent for everyone.",
    
    // Form
    "form.detailsTitle": "Application Details",
    "form.detailsDescription": "Share the basic information about your visa application",
    "form.country": "Country",
    "form.selectCountry": "Select country",
    "form.countryDescription": "The country you applied for a visa to",
    "form.city": "City",
    "form.selectCity": "Select city",
    "form.cityDescription": "The VFS or consulate location where you applied",
    "form.duration": "Duration of Visit",
    "form.durationPlaceholder": "e.g. 90 days, 6 months",
    "form.durationDescription": "Number of days or months requested for the visa",
    "form.purpose": "Purpose of Visit",
    "form.selectPurpose": "Select purpose",
    "form.purposeDescription": "The main reason for the visa application",
    "form.submitDate": "Submission Date",
    "form.pickDate": "Pick a date",
    "form.submitDateDescription": "Date when all documents and application were submitted",
    "form.replyDate": "iData Reply Date",
    "form.replyDateDescription": "Date when you received a reply after the initial assessment (if applicable)",
    "form.appointmentDate": "Appointment Date",
    "form.appointmentDateDescription": "Date of your appointment for fingerprints and document check",
    "form.returnDate": "Passport Return Date",
    "form.returnDateDescription": "Date when you received your passport back",
    "form.resultTitle": "Result Information",
    "form.resultStatus": "Result Status",
    "form.selectResult": "Select result",
    "form.resultStatusDescription": "The final outcome of your visa application",
    "form.validity": "Validity Period",
    "form.validityPlaceholder": "e.g. 90 days, 1 year",
    "form.validityDescription": "Duration of the visa validity",
    "form.entryType": "Entry Type",
    "form.selectEntryType": "Select entry type",
    "form.singleEntry": "Single Entry",
    "form.multipleEntry": "Multiple Entry",
    "form.entryTypeDescription": "Whether the visa allows single or multiple entries",
    "form.submit": "Submit",
    "form.submitting": "Submitting...",
    "form.successMessage": "Application submitted successfully",
    "form.successDescription": "Thank you for sharing your visa experience",
    "form.errorMessage": "An error occurred while submitting your application",
    
    // Footer
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.contact": "Contact",
    
    // Language Selection
    "language": "Language",
    "language.turkish": "Turkish",
    "language.english": "English",
    "language.german": "German",
    
    // Table
    "table.country": "Country",
    "table.city": "City",
    "table.purpose": "Purpose",
    "table.submissionDate": "Submission Date",
    "table.appointmentDate": "Appointment Date",
    "table.returnDate": "Return Date",
    "table.processingTime": "Processing Time",
    "table.result": "Result",
    "table.days": "Days",
    "table.approved": "Approved",
    "table.rejected": "Rejected",
    "table.pending": "Pending",
    "table.caption": "Recent Visa Application Results",
    
    // Discussions
    "discussions.title": "Visa Discussions",
    "discussions.subtitle": "Share your visa experiences and questions with other users",
    "discussions.comingSoon": "Discussion forum coming soon",
    "discussions.stayTuned": "Stay tuned for updates!",
  },
  de: {
    // General
    "appName": "Visum-Tracker Türkei",
    "home": "Startseite",
    "submitApplication": "Antrag einreichen",
    "reviewEntries": "Einträge überprüfen",
    "discussions": "Diskussionen",
    "seeAllData": "Alle Daten sehen",
    "madeWith": "erstellt mit",
    
    // Hero
    "hero.badge": "Informationen für türkische Staatsbürger",
    "hero.title": "Gemeinsam Visumantrags-Erfahrungen verfolgen",
    "hero.subtitle": "Diese Plattform dokumentiert den Visumantragsprozess und die Zeitpläne, die türkische Staatsbürger erleben. Durch das Teilen unserer gemeinsamen Erfahrungen hoffen wir, Transparenz in den Prozess zu bringen und uns für eine faire Behandlung einzusetzen.",
    "hero.crowdsourced": "Crowdsourced Daten",
    "hero.realExperiences": "Echte Erfahrungen",
    "hero.transparentProcess": "Transparenter Prozess",
    
    // Dashboard
    "dashboard.title": "Visumantrag-Dashboard",
    "dashboard.allCountries": "Alle Länder",
    "dashboard.totalApplications": "Gesamtanträge",
    "dashboard.avgProcessingTime": "Durchschn. Bearbeitungszeit",
    "dashboard.approvalRate": "Genehmigungsrate",
    "dashboard.latestApplication": "Neuester Antrag",
    "dashboard.processingTime": "Bearbeitungszeit",
    "dashboard.processingTimeDesc": "Tage von der Antragseinreichung bis zur Passrückgabe",
    "dashboard.applicationResults": "Antragsergebnisse",
    "dashboard.applicationResultsDesc": "Verteilung der Visumantragsergebnisse",
    "dashboard.days": "Tage",
    "dashboard.approved": "Genehmigt",
    "dashboard.rejected": "Abgelehnt",
    "dashboard.pending": "Ausstehend",
    "dashboard.worstCities": "Längste Wartezeiten",
    "dashboard.trends": "Trends der letzten 3 Monate",
    "dashboard.financialImpact": "Finanzielle Auswirkungen",
    "dashboard.totalAnnualApplications": "Jährliche Gesamtanträge",
    "dashboard.totalAnnualCost": "Jährliche Gesamtkosten",
    "dashboard.description": "von der Einreichung bis zum Ergebnis",
    
    // Recent Applications
    "recentApplications.title": "Neueste Anträge",
    "recentApplications.submit": "Teilen Sie Ihre Erfahrung",
    "recentApplications.noApplications": "Noch keine Anträge",
    "recentApplications.beFirst": "Seien Sie der Erste, der seine Visumantrags-Erfahrung teilt",
    "recentApplications.submitApplication": "Antrag einreichen",
    "recentApplications.last10": "Letzte 10 Anträge",
    
    // Submit Page
    "submit.title": "Teilen Sie Ihre Visum-Erfahrung",
    "submit.subtitle": "Helfen Sie anderen türkischen Staatsbürgern, indem Sie Ihre Visumantrags-Erfahrung teilen. Ihr Beitrag macht den Prozess für alle transparenter.",
    
    // Form
    "form.detailsTitle": "Antragsdetails",
    "form.detailsDescription": "Teilen Sie die grundlegenden Informationen zu Ihrem Visumantrag",
    "form.country": "Land",
    "form.selectCountry": "Land auswählen",
    "form.countryDescription": "Das Land, für das Sie ein Visum beantragt haben",
    "form.city": "Stadt",
    "form.selectCity": "Stadt auswählen",
    "form.cityDescription": "Der VFS- oder Konsulatsstandort, an dem Sie den Antrag gestellt haben",
    "form.duration": "Besuchsdauer",
    "form.durationPlaceholder": "z.B. 90 Tage, 6 Monate",
    "form.durationDescription": "Anzahl der Tage oder Monate, die für das Visum beantragt wurden",
    "form.purpose": "Besuchszweck",
    "form.selectPurpose": "Zweck auswählen",
    "form.purposeDescription": "Der Hauptgrund für den Visumantrag",
    "form.submitDate": "Einreichungsdatum",
    "form.pickDate": "Datum auswählen",
    "form.submitDateDescription": "Datum, an dem alle Dokumente und der Antrag eingereicht wurden",
    "form.replyDate": "iData-Antwortdatum",
    "form.replyDateDescription": "Datum, an dem Sie nach der ersten Bewertung eine Antwort erhalten haben (falls zutreffend)",
    "form.appointmentDate": "Termindatum",
    "form.appointmentDateDescription": "Datum Ihres Termins für Fingerabdrücke und Dokumentenprüfung",
    "form.returnDate": "Passrückgabedatum",
    "form.returnDateDescription": "Datum, an dem Sie Ihren Pass zurückerhalten haben",
    "form.resultTitle": "Ergebnisinformationen",
    "form.resultStatus": "Ergebnisstatus",
    "form.selectResult": "Ergebnis auswählen",
    "form.resultStatusDescription": "Das endgültige Ergebnis Ihres Visumantrags",
    "form.validity": "Gültigkeitszeitraum",
    "form.validityPlaceholder": "z.B. 90 Tage, 1 Jahr",
    "form.validityDescription": "Dauer der Visumgültigkeit",
    "form.entryType": "Einreisetyp",
    "form.selectEntryType": "Einreisetyp auswählen",
    "form.singleEntry": "Einmalige Einreise",
    "form.multipleEntry": "Mehrfache Einreise",
    "form.entryTypeDescription": "Ob das Visum einmalige oder mehrfache Einreisen ermöglicht",
    "form.submit": "Einreichen",
    "form.submitting": "Wird eingereicht...",
    "form.successMessage": "Antrag erfolgreich eingereicht",
    "form.successDescription": "Vielen Dank für das Teilen Ihrer Visumerfahrung",
    "form.errorMessage": "Beim Einreichen Ihres Antrags ist ein Fehler aufgetreten",
    
    // Footer
    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.privacy": "Datenschutzrichtlinie",
    "footer.terms": "Nutzungsbedingungen",
    "footer.contact": "Kontakt",
    
    // Language Selection
    "language": "Sprache",
    "language.turkish": "Türkisch",
    "language.english": "Englisch",
    "language.german": "Deutsch",
    
    // Table
    "table.country": "Land",
    "table.city": "Stadt",
    "table.purpose": "Zweck",
    "table.submissionDate": "Einreichungsdatum",
    "table.appointmentDate": "Termindatum",
    "table.returnDate": "Rückgabedatum",
    "table.processingTime": "Bearbeitungszeit",
    "table.result": "Ergebnis",
    "table.days": "Tage",
    "table.approved": "Genehmigt",
    "table.rejected": "Abgelehnt",
    "table.pending": "Ausstehend",
    "table.caption": "Aktuelle Visumantrags-Ergebnisse",
    
    // Discussions
    "discussions.title": "Visum-Diskussionen",
    "discussions.subtitle": "Teilen Sie Ihre Visumerfahrungen und Fragen mit anderen Benutzern",
    "discussions.comingSoon": "Diskussionsforum kommt bald",
    "discussions.stayTuned": "Bleiben Sie dran für Updates!",
  }
};

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get the language from localStorage or use 'tr' as default
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'tr';
  });

  useEffect(() => {
    // Save the language preference to localStorage
    localStorage.setItem('language', language);
    // Set the html lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
