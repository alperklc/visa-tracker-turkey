
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { VisaApplication } from '@/types';

interface ApplicationsResponse {
  data: any[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApplicationsFilter {
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  country?: string;
  purpose?: string;
  search?: string;
}

export const useApplicationsData = (initialFilter: Partial<ApplicationsFilter> = {}) => {
  const [filter, setFilter] = useState<ApplicationsFilter>({
    page: initialFilter.page || 1,
    pageSize: initialFilter.pageSize || 10,
    sortBy: initialFilter.sortBy || 'created_at',
    sortOrder: initialFilter.sortOrder || 'desc',
    country: initialFilter.country,
    purpose: initialFilter.purpose,
    search: initialFilter.search
  });
  
  const [applications, setApplications] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', filter.page.toString());
      params.append('pageSize', filter.pageSize.toString());
      params.append('sortBy', filter.sortBy);
      params.append('sortOrder', filter.sortOrder);
      
      if (filter.country) {
        params.append('country', filter.country);
      }
      
      if (filter.purpose) {
        params.append('purpose', filter.purpose);
      }
      
      if (filter.search) {
        params.append('search', filter.search);
      }

      // Fetch applications directly from the table as a temporary solution
      const { data, error } = await supabase
        .from('visa_applications')
        .select('*')
        .order(filter.sortBy, { ascending: filter.sortOrder === 'asc' })
        .range(
          (filter.page - 1) * filter.pageSize,
          filter.page * filter.pageSize - 1
        );

      if (error) {
        throw new Error(error.message);
      }

      // Get total count for pagination
      const { count, error: countError } = await supabase
        .from('visa_applications')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        console.warn('Error fetching count:', countError);
      }

      const totalCount = count || 0;
      const totalPages = Math.ceil(totalCount / filter.pageSize);

      // Set the applications and pagination
      setApplications(data || []);
      setPagination({
        page: filter.page,
        pageSize: filter.pageSize,
        total: totalCount,
        totalPages: totalPages > 0 ? totalPages : 1
      });
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch applications'));
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const updateFilter = (newFilter: Partial<ApplicationsFilter>) => {
    // If changing filters (not page), reset to page 1
    if (newFilter.country !== undefined || 
        newFilter.purpose !== undefined || 
        newFilter.search !== undefined || 
        newFilter.sortBy !== undefined || 
        newFilter.sortOrder !== undefined) {
      setFilter({ ...filter, ...newFilter, page: 1 });
    } else {
      setFilter({ ...filter, ...newFilter });
    }
  };

  return {
    applications,
    pagination,
    loading,
    error,
    filter,
    updateFilter,
    refresh: fetchApplications
  };
};
