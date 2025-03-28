
import { useState, useEffect } from "react";
import { VisaApplication, Country } from "@/lib/types";
import { initialApplications } from "@/data/mockApplications";
import { calculateStats } from "@/utils/applicationStats";

export const useApplications = () => {
  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [stats, setStats] = useState(calculateStats([]));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setApplications(initialApplications);
        setStats(calculateStats(initialApplications));
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addApplication = (newApplication: Omit<VisaApplication, "id" | "createdAt">) => {
    const applicationWithId: VisaApplication = {
      ...newApplication,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };

    const updatedApplications = [...applications, applicationWithId];
    setApplications(updatedApplications);
    setStats(calculateStats(updatedApplications));

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
