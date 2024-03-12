import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  
  addProductMessage: string | undefined;
  formData: product = {
    id: '',
    name: '',
    price: 0,
    color: '',
    category: '',
    description: '',
    image: '',
    quantity: undefined
  };

  constructor(private product: ProductService,
    private router:Router) {}

  ngOnInit(): void {}

  submit(data: product, addProductForm: NgForm) {
    console.warn(data);
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = "Product saved successfully added";
        this.clearForm(addProductForm);
      }
      setTimeout(() => (this.addProductMessage = undefined), 1000);
      this.router.navigate(['/seller-home']);
    });
  }

  clearForm(form: NgForm) {
    form.resetForm();
    this.formData = {
      id: '',
      name: '',
      price: 0,
      color: '',
      category: '',
      description: '',
      image: '',
      quantity: undefined
    };
  }
}
