
import { ApplicationStats, Country, VisaApplication } from "@/lib/types";

export const calculateStats = (apps: VisaApplication[]): ApplicationStats => {
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

  return {
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
  };
};
