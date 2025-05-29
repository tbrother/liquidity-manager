import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TreasuryData } from '@shared/types';


@Injectable({
  providedIn: 'root'
})
export class TreasuryService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getYieldCurve(): Observable<TreasuryData[]> {
    return this.http.get<TreasuryData[]>(`${this.apiUrl}/treasury/yield-curve`);
  }
}