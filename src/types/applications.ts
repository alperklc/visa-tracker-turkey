
import { ApplicationCenterCity, PurposeOfVisit, VisaResultStatus, EntryType } from './enums';
import { Country } from './countries';

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
