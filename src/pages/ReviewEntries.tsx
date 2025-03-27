
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ApplicationCard from '@/components/ApplicationCard';
import ApplicationTable from '@/components/ApplicationTable';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Country } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import { ListFilter, Grid, Table as TableIcon } from 'lucide-react';

const ReviewEntries: React.FC = () => {
  const { applications, loading } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState<Country | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table');
  const { t } = useLanguage();
  
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
          <h1 className="text-3xl font-bold mb-4">{t('review.title')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('review.subtitle')}
          </p>
        </div>
        
        <div className="bg-accent/50 rounded-lg p-6 mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-1 block">{t('review.search')}</label>
              <Input
                type="text"
                placeholder={t('review.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">{t('review.filterCountry')}</label>
              <Select 
                value={filterCountry} 
                onValueChange={(value) => setFilterCountry(value as Country | 'All')}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('review.selectCountry')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">{t('review.allCountries')}</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="Italy">Italy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">{t('review.sortBy')}</label>
              <Select 
                value={sortBy} 
                onValueChange={(value) => setSortBy(value as 'newest' | 'oldest')}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('review.sortBy')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t('review.newestFirst')}</SelectItem>
                  <SelectItem value="oldest">{t('review.oldestFirst')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <div className="flex items-center space-x-2">
              <Button 
                variant={viewMode === 'cards' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                <Grid className="h-4 w-4 mr-2" />
                {t('review.cards')}
              </Button>
              <Button 
                variant={viewMode === 'table' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <TableIcon className="h-4 w-4 mr-2" />
                {t('review.table')}
              </Button>
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
          <>
            {viewMode === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApplications.map((application) => (
                  <ApplicationCard 
                    key={application.id} 
                    application={application} 
                    className="animate-slide-up"
                  />
                ))}
              </div>
            )}
            
            {viewMode === 'table' && (
              <div className="animate-fade-in">
                <ApplicationTable />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <h3 className="text-xl font-semibold mb-2">{t('review.noResults')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('review.tryAdjusting')}
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterCountry('All');
            }}>
              {t('review.clearFilters')}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReviewEntries;
