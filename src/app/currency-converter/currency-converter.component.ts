import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyConverterService } from '../services/currency-converter.service';

@Component({
  selector: 'app-currency-converter',
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent {
  amount: number = 0;
  sourceCurrency: string = 'USD';
  targetCurrency: string = 'EUR';
  result: number = 0;
  conversionRate: number | null = null;
  currencies: string[] = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'PKR'];

  currencyFlags: { [key: string]: string } = {
    USD: '🇺🇸',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    INR: '🇮🇳',
    JPY: '🇯🇵',
    PKR: '🇵🇰',
  };

  constructor(private currencyConverterService: CurrencyConverterService) { }

  convertCurrency() {
    if (this.sourceCurrency === this.targetCurrency) {
      this.conversionRate = 1;
      this.result = this.amount;
      return;
    }

    this.currencyConverterService
      .getConversionRate(this.sourceCurrency, this.targetCurrency)
      .subscribe((rate: number) => {
        this.conversionRate = rate;
        this.result = this.currencyConverterService.convertCurrency(this.amount, rate);
      });
  }

  getFlagAndCurrency(currency: string): string {
    return `${this.currencyFlags[currency] || ''} ${currency}`;
  }
}
