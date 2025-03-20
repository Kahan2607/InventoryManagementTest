import { Component } from '@angular/core';
import { SaleService } from '../services/sale.service';
import { ItemService } from '../services/item.service';
import { combineLatest, map } from 'rxjs';
import { Item } from '../model/item.type';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sale',
  imports: [NgFor],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  salesData: {
    itemName: string;
    salesId: number;
    itemId: number;
    quantity: number;
    price: number;
    salesAmount: number;
    salesDate: Date;
    insertedDate: Date;
  }[] = [];
  items: Item[] = [];
  constructor(
    private itemService: ItemService,
    private saleService: SaleService,
  )
  {
  }

  ngOnInit(){
    this.itemService.getItemsFromApi();
    this.saleService.getAllSalesDetailsFromApi();
    

    combineLatest([this.saleService.sales$, this.itemService.items$]).pipe(
      map(([sales, items]) => 
        sales.map(sale => ({
          ...sale,
          itemName: items.find(item => item.itemId === sale.itemId)?.name || 'Unknown'

        }))
      )
    )
    .subscribe((data) => {
      this.salesData = data;
      console.log("After subscribing", data);
      
    });
  }


}
