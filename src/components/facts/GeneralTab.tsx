
import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const GeneralTab: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('facts.visaRequirements')}</CardTitle>
          <CardDescription>{t('facts.visaRequirementsDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative w-full">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/35/Visa_requirements_for_Turkish_citizens.svg"
                alt="Visa requirements for Turkish citizens world map"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#002377]"></div>
                <span>{t('facts.turkeyRepublic')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#1191E5]"></div>
                <span>{t('facts.idCardTravel')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#22B14C]"></div>
                <span>{t('facts.noVisaRequired')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#B5E61D]"></div>
                <span>{t('facts.visaOnArrival')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#61C7A1]"></div>
                <span>{t('facts.eVisa')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#79D343]"></div>
                <span>{t('facts.visaAvailableBoth')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#C0C0C0]"></div>
                <span>{t('facts.visaRequired')}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralTab;
