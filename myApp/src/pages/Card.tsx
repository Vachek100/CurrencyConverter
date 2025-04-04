import React, { useState, useEffect } from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonInput,
    IonSpinner,
    IonText
} from '@ionic/react';
import { swapVertical } from 'ionicons/icons';
import "./Card.css";
import Popover from './Popover';
import { fetchCurrencyData } from '../services/currency.service';

interface Currency {
    country_label: string;
    curr_label: string;
    unit: string;
    code: string;
    rate: string;
}

interface CurrencyData {
    date?: string;
    order?: string;
    data: Currency[];
    labels?: string[];
    lang?: string;
    cached?: boolean;
}

const Card: React.FC = () => {
    const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [amount, setAmount] = useState<number>(1);
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('EUR');
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [conversionResult, setConversionResult] = useState<{
        convertedAmount: number;
        rate: number;
        fromCurrencyObj: Currency | undefined;
        toCurrencyObj: Currency | undefined;
    } | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchCurrencyData();
                setCurrencyData(data);
                setLastUpdated(new Date().toLocaleTimeString());
            } catch (err) {
                setError('Failed to load currency data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
        const interval = setInterval(loadData, 300000);
        return () => clearInterval(interval);
    }, []);

    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setConversionResult(null); // Clear result when swapping currencies
    };

    const handleConvert = () => {
        if (!currencyData) return;

        const fromCurrencyObj = currencyData.data.find(c => c.code === fromCurrency);
        const toCurrencyObj = currencyData.data.find(c => c.code === toCurrency);

        if (!fromCurrencyObj || !toCurrencyObj) return;

        const fromRate = parseFloat(fromCurrencyObj.rate) / parseFloat(fromCurrencyObj.unit);
        const toRate = parseFloat(toCurrencyObj.rate) / parseFloat(toCurrencyObj.unit);

        const convertedAmount = (amount * fromRate) / toRate;
        const rate = fromRate / toRate;

        setConversionResult({
            convertedAmount,
            rate,
            fromCurrencyObj,
            toCurrencyObj
        });
    };

    if (loading) {
        return (
            <IonCard>
                <IonCardContent style={{ display: 'flex', justifyContent: 'center' }}>
                    <IonSpinner name="crescent" />
                </IonCardContent>
            </IonCard>
        );
    }

    if (error) {
        return (
            <IonCard>
                <IonCardContent>
                    <IonText color="danger">{error}</IonText>
                </IonCardContent>
            </IonCard>
        );
    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Convert</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
                <IonInput
                    color="success"
                    label="Amount"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Enter amount"
                    type="number"
                    value={amount}
                    onIonChange={e => setAmount(parseFloat(e.detail.value!) || 0)}
                />

                <Popover
                    currencyData={currencyData}
                    selectedCurrency={fromCurrency}
                    onCurrencyChange={(code) => {
                        setFromCurrency(code);
                        setConversionResult(null); // Clear result when changing currency
                    }}
                    label="From"
                />

                <IonButton
                    shape="round"
                    className="swap-button"
                    onClick={handleSwapCurrencies}
                >
                    <IonIcon slot="icon-only" icon={swapVertical} />
                </IonButton>

                <Popover
                    currencyData={currencyData}
                    selectedCurrency={toCurrency}
                    onCurrencyChange={(code) => {
                        setToCurrency(code);
                        setConversionResult(null); // Clear result when changing currency
                    }}
                    label="To"
                />

                {conversionResult && (
                    <div className="conversion-results">
                        <IonText>
                            <p className="conversion-rate">
                                {amount} {conversionResult.fromCurrencyObj.code} =
                            </p>
                        </IonText>

                        <IonText>
                            <h1 className="converted-amount">
                                {conversionResult.convertedAmount.toFixed(6)} {conversionResult.toCurrencyObj.code}
                            </h1>
                        </IonText>

                        <IonText>
                            <p className="conversion-rate">
                                1 {conversionResult.toCurrencyObj.code} = {(1 / conversionResult.rate).toFixed(6)} {conversionResult.fromCurrencyObj.code}
                            </p>
                        </IonText>

                        <IonText>
                            <p className="conversion-rate">
                                1 {conversionResult.fromCurrencyObj.code} = {conversionResult.rate.toFixed(6)} {conversionResult.toCurrencyObj.code}
                            </p>
                        </IonText>

                        <IonText color="medium">
                            <small className="last-updated">Rates updated: {lastUpdated}</small>
                        </IonText>
                    </div>
                )}

                <IonButton
                    expand="block"
                    className="convert-button"
                    onClick={handleConvert}
                >
                    Convert
                </IonButton>
            </IonCardContent>
        </IonCard>
    );
}

export default Card;
