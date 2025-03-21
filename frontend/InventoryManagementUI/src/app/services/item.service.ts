import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Item } from '../model/item.type';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  items$ = this.itemsSubject.asObservable();
  
  private dataSource = new BehaviorSubject<string>('0');
  currentData = this.dataSource.asObservable();

  private itemDataSource = new BehaviorSubject<Item | null>(null);;
  currentItemData = this.itemDataSource.asObservable();
  

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

  updateItemByApi(item: Item){
    const url = `https://localhost:5034/api/item/update-item${item.itemId}`;
    this.http.put(url, item).subscribe(() =>{
      this.getItemsFromApi();
    });
  }

  updateData(data: string) {
    this.dataSource.next(data);
  }

  updateItemData(item: Item){
    this.itemDataSource.next(item);
  }
}
