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
import { useIsMobile } from '@/lib/hooks';

const Facts: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  // Vize muafiyeti olan ülkelerin listesi ve ilgili dilbilgisi anahtarları
  const visaFreeCountries = [
    "countries.albania", "countries.andorra", "countries.argentina", "countries.australia", 
    "countries.bosniaandherzegovina", "countries.brazil", "countries.brunei", "countries.canada", 
    "countries.chile", "countries.colombia", "countries.costarica", "countries.elsalvador", 
    "countries.georgia", "countries.guatemala", "countries.honduras", "countries.hongkong", 
    "countries.israel", "countries.japan", "countries.malaysia", "countries.mexico", 
    "countries.moldova", "countries.monaco", "countries.montenegro", "countries.newzealand", 
    "countries.nicaragua", "countries.northmacedonia", "countries.panama", "countries.paraguay", 
    "countries.peru", "countries.sanmarino", "countries.serbia", "countries.singapore", 
    "countries.southkorea", "countries.taiwan", "countries.ukraine", "countries.unitedarabemirates", 
    "countries.unitedkingdom", "countries.unitedstates", "countries.uruguay", "countries.vaticancity", 
    "countries.venezuela"
  ];
  
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
                          <span className="text-sm">{t(`countries.${country.toLowerCase().replace(/\s+/g, '')}`)}</span>
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
                    {["Arnavutluk", "Andorra", "Arjantin", "Avustralya", "Bosna Hersek", "Brezilya", "Brunei", "Kanada", "Şili", "Kolombiya", "Kosta Rika", "El Salvador", "Gürcistan", "Guatemala", "Honduras", "Hong Kong", "İsrail", "Japonya", "Malezya", "Meksika", "Moldova", "Monako", "Karadağ", "Yeni Zelanda", "Nikaragua", "Kuzey Makedonya", "Panama", "Paraguay", "Peru", "San Marino", "Sırbistan", "Singapur", "Güney Kore", "Tayvan", "Ukrayna", "Birleşik Arap Emirlikleri", "Birleşik Krallık", "Amerika Birleşik Devletleri", "Uruguay", "Vatikan", "Venezuela"].map((country, index) => (
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
                            <span>🇰🇷</span> {t('facts.southKorea')}
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-2">
                            <span>🇲🇾</span> {t('facts.malaysia')}
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
                        <TableCell className="bg-green-50">{t('facts.notRequired')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('facts.schengenFee')}</TableCell>
                        <TableCell>€90</TableCell>
                        <TableCell>€0</TableCell>
                        <TableCell>€90</TableCell>
                        <TableCell>€0</TableCell>
                        <TableCell>€0</TableCell>
                        <TableCell>€0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('facts.ukVisa')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-green-50">{t('facts.notRequired')}</TableCell>
                        <TableCell className="bg-green-50">{t('facts.notRequired')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('facts.usVisa')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                        <TableCell className="bg-green-50">{t('facts.notRequired')}</TableCell>
                        <TableCell className="bg-red-50">{t('facts.required')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('facts.visaFreeCountries')}</TableCell>
                        <TableCell>110+</TableCell>
                        <TableCell>130+</TableCell>
                        <TableCell>80+</TableCell>
                        <TableCell>115+</TableCell>
                        <TableCell>190+</TableCell>
                        <TableCell>170+</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('facts.gdpPerCapita')}</TableCell>
                        <TableCell>$9,600</TableCell>
                        <TableCell>$3,800</TableCell>
                        <TableCell>$12,200</TableCell>
                        <TableCell>$5,700</TableCell>
                        <TableCell>$34,600</TableCell>
                        <TableCell>$12,800</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('facts.population')}</TableCell>
                        <TableCell>85M</TableCell>
                        <TableCell>28M</TableCell>
                        <TableCell>144M</TableCell>
                        <TableCell>3.7M</TableCell>
                        <TableCell>51M</TableCell>
                        <TableCell>33M</TableCell>
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
                  <p className="font-semibold mb-2">{t('facts.southKoreaFact')}</p>
                  <p>{t('facts.southKoreaFactDesc')}</p>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="font-semibold mb-2">{t('facts.malaysiaFact')}</p>
                  <p>{t('facts.malaysiaFactDesc')}</p>
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
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-red-50">2024</Badge>
                      <span>{t('facts.fee2024')}</span>
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
