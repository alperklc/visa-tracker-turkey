
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';
import ApplicationCard from '@/components/ApplicationCard';
import { useApplications } from '@/hooks/useApplications';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const { applications, loading } = useApplications();
  
  // Display only the most recent 4 applications
  const recentApplications = [...applications]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 4);

  return (
    <Layout>
      <Hero />
      
      <section className="container py-16 animate-fade-in">
        <h2 className="text-3xl font-bold mb-8 text-center">Visa Application Dashboard</h2>
        <Dashboard />
      </section>
      
      <section className="container py-16 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Recent Applications</h2>
          <Link to="/submit">
            <Button variant="outline">
              Submit Your Experience
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse bg-muted rounded-lg"></div>
            ))}
          </div>
        ) : recentApplications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentApplications.map((application) => (
              <ApplicationCard 
                key={application.id} 
                application={application} 
                className="animate-slide-up"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to share your visa application experience
            </p>
            <Link to="/submit">
              <Button>Submit Application</Button>
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;
