
import React from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/lib/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CountryFlag from '@/components/CountryFlag';
import { Country } from '@/lib/types';
import StatsGridCard from '@/components/dashboard/StatsGridCard';

const Facts: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="container py-12 animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">{t('facts.title')}</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t('facts.subtitle')}
          </p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-8">
          <TabsList className="flex justify-center mb-8">
            <TabsTrigger value="general">{t('facts.general')}</TabsTrigger>
            <TabsTrigger value="schengen">{t('facts.schengen')}</TabsTrigger>
            <TabsTrigger value="comparison">{t('facts.comparison')}</TabsTrigger>
            <TabsTrigger value="fees">{t('facts.fees')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('facts.visaRequirements')}</CardTitle>
                <CardDescription>{t('facts.visaRequirementsDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>{t('facts.visaTableCaption')}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('facts.country')}</TableHead>
                      <TableHead>{t('facts.requiresVisa')}</TableHead>
                      <TableHead>{t('facts.processingTime')}</TableHead>
                      <TableHead>{t('facts.notes')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { country: Country.Germany, requires: true, time: "15-30", notes: t('facts.schengenRules') },
                      { country: Country.France, requires: true, time: "15-30", notes: t('facts.schengenRules') },
                      { country: Country.Italy, requires: true, time: "15-30", notes: t('facts.schengenRules') },
                      { country: Country.Spain, requires: true, time: "15-30", notes: t('facts.schengenRules') },
                      { country: Country.UnitedKingdom, requires: true, time: "15-25", notes: t('facts.separateApplication') },
                      { country: Country.UnitedStates, requires: true, time: "60-180", notes: t('facts.longProcessing') },
                      { country: Country.Australia, requires: true, time: "20-40", notes: t('facts.electronicVisa') },
                    ].map((item) => (
                      <TableRow key={item.country}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CountryFlag country={item.country} size={20} />
                            {item.country}
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.requires ? 
                            <Badge variant="destructive">{t('facts.yes')}</Badge> : 
                            <Badge variant="outline">{t('facts.no')}</Badge>
                          }
                        </TableCell>
                        <TableCell>{item.time} {t('facts.days')}</TableCell>
                        <TableCell>{item.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schengen" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('facts.schengenFacts')}</CardTitle>
                <CardDescription>{t('facts.schengenFactsDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{t('facts.schengenMembers')}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        Country.Germany, Country.France, Country.Italy, Country.Spain, 
                        Country.Austria, Country.Belgium, Country.Denmark, Country.Finland,
                        Country.Greece, Country.Netherlands, Country.Portugal, Country.Sweden
                      ].map((country) => (
                        <div key={country} className="flex items-center gap-2">
                          <CountryFlag country={country} size={18} />
                          <span className="text-sm">{country}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{t('facts.schengenRules')}</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• {t('facts.schengenRule1')}</li>
                      <li>• {t('facts.schengenRule2')}</li>
                      <li>• {t('facts.schengenRule3')}</li>
                      <li>• {t('facts.schengenRule4')}</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4">{t('facts.schengenVisaFree')}</h3>
                  <p className="mb-4">{t('facts.schengenVisaFreeDesc')}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {["Albania", "Andorra", "Argentina", "Australia", "Bosnia and Herzegovina", "Brazil", "Brunei", "Canada", "Chile", "Colombia", "Costa Rica", "El Salvador", "Georgia", "Guatemala", "Honduras", "Hong Kong", "Israel", "Japan", "Malaysia", "Mexico", "Moldova", "Monaco", "Montenegro", "New Zealand", "Nicaragua", "North Macedonia", "Panama", "Paraguay", "Peru", "San Marino", "Serbia", "Singapore", "South Korea", "Taiwan", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Vatican City", "Venezuela"].map((country) => (
                      <div key={country} className="flex items-center gap-2 bg-green-50 rounded-lg px-2 py-1 text-sm border border-green-100">
                        {country}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('facts.comparisonTitle')}</CardTitle>
                <CardDescription>{t('facts.comparisonDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">{t('facts.aspect')}</TableHead>
                        <TableHead>
                          <div className="flex items-center gap-2">
                            <span>🇹🇷</span> {t('facts.turkey')}
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-2">
                            <span>🇻🇪</span> {t('facts.venezuela')}
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-2">
                            <span>🇷🇺</span> {t('facts.russia')}
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-2">
                            <span>🇬🇪</span> {t('facts.georgia')}
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-2">
                            <span>🇧🇦</span> {t('facts.bosnia')}
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-2">
                            <span>🇿🇦</span> {t('facts.southAfrica')}
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">{t('facts.schengenVisa')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-green-50">{t('facts.notRequired')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-green-50">{t('facts.notRequired')}</TableCell>
                        <TableCell className="bg-green-50">{t('facts.notRequired')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('facts.schengenFee')}</TableCell>
                        <TableCell>€90</TableCell>
                        <TableCell>€0</TableCell>
                        <TableCell>€90</TableCell>
                        <TableCell>€0</TableCell>
                        <TableCell>€0</TableCell>
                        <TableCell>€80</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('facts.ukVisa')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('facts.usVisa')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('facts.visaFreeCountries')}</TableCell>
                        <TableCell>110+</TableCell>
                        <TableCell>130+</TableCell>
                        <TableCell>80+</TableCell>
                        <TableCell>115+</TableCell>
                        <TableCell>120+</TableCell>
                        <TableCell>100+</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('facts.gdpPerCapita')}</TableCell>
                        <TableCell>$9,600</TableCell>
                        <TableCell>$3,800</TableCell>
                        <TableCell>$12,200</TableCell>
                        <TableCell>$5,700</TableCell>
                        <TableCell>$7,100</TableCell>
                        <TableCell>$6,900</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('facts.population')}</TableCell>
                        <TableCell>85M</TableCell>
                        <TableCell>28M</TableCell>
                        <TableCell>144M</TableCell>
                        <TableCell>3.7M</TableCell>
                        <TableCell>3.2M</TableCell>
                        <TableCell>60M</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
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
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="font-semibold mb-2">{t('facts.bosniaFact')}</p>
                  <p>{t('facts.bosniaFactDesc')}</p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="font-semibold mb-2">{t('facts.southAfricaFact')}</p>
                  <p>{t('facts.southAfricaFactDesc')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="fees" className="space-y-6">
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
                        <div className="font-medium">{t('facts.schengen')}</div>
                        <div className="text-sm text-muted-foreground">{t('facts.allSchengenCountries')}</div>
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Facts;
