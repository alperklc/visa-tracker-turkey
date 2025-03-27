
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ApplicationCard from '@/components/ApplicationCard';
import { useApplications } from '@/hooks/useApplications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Country } from '@/lib/types';

const ReviewEntries: React.FC = () => {
  const { applications, loading } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState<Country | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Filter applications
  const filteredApplications = applications
    .filter(app => {
      // Filter by country if not "All"
      if (filterCountry !== 'All' && app.country !== filterCountry) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          app.city.toLowerCase().includes(searchLower) ||
          app.purposeOfVisit.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by date
      if (sortBy === 'newest') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }
    });

  return (
    <Layout className="py-12">
      <div className="container">
        <div className="text-center mb-12 animate-slide-down">
          <h1 className="text-3xl font-bold mb-4">Review All Entries</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse and filter all submitted visa application experiences
          </p>
        </div>
        
        <div className="bg-accent/50 rounded-lg p-6 mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Search</label>
              <Input
                type="text"
                placeholder="Search by city or purpose..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Filter by Country</label>
              <Select 
                value={filterCountry} 
                onValueChange={(value) => setFilterCountry(value as Country | 'All')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Countries</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="Italy">Italy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Sort by</label>
              <Select 
                value={sortBy} 
                onValueChange={(value) => setSortBy(value as 'newest' | 'oldest')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse bg-muted rounded-lg"></div>
            ))}
          </div>
        ) : filteredApplications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApplications.map((application) => (
              <ApplicationCard 
                key={application.id} 
                application={application} 
                className="animate-slide-up"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <h3 className="text-xl font-semibold mb-2">No matching applications found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters to see more results
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterCountry('All');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReviewEntries;
