import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../../model/category.type';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-dialogue-box',
  imports: [MatFormFieldModule, MatCheckbox, MatInputModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './dialogue-box.component.html',
  styleUrl: './dialogue-box.component.scss'
})
export class DialogueBoxComponent implements OnInit {
  inputData: any;
  addCategoryForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _dialogRef: MatDialogRef<DialogueBoxComponent>,
    private _formBuilder: FormBuilder,
    private _categoryService: CategoryService
  ){
    this.addCategoryForm = this._formBuilder.group({
      name: ['', Validators.required],
      active: [false]
    })
  }


  ngOnInit(): void {
    this.inputData = this.data;
  }

  closeDialog(){
    this._dialogRef.close();
  }

  onSubmit(){
    if(this.addCategoryForm.valid){
      const newCategory: Category = {
        categoryId: 0,
        name: this.addCategoryForm.value.name,
        active: this.addCategoryForm.value.active
      };
      console.log("submit works");
      this._categoryService.addCategoryToApi(newCategory);
      this.addCategoryForm.reset();
      this.closeDialog();
    }
  }
}
