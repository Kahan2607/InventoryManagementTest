import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { map } from 'rxjs';
import { Category } from '../../model/category.type';
import { Item } from '../../model/item.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {
  addItemForm: FormGroup;
  categoryItem: {
    categoryId: number;
    categoryName: string;
    isEdit: boolean;
  }[] = [];

  editItemData: Item = {
    categoryId: 0,
    itemId: 0,
    name: '',
    active: false
  };

  data: string = '';
  newData: number = 0;
  constructor
  (
    private _formBuilder: FormBuilder, 
    private _itemService: ItemService, 
    private _categoryService: CategoryService,
    private router: Router,
  )
  {
    this._itemService.currentData.subscribe(data => this.data = data);
    this.newData = parseInt(this.data);
    

    this.addItemForm = this._formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      active: [false, Validators.required]
    });

    if (this.newData !== 0) {
      console.log(this.newData);
      
      this._itemService.currentItemData.subscribe(item => {
        if (item) {
          this.editItemData = { ...item }; 
          console.log("Received Item Data:", this.editItemData);

          this.addItemForm.patchValue({
            name: this.editItemData.name,
            category: this.editItemData.categoryId,
            active: this.editItemData.active
          });
        }
      });
    }
  }

  ngOnInit(){
    this._categoryService.getCategoriesFromApi();

    const categoryData$ = this._categoryService.categories$;

    

    categoryData$.pipe(
      map((categories: Category[]) =>
        categories.map ( category => ({
          categoryId: category.categoryId,
          categoryName: category.name,
          isEdit: false,
      }) )
    ))
    .subscribe(data => {
      this.categoryItem = data;
    });  
      
  }

  ngOnDestroy(){
    console.log("add-item component destroyed.");
    
  }

  async onSubmit(){
    if(this.addItemForm.valid){
      
      const newItem: Item = {
        itemId: this.newData,
        categoryId: this.addItemForm.value.category,
        name: this.addItemForm.value.name,
        active: this.addItemForm.value.active
      };
      
      console.log(typeof(newItem.itemId), newItem.itemId);
      
      if(newItem.itemId === 0){
        await this._itemService.addItemByApi(newItem);
        console.log("inside add ");
        
      }
      else{
        this._itemService.updateItemByApi(newItem);
        console.log("inside update api");
        

        this.editItemData.categoryId = 0;
        this.editItemData.itemId = 0;
        this.editItemData.name = '';
        this.editItemData.active = false;

        this.newData = 0;
        this._itemService.updateData(this.newData.toString())
        this._itemService.updateItemData(this.editItemData);
      }

      this.addItemForm.reset();
      this.router.navigate(['/items']);
      
    }
  }

  
}
