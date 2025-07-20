import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { inject } from '@angular/core';
import { ProductService } from '../../../services/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '../../../types/brand';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/category';
import { BrandService } from '../../../services/brand';
import { Product } from '../../../types/product';


@Component({
  selector: 'app-product-form',
  imports: [FormsModule, MatInputModule, MatButtonModule, MatSelectModule,MatButtonModule,MatButton],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductForm {
  formbuilder = inject(FormBuilder);
  productForm = this.formbuilder.group({
    name: [null ,[Validators.required, Validators.minLength(5)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.formbuilder.array([]),
    category: [null, [Validators.required]],
    brand : [null, [Validators.required]]
  });
  brands:Brand[] = [];
  categories: Category[] = [];
  categoriesService = inject(CategoryService);
  brandsService = inject(BrandService);
  productService = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false;
  id!: string;
  ngOnInit() {
    this.addImage();
    this.categoriesService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      }
    });

    this.brandsService.getBrands().subscribe({
      next: (data: Brand[]) => {
        this.brands = data;
      }
    });

  }
  add() {
    const formValue = this.productForm.value;
    this.productService.addProduct(formValue as any).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        this.router.navigateByUrl('/admin/products');
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });
    
  }

  addImage() {
    this.images.push(this.formbuilder.control('', Validators.required));
  }

  removeImage() {
    if (this.images.length > 1) {
      this.images.removeAt(this.images.length - 1);
    }

  }
  get images() {
    return this.productForm.get('images') as FormArray;
  }

  edit() { 

  }

}
