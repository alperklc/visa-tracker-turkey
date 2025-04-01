
import * as z from 'zod';
import { Country, ApplicationCenterCity, PurposeOfVisit } from '@/lib/types';

// Define the map of cities to countries
export const cityToCountriesMap: Record<ApplicationCenterCity, Country[]> = {
  [ApplicationCenterCity.Istanbul]: [Country.Turkey],
  [ApplicationCenterCity.Ankara]: [Country.Turkey],
  [ApplicationCenterCity.Izmir]: [Country.Turkey],
  [ApplicationCenterCity.Antalya]: [Country.Turkey],
  [ApplicationCenterCity.Bodrum]: [Country.Turkey],
  [ApplicationCenterCity.Gaziantep]: [Country.Turkey],
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
