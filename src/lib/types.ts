
export type Country = "Germany" | "Italy";

export type VisaApplication = {
  id: string;
  country: Country;
  city: string;
  durationOfVisit: string; // In days or months
  purposeOfVisit: string;
  applicationSubmitDate: Date;
  idataReplyDate: Date | null;
  appointmentDate: Date | null;
  passportReturnDate: Date | null;
  result: VisaResult | null;
  createdAt: Date;
};

export type VisaResult = {
  status: "Approved" | "Rejected" | "Pending";
  validity?: string; // e.g. "90 days", "6 months"
  entryType?: "Single" | "Multiple";
};

export type ApplicationStats = {
  totalApplications: number;
  byCountry: Record<Country, number>;
  averageProcessingDays: number;
  approvalRate: number;
};
