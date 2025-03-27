
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
    
    // Submit Page
    "submit.title": "Vize Deneyiminizi Paylaşın",
    "submit.subtitle": "Vize başvuru deneyiminizi paylaşarak diğer Türk vatandaşlarına yardımcı olun. Katkınız, herkes için süreci daha şeffaf hale getirir.",
    
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
  },
  en: {
    // General
    "appName": "Visa Tracker Turkey",
    "home": "Home",
    "submitApplication": "Submit Application",
    "reviewEntries": "Review Entries",
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
    
    // Submit Page
    "submit.title": "Share Your Visa Experience",
    "submit.subtitle": "Help other Turkish citizens by sharing your visa application experience. Your contribution makes the process more transparent for everyone.",
    
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
  },
  de: {
    // General
    "appName": "Visum-Tracker Türkei",
    "home": "Startseite",
    "submitApplication": "Antrag einreichen",
    "reviewEntries": "Einträge überprüfen",
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
    
    // Submit Page
    "submit.title": "Teilen Sie Ihre Visum-Erfahrung",
    "submit.subtitle": "Helfen Sie anderen türkischen Staatsbürgern, indem Sie Ihre Visumantrags-Erfahrung teilen. Ihr Beitrag macht den Prozess für alle transparenter.",
    
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
