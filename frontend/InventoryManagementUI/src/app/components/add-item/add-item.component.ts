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

  constructor
  (
    private _formBuilder: FormBuilder, 
    private _itemService: ItemService, 
    private _categoryService: CategoryService,
    private router: Router,
  )
  {
    this.addItemForm = this._formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      active: [false, Validators.required]
    });
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

  async onSubmit(){
    if(this.addItemForm.valid){
      
      const newItem: Item = {
        itemId: 0,
        categoryId: this.addItemForm.value.category,
        name: this.addItemForm.value.name,
        active: this.addItemForm.value.active
      };

      if(this.categoryItem[0].isEdit === false){
        await this._itemService.addItemByApi(newItem);
      }
      // if(this.inputData.title === 'Edit'){
      //   this._categoryService.editAndUpdateCategory(newCategory);
      // }

      this.addItemForm.reset();
      this.router.navigate(['/items']);
    }
  }

  
}
