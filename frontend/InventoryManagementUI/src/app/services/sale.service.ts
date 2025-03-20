import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '../model/sale.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private saleSubject = new BehaviorSubject<Sale[]>([]);
  sales$ = this.saleSubject.asObservable();

  constructor(private http: HttpClient) { 

  }

  getAllSalesDetailsFromApi(){
    const url = 'https://localhost:5034/api/sale';
    this.http.get<Sale[]>(url).subscribe({
      next: data => this.saleSubject.next(data),
      error: error => console.log(error),
    }); 
  }
}
