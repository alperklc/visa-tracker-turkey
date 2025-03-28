
import { 
  VisaApplication, 
  Country, 
  ApplicationCenterCity, 
  PurposeOfVisit, 
  VisaResultStatus, 
  EntryType 
} from "@/lib/types";

// Mock initial data (would be replaced with API calls in a real implementation)
export const initialApplications: VisaApplication[] = [
  {
    id: "1",
    country: Country.Germany,
    city: ApplicationCenterCity.Istanbul,
    durationOfVisit: "90 days",
    purposeOfVisit: PurposeOfVisit.Tourism,
    applicationSubmitDate: new Date(2023, 4, 15),
    idataReplyDate: new Date(2023, 4, 20),
    appointmentDate: new Date(2023, 5, 10),
    passportReturnDate: new Date(2023, 5, 25),
    result: {
      status: VisaResultStatus.Approved,
      validity: "90 days",
      entryType: EntryType.Multiple
    },
    createdAt: new Date(2023, 4, 15)
  },
  {
    id: "2",
    country: Country.Italy,
    city: ApplicationCenterCity.Ankara,
    durationOfVisit: "30 days",
    purposeOfVisit: PurposeOfVisit.Business,
    applicationSubmitDate: new Date(2023, 3, 10),
    idataReplyDate: new Date(2023, 3, 15),
    appointmentDate: new Date(2023, 4, 5),
    passportReturnDate: new Date(2023, 4, 20),
    result: {
      status: VisaResultStatus.Approved,
      validity: "30 days",
      entryType: EntryType.Single
    },
    createdAt: new Date(2023, 3, 10)
  },
  {
    id: "3",
    country: Country.France,
    city: ApplicationCenterCity.Istanbul,
    durationOfVisit: "60 days",
    purposeOfVisit: PurposeOfVisit.Study,
    applicationSubmitDate: new Date(2023, 5, 1),
    idataReplyDate: new Date(2023, 5, 7),
    appointmentDate: new Date(2023, 6, 1),
    passportReturnDate: null,
    result: {
      status: VisaResultStatus.Pending
    },
    createdAt: new Date(2023, 5, 1)
  },
  {
    id: "4",
    country: Country.UnitedKingdom,
    city: ApplicationCenterCity.Izmir,
    durationOfVisit: "180 days",
    purposeOfVisit: PurposeOfVisit.Work,
    applicationSubmitDate: new Date(2023, 2, 15),
    idataReplyDate: new Date(2023, 2, 22),
    appointmentDate: new Date(2023, 3, 10),
    passportReturnDate: new Date(2023, 3, 25),
    result: {
      status: VisaResultStatus.Rejected
    },
    createdAt: new Date(2023, 2, 15)
  },
  {
    id: "5",
    country: Country.UnitedStates,
    city: ApplicationCenterCity.Ankara,
    durationOfVisit: "90 days",
    purposeOfVisit: PurposeOfVisit.Tourism,
    applicationSubmitDate: new Date(2023, 6, 10),
    idataReplyDate: new Date(2023, 6, 15),
    appointmentDate: new Date(2023, 7, 5),
    passportReturnDate: new Date(2023, 7, 30),
    result: {
      status: VisaResultStatus.Approved,
      validity: "90 days",
      entryType: EntryType.Single
    },
    createdAt: new Date(2023, 6, 10)
  },
  {
    id: "6",
    country: Country.Netherlands,
    city: ApplicationCenterCity.Istanbul,
    durationOfVisit: "60 days",
    purposeOfVisit: PurposeOfVisit.Business,
    applicationSubmitDate: new Date(2023, 7, 20),
    idataReplyDate: new Date(2023, 7, 25),
    appointmentDate: new Date(2023, 8, 15),
    passportReturnDate: new Date(2023, 8, 30),
    result: {
      status: VisaResultStatus.Approved,
      validity: "60 days",
      entryType: EntryType.Multiple
    },
    createdAt: new Date(2023, 7, 20)
  },
  {
    id: "7",
    country: Country.Canada,
    city: ApplicationCenterCity.Izmir,
    durationOfVisit: "180 days",
    purposeOfVisit: PurposeOfVisit.Study,
    applicationSubmitDate: new Date(2023, 8, 5),
    idataReplyDate: new Date(2023, 8, 12),
    appointmentDate: new Date(2023, 9, 3),
    passportReturnDate: new Date(2023, 9, 25),
    result: {
      status: VisaResultStatus.Approved,
      validity: "180 days",
      entryType: EntryType.Multiple
    },
    createdAt: new Date(2023, 8, 5)
  },
  {
    id: "8",
    country: Country.Spain,
    city: ApplicationCenterCity.Ankara,
    durationOfVisit: "90 days",
    purposeOfVisit: PurposeOfVisit.Tourism,
    applicationSubmitDate: new Date(2023, 9, 10),
    idataReplyDate: new Date(2023, 9, 15),
    appointmentDate: new Date(2023, 10, 1),
    passportReturnDate: new Date(2023, 10, 20),
    result: {
      status: VisaResultStatus.Approved,
      validity: "90 days",
      entryType: EntryType.Multiple
    },
    createdAt: new Date(2023, 9, 10)
  },
  {
    id: "9",
    country: Country.Australia,
    city: ApplicationCenterCity.Istanbul,
    durationOfVisit: "12 months",
    purposeOfVisit: PurposeOfVisit.Work,
    applicationSubmitDate: new Date(2023, 10, 5),
    idataReplyDate: new Date(2023, 10, 15),
    appointmentDate: new Date(2023, 11, 1),
    passportReturnDate: new Date(2023, 11, 30),
    result: {
      status: VisaResultStatus.Approved,
      validity: "12 months",
      entryType: EntryType.Multiple
    },
    createdAt: new Date(2023, 10, 5)
  },
  {
    id: "10",
    country: Country.NewZealand,
    city: ApplicationCenterCity.Ankara,
    durationOfVisit: "6 months",
    purposeOfVisit: PurposeOfVisit.Tourism,
    applicationSubmitDate: new Date(2023, 11, 1),
    idataReplyDate: new Date(2023, 11, 10),
    appointmentDate: new Date(2023, 11, 20),
    passportReturnDate: new Date(2023, 11, 30),
    result: {
      status: VisaResultStatus.Approved,
      validity: "6 months",
      entryType: EntryType.Multiple
    },
    createdAt: new Date(2023, 11, 1)
  }
];
