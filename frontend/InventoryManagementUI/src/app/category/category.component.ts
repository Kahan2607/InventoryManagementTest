import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category.type';
import { catchError } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogueBoxComponent } from '../components/dialogue-box/dialogue-box.component';

@Component({
  selector: 'app-category',
  imports: [NgFor, NgIf],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categoryItems: Array<Category> = ([])
  constructor(private categoryService: CategoryService, public dialog: MatDialog){

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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogueBoxComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data:{
        title: 'Add Edit'
      }
    });
  }
  
}
