import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { inject } from '@angular/core';
import { CategoryService } from '../../../services/category';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-category-form',
  imports: [FormsModule,MatInputModule,MatButtonModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryForm {
  name!: string;
  categoryService = inject(CategoryService);
  router = inject(Router);
  route= inject(ActivatedRoute);
  isEdit = false;
  id!: string;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.categoryService.getCategoryById(this.id).subscribe({
        next: (data: any) => {
          this.name = data.name;
        },
        error: (error: any) => {
          console.error('Error fetching category:', error);
        }
      });
    }
  }
  add(){
    console.log("Category Name: ", this.name);
    this.categoryService.addCategory({ name: this.name }).subscribe(
      (response) => {
        console.log('Category added successfully:', response);
        this.router.navigateByUrl('/admin/categories');
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
  }
  edit() {
    console.log("Category Name: ", this.name);
    this.categoryService.updateCategory(this.id, { name: this.name }).subscribe(
      (response) => {
        console.log('Category updated successfully:', response);
        this.router.navigateByUrl('/admin/categories');
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
  }
}
