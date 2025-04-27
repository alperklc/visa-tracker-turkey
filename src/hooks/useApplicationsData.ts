
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
    sortBy: initialFilter.sortBy || 'return_date',
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

      // Call the edge function with the parameters
      const { data: responseData, error } = await supabase.functions.invoke(`get-applications?${params.toString()}`, {
        method: 'GET',
      });

      if (error) {
        throw new Error(error.message);
      }

      const response = responseData as ApplicationsResponse;
      
      if (!response || !response.data || !Array.isArray(response.data)) {
        console.error('Invalid response format:', response);
        throw new Error('Invalid response format from server');
      }
      
      // Convert dates from strings to Date objects and ensure all required fields exist
      const formattedApplications = response.data.map(app => {
        if (!app) return null;
        
        return {
          id: app.id || `temp-${Math.random().toString(36).substring(2, 9)}`,
          country: app.country || '',
          city: app.city || '',
          purpose: app.purpose || '',
          applicationSubmitDate: app.submission_date ? new Date(app.submission_date) : null,
          appointmentDate: app.appointment_date ? new Date(app.appointment_date) : null,
          passportReturnDate: app.return_date ? new Date(app.return_date) : null,
          result: app.result_status ? {
            status: app.result_status,
            validity: app.validity || '',
            entryType: app.entry_type || '',
            rejectionReason: app.rejection_reason || ''
          } : null,
          createdAt: app.created_at ? new Date(app.created_at) : new Date(),
          duration: app.duration || 0
        };
      }).filter(Boolean); // Remove any null entries

      setApplications(formattedApplications);
      setPagination(response.pagination || {
        page: filter.page,
        pageSize: filter.pageSize,
        total: formattedApplications.length,
        totalPages: Math.ceil(formattedApplications.length / filter.pageSize) || 1
      });
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch applications'));
      setApplications([]);
      setPagination({
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 1
      });
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
