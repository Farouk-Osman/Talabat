import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../services/category';
import { Category } from '../../types/category';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  categoryService = inject(CategoryService);
  authService = inject(AuthService);
  cartService = inject(CartService);
  categoryList: Category[] = [];

  currentUser$ = this.authService.currentUser$;
  cartItems$ = this.cartService.cart$;
  router = inject(Router);
  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categoryList = data;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  logout() {
    this.authService.logout();
  }

  onSearch(event: any) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.trim();
    if (searchTerm) {
      this.router.navigateByUrl(`/products?search=${searchTerm}`);
    }
  }

  searchCategory(categoryId: any) {
    this.router.navigateByUrl(`/products?category=${categoryId}`);
  }
}
