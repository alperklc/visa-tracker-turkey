
import * as z from 'zod';
import { 
  Country, 
  ApplicationCenterCity, 
  PurposeOfVisit, 
  VisaResultStatus, 
  EntryType 
} from '@/lib/types';

export const formSchema = z.object({
  city: z.nativeEnum(ApplicationCenterCity, {
    required_error: 'Please select a city.',
  }),
  country: z.nativeEnum(Country, {
    required_error: 'Please select a country.',
  }),
  durationOfVisit: z.string().min(1, {
    message: 'Please enter the duration of your visit.',
  }),
  purposeOfVisit: z.nativeEnum(PurposeOfVisit, {
    required_error: 'Please select the purpose of your visit.',
  }),
  applicationSubmitDate: z.date({
    required_error: 'Please select the application submission date.',
  }),
  sameAppointmentDate: z.boolean().default(false),
  appointmentDate: z.date().nullable().optional(),
  resultStatus: z.nativeEnum(VisaResultStatus, {
    required_error: 'Please select the result status.',
  }),
  validity: z.string().nullable().optional(),
  entryType: z.nativeEnum(EntryType).nullable().optional(),
  rejectionReason: z.string().nullable().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

// City to available countries mapping
export const cityToCountriesMap: Record<ApplicationCenterCity, Country[]> = {
  [ApplicationCenterCity.Istanbul]: Object.values(Country),
  [ApplicationCenterCity.Ankara]: [Country.Germany, Country.France, Country.Italy, Country.Spain, Country.UnitedKingdom, Country.Netherlands, Country.Belgium],
  [ApplicationCenterCity.Izmir]: [Country.Germany, Country.Italy, Country.Netherlands, Country.Greece],
  [ApplicationCenterCity.Antalya]: [Country.Germany, Country.Russia, Country.Netherlands],
  [ApplicationCenterCity.Bodrum]: [Country.UnitedKingdom, Country.Germany],
  [ApplicationCenterCity.Gaziantep]: [Country.Germany, Country.France],
};
