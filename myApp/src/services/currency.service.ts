import axios from 'axios'

interface CurrencyData {
    date: string;
    order: string;
    data: {
        country_label: string;
        curr_label: string;
        unit: string;
        code: string;
        rate: string;
    }[];
    labels: string[];
    lang: string;
    cached: boolean;
}

export const fetchCurrencyData = async (
    date?: string,
    lang: 'cs' | 'en' = 'cs',
    sse: 'y' | 'n' = 'n'
): Promise<CurrencyData> => {
    try {
        const params = new URLSearchParams();
        if (date) params.append('date', date);
        if (lang) params.append('lang', lang);
        if (sse) params.append('sse', sse);

        const response = await axios.get<CurrencyData>(
            'http://linedu.vsb.cz/~mor03/TAMZ/cnb_json.php',
            { params }
        )
        return response.data;
    } catch (error) {
        console.error('Error fetching currency data:', error);
        throw error;
    }
}
