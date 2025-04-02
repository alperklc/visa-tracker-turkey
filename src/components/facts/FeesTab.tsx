
import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

const FeesTab: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('facts.visaFees')}</CardTitle>
          <CardDescription>{t('facts.visaFeesDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('facts.destination')}</TableHead>
                <TableHead>{t('facts.fee')}</TableHead>
                <TableHead>{t('facts.notes')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>🇪🇺</span>
                    <div className="font-medium">{t('facts.schengen')}</div>
                    <div className="text-sm text-muted-foreground">{t('facts.allSchengenCountries')}</div>
                  </div>
                </TableCell>
                <TableCell>€90</TableCell>
                <TableCell>{t('facts.standardFee')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>🇬🇧</span>
                    <div className="font-medium">{t('facts.unitedKingdom')}</div>
                  </div>
                </TableCell>
                <TableCell>£115 - £361</TableCell>
                <TableCell>{t('facts.ukFeeDesc')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>🇺🇸</span>
                    <div className="font-medium">{t('facts.unitedStates')}</div>
                  </div>
                </TableCell>
                <TableCell>$160</TableCell>
                <TableCell>{t('facts.usFeeDesc')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>🇨🇦</span>
                    <div className="font-medium">{t('facts.canada')}</div>
                  </div>
                </TableCell>
                <TableCell>CAD $100</TableCell>
                <TableCell>{t('facts.canadaFeeDesc')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>🇦🇺</span>
                    <div className="font-medium">{t('facts.australia')}</div>
                  </div>
                </TableCell>
                <TableCell>AUD $150</TableCell>
                <TableCell>{t('facts.australiaFeeDesc')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <div className="mt-6 p-4 bg-amber-50 rounded-lg">
            <h3 className="font-semibold mb-2">{t('facts.historicalChanges')}</h3>
            <p className="mb-4">{t('facts.historicalChangesDesc')}</p>
            
            <div className="space-y-2">
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-blue-50">2014</Badge>
                <span>{t('facts.fee2014')}</span>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-blue-50">2020</Badge>
                <span>{t('facts.fee2020')}</span>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-red-50">2022</Badge>
                <span>{t('facts.fee2022')}</span>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-red-50">2024</Badge>
                <span>2024: Standard visa fee increased to 90€</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeesTab;
