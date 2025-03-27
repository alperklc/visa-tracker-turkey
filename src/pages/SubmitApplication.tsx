
import React from 'react';
import Layout from '@/components/Layout';
import ApplicationForm from '@/components/ApplicationForm';

const SubmitApplication: React.FC = () => {
  return (
    <Layout className="py-12">
      <div className="container max-w-4xl">
        <div className="text-center mb-12 animate-slide-down">
          <h1 className="text-3xl font-bold mb-4">Share Your Visa Experience</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help other Turkish citizens by sharing your visa application experience. 
            Your contribution makes the process more transparent for everyone.
          </p>
        </div>
        
        <ApplicationForm />
      </div>
    </Layout>
  );
};

export default SubmitApplication;
