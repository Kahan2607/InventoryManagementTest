import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../model/item.type';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  items$ = this.itemsSubject.asObservable();
  

  constructor(private http: HttpClient) { }

  getItemsFromApi(){
    const url = 'https://localhost:5034/api/item';
    this.http.get<Item[]>(url).subscribe({
      next: data => this.itemsSubject.next(data),
      error: error => console.log(error)
    });
  }
}
