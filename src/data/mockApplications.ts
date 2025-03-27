
import { VisaApplication } from "@/lib/types";

// Mock initial data (would be replaced with API calls in a real implementation)
export const initialApplications: VisaApplication[] = [
  {
    id: "1",
    country: "Germany",
    city: "Istanbul",
    durationOfVisit: "90 days",
    purposeOfVisit: "Tourism",
    applicationSubmitDate: new Date(2023, 4, 15),
    idataReplyDate: new Date(2023, 4, 20),
    appointmentDate: new Date(2023, 5, 10),
    passportReturnDate: new Date(2023, 5, 25),
    result: {
      status: "Approved",
      validity: "90 days",
      entryType: "Multiple"
    },
    createdAt: new Date(2023, 4, 15)
  },
  {
    id: "2",
    country: "Italy",
    city: "Ankara",
    durationOfVisit: "30 days",
    purposeOfVisit: "Business",
    applicationSubmitDate: new Date(2023, 3, 10),
    idataReplyDate: new Date(2023, 3, 15),
    appointmentDate: new Date(2023, 4, 5),
    passportReturnDate: new Date(2023, 4, 20),
    result: {
      status: "Approved",
      validity: "30 days",
      entryType: "Single"
    },
    createdAt: new Date(2023, 3, 10)
  },
  {
    id: "3",
    country: "Germany",
    city: "Istanbul",
    durationOfVisit: "60 days",
    purposeOfVisit: "Education",
    applicationSubmitDate: new Date(2023, 5, 1),
    idataReplyDate: new Date(2023, 5, 7),
    appointmentDate: new Date(2023, 6, 1),
    passportReturnDate: null,
    result: {
      status: "Pending"
    },
    createdAt: new Date(2023, 5, 1)
  },
  {
    id: "4",
    country: "Italy",
    city: "Izmir",
    durationOfVisit: "180 days",
    purposeOfVisit: "Work",
    applicationSubmitDate: new Date(2023, 2, 15),
    idataReplyDate: new Date(2023, 2, 22),
    appointmentDate: new Date(2023, 3, 10),
    passportReturnDate: new Date(2023, 3, 25),
    result: {
      status: "Rejected"
    },
    createdAt: new Date(2023, 2, 15)
  },
  {
    id: "5",
    country: "Germany",
    city: "Ankara",
    durationOfVisit: "90 days",
    purposeOfVisit: "Tourism",
    applicationSubmitDate: new Date(2023, 6, 10),
    idataReplyDate: new Date(2023, 6, 15),
    appointmentDate: new Date(2023, 7, 5),
    passportReturnDate: new Date(2023, 7, 30),
    result: {
      status: "Approved",
      validity: "90 days",
      entryType: "Single"
    },
    createdAt: new Date(2023, 6, 10)
  },
  {
    id: "6",
    country: "Italy",
    city: "Istanbul",
    durationOfVisit: "60 days",
    purposeOfVisit: "Business",
    applicationSubmitDate: new Date(2023, 7, 20),
    idataReplyDate: new Date(2023, 7, 25),
    appointmentDate: new Date(2023, 8, 15),
    passportReturnDate: new Date(2023, 8, 30),
    result: {
      status: "Approved",
      validity: "60 days",
      entryType: "Multiple"
    },
    createdAt: new Date(2023, 7, 20)
  },
  {
    id: "7",
    country: "Germany",
    city: "Izmir",
    durationOfVisit: "180 days",
    purposeOfVisit: "Education",
    applicationSubmitDate: new Date(2023, 8, 5),
    idataReplyDate: new Date(2023, 8, 12),
    appointmentDate: new Date(2023, 9, 3),
    passportReturnDate: new Date(2023, 9, 25),
    result: {
      status: "Approved",
      validity: "180 days",
      entryType: "Multiple"
    },
    createdAt: new Date(2023, 8, 5)
  }
];
