import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  private apiUrl = 'https://api.exchangeratesapi.io/v1/latest';
  private accessKey = '9573ca6a8648299082d586bac301d243';
  private supportedCurrencies = ['USD', 'EUR', 'PKR', 'GBP', 'INR', 'JPY'];

  constructor(private http: HttpClient) {}

  getConversionRate(source: string, target: string): Observable<number> {
    const symbols = this.supportedCurrencies.join(',');
    const url = `${this.apiUrl}?access_key=${this.accessKey}&symbols=${symbols}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        const rates = response.rates;
        if (!rates || !rates[source] || !rates[target]) {
          console.warn('Currency not found in API response:', response);
          return 0;
        }

        // All values are based on EUR
        // So for source ➝ target:  (target / source)
        if (source === target) return 1;
        return rates[target] / rates[source];
      })
    );
  }

  convertCurrency(amount: number, rate: number): number {
    return amount * rate;
  }
}
