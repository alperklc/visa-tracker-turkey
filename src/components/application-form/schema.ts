
import * as z from 'zod';
import { Country } from '@/types/countries';
import { ApplicationCenterCity, PurposeOfVisit } from '@/types/enums';

// Define the map of Turkish cities to countries they serve (consulates/embassies)
export const cityToCountriesMap: Record<ApplicationCenterCity, Country[]> = {
  [ApplicationCenterCity.Istanbul]: [
    Country.Germany, 
    Country.France, 
    Country.Italy, 
    Country.UnitedKingdom, 
    Country.UnitedStates, 
    Country.Greece, 
    Country.Netherlands,
    Country.Spain,
    Country.Russia
  ],
  [ApplicationCenterCity.Ankara]: [
    Country.Germany,
    Country.UnitedStates,
    Country.France,
    Country.UnitedKingdom,
    Country.Italy,
    Country.Canada,
    Country.Spain,
    Country.Australia,
    Country.Poland,
    Country.Netherlands,
    Country.Sweden,
    Country.Switzerland
  ],
  [ApplicationCenterCity.Izmir]: [
    Country.Germany,
    Country.Greece,
    Country.France,
    Country.Italy,
    Country.Netherlands
  ],
  [ApplicationCenterCity.Antalya]: [
    Country.Germany,
    Country.Russia,
    Country.UnitedKingdom
  ],
  [ApplicationCenterCity.Bodrum]: [
    Country.UnitedKingdom,
    Country.Germany
  ],
  [ApplicationCenterCity.Gaziantep]: [
    Country.UnitedStates,
    Country.Germany,
    Country.France
  ],
  [ApplicationCenterCity.Moscow]: [Country.Turkey],
  [ApplicationCenterCity.SaintPetersburg]: [Country.Turkey],
  [ApplicationCenterCity.Caracas]: [Country.Turkey],
  [ApplicationCenterCity.Tbilisi]: [Country.Turkey],
  [ApplicationCenterCity.Batumi]: [Country.Turkey],
  [ApplicationCenterCity.Skopje]: [Country.Turkey],
  [ApplicationCenterCity.Chisinau]: [Country.Turkey],
};

// Form validation schema
export const applicationSchema = z.object({
  // Application Details
  country: z.string({
    required_error: "Please select a country",
  }),
  city: z.string({
    required_error: "Please select a city",
  }),
  duration: z.coerce.number().min(1, {
    message: "Duration must be at least 1 day",
  }).max(365, {
    message: "Duration cannot exceed 365 days",
  }),
  purpose: z.string({
    required_error: "Please select a purpose",
  }),
  
  // Appointment Details
  submissionDate: z.date({
    required_error: "Please select a submission date",
  }).refine(date => date <= new Date(), {
    message: "Submission date cannot be in the future",
  }),
  appointmentDate: z.date().optional()
    .refine(date => !date || date <= new Date(), {
      message: "Appointment date cannot be in the future",
    }),
  sameAppointmentDate: z.boolean().default(true),
  
  // Result Details
  passportReturned: z.boolean().default(true), // Always true now
  returnDate: z.date({
    required_error: "Please select a return date",
  }).refine(date => date <= new Date(), {
    message: "Return date cannot be in the future",
  }),
  resultStatus: z.string({
    required_error: "Please select a result status",
  }),
  validity: z.string().optional(),
  entryType: z.string().optional(),
  rejectionReason: z.string().optional(),
  visaEndDate: z.date().optional()
    .refine(date => !date || date <= new Date().setFullYear(new Date().getFullYear() + 10), {
      message: "Visa end date cannot be more than 10 years in the future",
    }),
  visaStartDate: z.date().optional()
    .refine(date => !date || date <= new Date().setFullYear(new Date().getFullYear() + 10), {
      message: "Visa start date cannot be more than 10 years in the future",
    }),
  
  // Captcha
  captcha: z.string().min(1, {
    message: "Please complete the captcha verification"
  }),
}).refine(
  // Ensure appointment date is after or equal to submission date
  (data) => {
    if (data.sameAppointmentDate) return true;
    if (data.appointmentDate && data.submissionDate) {
      return data.appointmentDate >= data.submissionDate;
    }
    return true;
  },
  {
    message: "Appointment date must be on or after the submission date",
    path: ["appointmentDate"],
  }
).refine(
  // Ensure return date is after or equal to submission date
  (data) => {
    if (data.returnDate && data.submissionDate) {
      return data.returnDate >= data.submissionDate;
    }
    return true;
  },
  {
    message: "Return date must be on or after the submission date",
    path: ["returnDate"],
  }
).refine(
  // Validate visa start and end dates
  (data) => {
    if (data.visaStartDate && data.visaEndDate) {
      return data.visaStartDate <= data.visaEndDate;
    }
    return true;
  },
  {
    message: "Visa start date cannot be after visa end date",
    path: ["visaStartDate"],
  }
);

// Export the form type
export type ApplicationForm = z.infer<typeof applicationSchema>;
export type FormValues = ApplicationForm; // Alias for compatibility
