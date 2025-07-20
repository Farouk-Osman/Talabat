import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { inject } from '@angular/core';
import { BrandService } from '../../../services/brand';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-form',
  imports: [FormsModule,MatInputModule,MatButtonModule],
  templateUrl: './brand-form.html',
  styleUrl: './brand-form.scss'
})
export class BrandForm {

  name!: string;
  brandService = inject(BrandService);
  router = inject(Router);
  route= inject(ActivatedRoute);
  isEdit = false;
  id!: string;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.brandService.getBrandById(this.id).subscribe({
        next: (data: any) => {
          this.name = data.name;
        },
        error: (error: any) => {
          console.error('Error fetching brand:', error);
        }
      });
    }
  }

  add(){
    if (!this.name) {
      console.error('Brand name is required.');
      return;
    }
    this.brandService.addBrand({ name: this.name }).subscribe(
      (response) => {
        console.log('Brand added successfully:', response);
        this.router.navigateByUrl('/admin/brands');
      },
      (error) => {
        console.error('Error adding brand:', error);
      }
    );
  }

  edit() {
    if (!this.id) {
      console.error('Brand ID is not defined for editing.');
      return;
    }
    this.brandService.updateBrand(this.id, { name: this.name }).subscribe(
      (response) => {
        console.log('Brand updated successfully:', response);
        this.router.navigateByUrl('/admin/brands');
      },
      (error) => {
        console.error('Error updating brand:', error);
      }
    );
  }

}
