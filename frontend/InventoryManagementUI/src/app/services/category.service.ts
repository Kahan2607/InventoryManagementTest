import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category.type';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<Category[]>([]); // Holds category list
  categories$ = this.categoriesSubject.asObservable(); // Expose as observable
  
  private activeCategoriesSubject = new BehaviorSubject<Category[]>([]); // Holds category list
  activeCategories$ = this.activeCategoriesSubject.asObservable(); // Expose as observable
  

  constructor(private http: HttpClient) { }

  getCategoriesFromApi(){
    const url = 'https://localhost:5034/api/category';
    this.http.get<Category[]>(url).subscribe({
      next: data => this.categoriesSubject.next(data),
      error: error => console.log("Error fetching the data", error)
    });
  }

  getActiveCategoriesFromApi(): Observable<Category[]>{
    const url = 'https://localhost:5034/api/category/active-categories';
    return this.http.get<Category[]>(url);
  }

  getInactiveCategoriesFromApi(): Observable<Category[]>{
    const url = 'https://localhost:5034/api/category/inactive-categories';
    return this.http.get<Category[]>(url);
  }

  addCategoryByApi(category: Category){
    // console.log(category);
    const url = 'https://localhost:5034/api/category/add-category';
    this.http.post(url, category).subscribe(() => {
      this.getCategoriesFromApi();
    });
  }

  editAndUpdateCategory(category: Category){
    const url = `https://localhost:5034/api/category/update-category${category.categoryId}`;
    this.http.put(url, category).subscribe(() => {
      this.getCategoriesFromApi();
    });
  }

  deleteACategory(categoryId: Category['categoryId']){
    console.log(categoryId);
    
    const url = `https://localhost:5034/api/category/delete-category${categoryId}`;
    this.http.delete(url).subscribe(() => {
      this.getCategoriesFromApi();
    } );
  }
}
