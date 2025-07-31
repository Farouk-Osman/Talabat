import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-product-form',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule,MatButtonModule,MatButton,MatCheckboxModule],
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
    brand : [null, [Validators.required]],
    isFeatured : [false],
    isNewProduct : [false]
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

    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.productService.getProductById(this.id).subscribe(result =>{
        for (let i = 0; i < result.images.length; i++) {
          this.addImage();
        }
        this.productForm.patchValue(result as any);
      })
    }
    else{
      this.addImage();
    }

  }
  add() {
    const formValue = this.productForm.value;
    const productToSend = {
      ...formValue,
      category: formValue.category ? (formValue.category as any)._id : null,
      brand: formValue.brand ? (formValue.brand as any)._id : null
    };
    this.productService.addProduct(productToSend as any).subscribe({
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

  update() { 
    const formValue = this.productForm.value;
    const productToUpdate = {
      ...formValue,
      category: formValue.category ? (formValue.category as any)._id : null,
      brand: formValue.brand ? (formValue.brand as any)._id : null
    };
    this.productService.updateProduct(this.id, productToUpdate as any).subscribe({
      next: (response) => {
        console.log('Product updated successfully:', response);
        this.router.navigateByUrl('/admin/products');
      },
      error: (error) => {
        console.error('Error updating product:', error);
      }
    });

  }

}


