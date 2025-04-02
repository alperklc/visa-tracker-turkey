
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

      // The proper way to use URL parameters with supabase functions
      const url = `get-applications?${params.toString()}`;
      const { data: responseData, error } = await supabase.functions.invoke(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      const response = responseData as ApplicationsResponse;
      
      // Convert dates from strings to Date objects
      const formattedApplications = response.data.map(app => ({
        ...app,
        applicationSubmitDate: new Date(app.submission_date),
        appointmentDate: app.appointment_date ? new Date(app.appointment_date) : null,
        passportReturnDate: app.return_date ? new Date(app.return_date) : null,
        result: app.result_status ? {
          status: app.result_status,
          validity: app.validity,
          entryType: app.entry_type,
          rejectionReason: app.rejection_reason
        } : null,
        createdAt: new Date(app.created_at)
      }));

      setApplications(formattedApplications);
      setPagination(response.pagination);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch applications'));
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
