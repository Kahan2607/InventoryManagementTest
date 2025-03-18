import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category.type';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogueBoxComponent } from '../components/dialogue-box/dialogue-box.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  imports: [NgFor, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categoryItems: Category[] = [];
  constructor(private categoryService: CategoryService, public dialog: MatDialog){
  }

  
  ngOnInit(): void {
    
    this.categoryService.getCategoriesFromApi();
    this.categoryService.categories$.subscribe(
      (data) => {
        this.categoryItems = data;
      }
    );
  }

  

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogueBoxComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data:{
        title: 'Add'
      }
    });
  }

  update(category: Category){
    
    const dialogRef = this.dialog.open(DialogueBoxComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data:{
        title: 'Edit',
        categoryId: category.categoryId,
        name: category.name,
        active: false,
      }
    });
  }

  deleteCategory(categoryId: Category['categoryId']){
    console.log(categoryId);
    
    this.categoryService.deleteACategory(categoryId);
  }

}
