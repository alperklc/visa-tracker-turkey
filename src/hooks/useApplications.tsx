
import { useState, useEffect } from "react";
import { VisaApplication, ApplicationStats, Country } from "@/lib/types";

// Mock initial data (would be replaced with API calls in a real implementation)
const initialApplications: VisaApplication[] = [
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
  }
];

export const useApplications = () => {
  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [stats, setStats] = useState<ApplicationStats>({
    totalApplications: 0,
    byCountry: { Germany: 0, Italy: 0 },
    averageProcessingDays: 0,
    approvalRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setApplications(initialApplications);
        calculateStats(initialApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateStats = (apps: VisaApplication[]) => {
    const countryCount: Record<Country, number> = { Germany: 0, Italy: 0 };
    let totalProcessingDays = 0;
    let completedApplications = 0;
    let approvedApplications = 0;

    apps.forEach(app => {
      // Count by country
      countryCount[app.country]++;

      // Calculate processing time for completed applications
      if (app.passportReturnDate && app.applicationSubmitDate) {
        const processingTime = Math.floor(
          (app.passportReturnDate.getTime() - app.applicationSubmitDate.getTime()) / 
          (1000 * 60 * 60 * 24)
        );
        totalProcessingDays += processingTime;
        completedApplications++;

        // Count approved applications
        if (app.result && app.result.status === "Approved") {
          approvedApplications++;
        }
      }
    });

    setStats({
      totalApplications: apps.length,
      byCountry: countryCount,
      averageProcessingDays: completedApplications > 0 
        ? Math.round(totalProcessingDays / completedApplications) 
        : 0,
      approvalRate: completedApplications > 0 
        ? Math.round((approvedApplications / completedApplications) * 100) 
        : 0
    });
  };

  const addApplication = (newApplication: Omit<VisaApplication, "id" | "createdAt">) => {
    const applicationWithId: VisaApplication = {
      ...newApplication,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };

    const updatedApplications = [...applications, applicationWithId];
    setApplications(updatedApplications);
    calculateStats(updatedApplications);

    return applicationWithId;
  };

  const getFilteredApplications = (country?: Country) => {
    if (!country) return applications;
    return applications.filter(app => app.country === country);
  };

  return {
    applications,
    stats,
    loading,
    addApplication,
    getFilteredApplications
  };
};
