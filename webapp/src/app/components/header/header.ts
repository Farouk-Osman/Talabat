import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category';
import { Category } from '../../types/category';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  categoryService = inject(CategoryService);
  categoryList: Category[] = [];

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categoryList = data;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
}
