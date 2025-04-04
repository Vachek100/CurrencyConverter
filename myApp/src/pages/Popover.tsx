import React from 'react';
import { IonList, IonItem, IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
import CountryFlag from 'react-country-flag';

// Currency code to country code mapping
const currencyToCountry: Record<string, string> = {
    AUD: 'AU', // Australia
    BRL: 'BR', // Brazil
    BGN: 'BG', // Bulgaria
    CNY: 'CN', // China
    DKK: 'DK', // Denmark
    EUR: 'EU', // European Union
    PHP: 'PH', // Philippines
    HKD: 'HK', // Hong Kong
    INR: 'IN', // India
    IDR: 'ID', // Indonesia
    ISK: 'IS', // Iceland
    ILS: 'IL', // Israel
    JPY: 'JP', // Japan
    ZAR: 'ZA', // South Africa
    CAD: 'CA', // Canada
    KRW: 'KR', // South Korea
    HUF: 'HU', // Hungary
    MYR: 'MY', // Malaysia
    MXN: 'MX', // Mexico
    XDR: 'UN', // IMF Special Drawing Rights (using UN flag)
    NOK: 'NO', // Norway
    NZD: 'NZ', // New Zealand
    PLN: 'PL', // Poland
    RON: 'RO', // Romania
    SGD: 'SG', // Singapore
    SEK: 'SE', // Sweden
    CHF: 'CH', // Switzerland
    THB: 'TH', // Thailand
    TRY: 'TR', // Turkey
    USD: 'US', // United States
    GBP: 'GB', // United Kingdom
};

interface Currency {
    country_label: string;
    curr_label: string;
    unit: string;
    code: string;
    rate: string;
}

interface PopoverProps {
    currencyData: { data: Currency[] } | null;
    selectedCurrency: string;
    onCurrencyChange: (code: string) => void;
    label: string;
}

const Popover: React.FC<PopoverProps> = ({
    currencyData,
    selectedCurrency,
    onCurrencyChange,
    label
}) => {
    if (!currencyData?.data?.length) {
        return (
            <IonItem>
                <IonLabel>No currency data available</IonLabel>
            </IonItem>
        );
    }

    return (
        <IonItem>
            <IonLabel>{label}</IonLabel>
            <IonSelect
                aria-label="Countries"
                value={selectedCurrency}
                onIonChange={e => onCurrencyChange(e.detail.value)}
                interface="popover"
                color='success'
            >
                {currencyData.data.map((currency) => (
                    <IonSelectOption key={currency.code} value={currency.code}>
                        <CountryFlag
                            countryCode={currencyToCountry[currency.code] || 'XX'}
                            style={{
                                width: '24px',
                                height: '18px',
                                borderRadius: '2px',
                                boxShadow: '0 0 1px rgba(0,0,0,0.2)'
                            }}
                            title={currency.country_label}
                        />
                        {" "}{currency.code} - {currency.curr_label}
                    </IonSelectOption>
                ))}
            </IonSelect>
        </IonItem>
    );
};

export default Popover;


