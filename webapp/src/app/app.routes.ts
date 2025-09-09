import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Categories } from './components/manage/categories/categories';
import { CategoryForm } from './components/manage/category-form/category-form';
import { Brands } from './components/manage/brands/brands';
import { BrandForm } from './components/manage/brand-form/brand-form';
import { Products } from './components/manage/products/products';
import { ProductForm } from './components/manage/product-form/product-form';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Cart } from './components/cart/cart';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { Checkout } from './components/checkout/checkout';
import { OrderDetail } from './components/order-detail/order-detail';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'cart',
    component: Cart,
  },
  {
    path: 'products/:id',
    component: ProductDetail,
  },
  {
    path: 'admin/categories',
    component: Categories,
  },
  {
    path: 'admin/categories/add',
    component: CategoryForm,
  },
  {
    path: 'admin/categories/:id',
    component: CategoryForm,
  },

  {
    path: 'admin/brands',
    component: Brands,
  },
  {
    path: 'admin/brands/add',
    component: BrandForm,
  },
  {
    path: 'admin/brands/:id',
    component: BrandForm,
  },
  {
    path: 'admin/products',
    component: Products,
  },
  {
    path: 'admin/products/add',
    component: ProductForm,
  },
  {
    path: 'admin/products/:id',
    component: ProductForm,
  },
  {
    path: 'products',
    component: ProductList,
  },
  {
    path: 'products/:_id',
    component: ProductDetail,
  },
  {
    path: 'checkout',
    component: Checkout,
  },
  {
    path: 'orders/:id',
    component: OrderDetail,
  },
];
