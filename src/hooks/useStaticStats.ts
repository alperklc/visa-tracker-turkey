
import { useState, useEffect } from 'react';

export interface StaticStats {
  totalApplications: number;
  averageWaitingDays: number;
  approvalRate: number;
  latestApplicationDate: string | null;
  latestApplications: any[];
  lastUpdated: string;
}

export const useStaticStats = () => {
  const [stats, setStats] = useState<StaticStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch the static JSON file
        const response = await fetch('/stats.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error loading stats:', err);
        setError(err instanceof Error ? err : new Error('Failed to load statistics'));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
