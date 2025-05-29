import axios from 'axios';
import { TreasuryData, YieldCurvePoint } from 'shared/types';

interface PolygonAPIResponse {
  status: string;
  request_id: string;
  results: PolygonAPIRecord[];
  next_url?: string;
}

interface PolygonAPIRecord {
  date: string;
  yield_1_month: number;
  yield_2_year: number;
  yield_3_month: number;
  yield_3_year: number;
  yield_5_year: number;
  yield_7_year: number;
  yield_10_year: number;
  yield_20_year: number;
  yield_30_year: number;
  yield_1_year: number;
  yield_6_month: number;
}

class TreasuryService {
  private readonly API_KEY = 'HXYozsyHw9_LzKL5j3ctdvJH7ZwjbXhd';
  private readonly BASE_URL = 'https://api.polygon.io/fed/v1/treasury-yields';

  async fetchYieldCurveData(): Promise<TreasuryData[]> {
    const utc2DaysAgo = new Date();
    utc2DaysAgo.setUTCDate(utc2DaysAgo.getUTCDate() - 2);
    const dateStr = utc2DaysAgo.toISOString().split('T')[0];
    
    const url = `${this.BASE_URL}?date=${dateStr}&apiKey=${this.API_KEY}`;
    
    try {
      const { data: jsonData } = await axios.get<PolygonAPIResponse>(url);
      console.log(jsonData);
      return this.transformTreasuryData(jsonData.results);
    } catch (error) {
      console.error('Error fetching treasury data:', error);
      throw error;
    }
  }

  private transformTreasuryData(rawData: PolygonAPIRecord[]): TreasuryData[] {
    const groupedByDate: { [date: string]: YieldCurvePoint[] } = {};
    
    rawData.forEach(item => {
      const date = item.date;
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      
      // Map treasury terms to months
      const termMapping: { [key: string]: number } = {
        'yield_1_month': 1,
        'yield_3_month': 3,
        'yield_6_month': 6,
        'yield_1_year': 12,
        'yield_2_year': 24,
        'yield_3_year': 36,
        'yield_5_year': 60,
        'yield_7_year': 84,
        'yield_10_year': 120,
        'yield_20_year': 240,
        'yield_30_year': 360
      };

      Object.entries(termMapping).forEach(([key, months]) => {
        const yieldValue = item[key as keyof PolygonAPIRecord];
        if (typeof yieldValue === 'number' && !isNaN(yieldValue)) {
          groupedByDate[date].push({
            term: months,
            yield: yieldValue,
            date: new Date(date)
          });
        }
      });
    });

    return Object.keys(groupedByDate).map(date => ({
      date: new Date(date),
      yields: groupedByDate[date].sort((a, b) => a.term - b.term)
    }));
  }
}

export default new TreasuryService();
