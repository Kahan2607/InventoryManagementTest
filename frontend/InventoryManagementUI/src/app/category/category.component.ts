import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category.type';
import { catchError } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [NgFor, NgIf],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categoryItems: Array<Category> = ([])
  constructor(private categoryService: CategoryService){

  }

  ngOnInit(): void {
    this.categoryService.getCategoriesFromApi().
    pipe(
      catchError((err) => {
        console.log(err);
        throw err;      
      })
    ).subscribe((data: Category[]) => {
      this.categoryItems = data;
    });
  }
  
}
