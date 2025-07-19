import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http= inject(HttpClient);
  constructor() {}

  getCategories() {
    return this.http.get<Category[]>('http://localhost:3000/category');
  }
  getCategoryById(id: string) {
    return this.http.get<Category>(`http://localhost:3000/category/${id}`);
  }
  addCategory(category: { name: string }) {
    return this.http.post('http://localhost:3000/category', category);
  }
  updateCategory(id: string, category: { name: string }) {
    return this.http.put(`http://localhost:3000/category/${id}`, category);
  }
  deleteCategory(id: string) {
    return this.http.delete(`http://localhost:3000/category/${id}`);
  }
}
