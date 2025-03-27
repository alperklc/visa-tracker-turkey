
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

export const useApplications = () => {
  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [stats, setStats] = useState<ApplicationStats>({
    totalApplications: 0,
    byCountry: { Germany: 0, Italy: 0 },
    averageProcessingDays: 0,
    approvalRate: 0,
    citiesProcessingTime: [],
    trendsLastThreeMonths: [],
    totalAnnualApplications: 85000, // Estimated number of applications per year
    totalAnnualCost: 25500000, // Estimated total cost in euros (85000 * 300€ average cost)
    worstCities: []
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

    // Calculate processing time by city
    const cityProcessing: Record<string, {total: number, count: number}> = {};
    
    // Calculate monthly trends (last 3 months)
    const monthlyData: Record<string, {total: number, count: number}> = {};
    const now = new Date();
    
    // Get data for the last 3 months
    for (let i = 0; i < 3; i++) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = month.toLocaleString('default', { month: 'short', year: '2-digit' });
      monthlyData[monthStr] = { total: 0, count: 0 };
    }

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
        
        // Add to city processing stats
        if (!cityProcessing[app.city]) {
          cityProcessing[app.city] = { total: 0, count: 0 };
        }
        cityProcessing[app.city].total += processingTime;
        cityProcessing[app.city].count += 1;
        
        // Add to monthly trends if within last 3 months
        const appMonth = app.passportReturnDate.toLocaleString('default', { month: 'short', year: '2-digit' });
        if (monthlyData[appMonth]) {
          monthlyData[appMonth].total += processingTime;
          monthlyData[appMonth].count += 1;
        }
      }
    });
    
    // Calculate average processing time by city
    const citiesProcessingTime = Object.entries(cityProcessing).map(([city, data]) => ({
      city,
      days: Math.round(data.total / data.count)
    }));
    
    // Get worst cities (longest average processing times)
    const worstCities = [...citiesProcessingTime]
      .sort((a, b) => b.days - a.days)
      .slice(0, 5);
    
    // Calculate trends for last 3 months
    const trendsLastThreeMonths = Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        averageDays: data.count > 0 ? Math.round(data.total / data.count) : 0
      }))
      .reverse();

    setStats({
      totalApplications: apps.length,
      byCountry: countryCount,
      averageProcessingDays: completedApplications > 0 
        ? Math.round(totalProcessingDays / completedApplications) 
        : 0,
      approvalRate: completedApplications > 0 
        ? Math.round((approvedApplications / completedApplications) * 100) 
        : 0,
      citiesProcessingTime,
      trendsLastThreeMonths,
      totalAnnualApplications: 85000, // Estimated
      totalAnnualCost: 25500000, // Estimated (85000 * 300€)
      worstCities
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
