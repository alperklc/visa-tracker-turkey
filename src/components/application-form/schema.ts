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
  }),
  appointmentDate: z.date().optional(),
  sameAppointmentDate: z.boolean().default(true),
  
  // Result Details
  passportReturned: z.boolean().default(false),
  returnDate: z.date().optional(),
  resultStatus: z.string().optional(),
  validity: z.string().optional(),
  entryType: z.string().optional(),
  rejectionReason: z.string().optional(),
  
  // Captcha
  captcha: z.string().min(1, {
    message: "Please complete the captcha verification"
  }),
});

// Export the form type
export type ApplicationForm = z.infer<typeof applicationSchema>;
export type FormValues = ApplicationForm; // Alias for compatibility
