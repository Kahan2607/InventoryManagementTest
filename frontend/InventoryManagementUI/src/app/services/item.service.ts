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

  addItemByApi(item: Item): Promise<void>{
    console.log(item);
    return new Promise((resolve, reject) => {
    const url = 'https://localhost:5034/api/item/add-item'
    this.http.post(url, item).subscribe({
      next: () => {
        this.getItemsFromApi();
        resolve();
      },
      error: (error) => console.log(error),
      
    })});
  }


  deleteItem(itemId: Item['itemId']){
    const url = `https://localhost:5034/api/item/delete-item${itemId}`;
    this.http.delete(url).subscribe(() => {
      this.getItemsFromApi();
    });
  }
}
