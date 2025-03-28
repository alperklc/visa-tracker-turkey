import React from 'react';
import { Country, CountryCode } from '@/lib/types';

interface CountryFlagProps {
  country: Country;
  size?: number;
  showName?: boolean;
  className?: string;
}

const CountryFlag: React.FC<CountryFlagProps> = ({ 
  country, 
  size = 16, 
  showName = false,
  className = "" 
}) => {
  const getCountryCode = (country: Country): CountryCode => {
    switch (country) {
      case Country.Germany: return CountryCode.DE;
      case Country.Italy: return CountryCode.IT;
      case Country.France: return CountryCode.FR;
      case Country.Spain: return CountryCode.ES;
      case Country.UnitedKingdom: return CountryCode.GB;
      case Country.Portugal: return CountryCode.PT;
      case Country.Greece: return CountryCode.GR;
      case Country.Austria: return CountryCode.AT;
      case Country.Switzerland: return CountryCode.CH;
      case Country.Netherlands: return CountryCode.NL;
      case Country.Belgium: return CountryCode.BE;
      case Country.Sweden: return CountryCode.SE;
      case Country.Denmark: return CountryCode.DK;
      case Country.Finland: return CountryCode.FI;
      case Country.Norway: return CountryCode.NO;
      case Country.Ireland: return CountryCode.IE;
      case Country.Poland: return CountryCode.PL;
      case Country.CzechRepublic: return CountryCode.CZ;
      case Country.Hungary: return CountryCode.HU;
      case Country.Croatia: return CountryCode.HR;
      case Country.Bulgaria: return CountryCode.BG;
      case Country.Romania: return CountryCode.RO;
      case Country.UnitedStates: return CountryCode.US;
      case Country.Canada: return CountryCode.CA;
      case Country.Australia: return CountryCode.AU;
      case Country.NewZealand: return CountryCode.NZ;
      case Country.Estonia: return CountryCode.EE;
      case Country.Latvia: return CountryCode.LV;
      case Country.Lithuania: return CountryCode.LT;
      case Country.Luxembourg: return CountryCode.LU;
      case Country.Malta: return CountryCode.MT;
      case Country.Slovakia: return CountryCode.SK;
      case Country.Slovenia: return CountryCode.SI;
      case Country.Iceland: return CountryCode.IS;
      case Country.Liechtenstein: return CountryCode.LI;
      default: return CountryCode.DE;
    }
  };

  const countryCode = getCountryCode(country);
  const flagEmoji = getFlagEmoji(countryCode);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span style={{ fontSize: `${size}px` }}>{flagEmoji}</span>
      {showName && <span>{country}</span>}
    </div>
  );
};

// Convert country code to flag emoji
const getFlagEmoji = (countryCode: CountryCode): string => {
  const codePoints = Array.from(countryCode)
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default CountryFlag;
