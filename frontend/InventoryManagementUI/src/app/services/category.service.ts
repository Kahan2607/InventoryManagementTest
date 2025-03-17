import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category.type';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private http: HttpClient) { }

  getCategoriesFromApi(){
    const url = 'https://localhost:5034/api/category';
    const temp = this.http.get<Array<Category>>(url);
    console.log(temp);
    
    return temp;

  }

  addCategoryToApi(category: Category){
    console.log(category);
    const url = 'https://localhost:5034/api/category/add-category';
    const temp = this.http.post(url, category);
    return temp;
  }
}
