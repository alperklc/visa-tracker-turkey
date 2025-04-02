
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KeyDifferencesProps {
  t: (key: string) => string;
}

const KeyDifferences: React.FC<KeyDifferencesProps> = ({ t }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('facts.keyDifferences')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-amber-50 rounded-lg">
          <p className="font-semibold mb-2">{t('facts.venezuelaFact')}</p>
          <p>{t('facts.venezuelaFactDesc')}</p>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="font-semibold mb-2">{t('facts.russiaFact')}</p>
          <p>{t('facts.russiaFactDesc')}</p>
        </div>
        
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="font-semibold mb-2">{t('facts.turkeyFact')}</p>
          <p>{t('facts.turkeyFactDesc')}</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="font-semibold mb-2">{t('facts.georgiaFact')}</p>
          <p>{t('facts.georgiaFactDesc')}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyDifferences;
