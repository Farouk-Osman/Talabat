import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Brand } from '../types/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  http= inject(HttpClient);
  constructor() { }

  getBrands() {
    return this.http.get<Brand[]>('http://localhost:3000/brand');
  }

  getBrandById(id: string) {
    return this.http.get<Brand>(`http://localhost:3000/brand/${id}`);
  }

  addBrand(brand: { name: string }) {
    return this.http.post('http://localhost:3000/brand', brand);
  }

  updateBrand(id: string, brand: { name: string }) {
    return this.http.put(`http://localhost:3000/brand/${id}`, brand);
  }

  deleteBrand(id: string) {
    return this.http.delete(`http://localhost:3000/brand/${id}`);
  }
  
  
}

