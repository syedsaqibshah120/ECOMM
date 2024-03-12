import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import{faEye ,faCartPlus} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
  popularProducts: product[] | undefined;
  treandyProducts:product[]|undefined
  icon= faCartPlus;
  editIcon= faEye;

  constructor(private product:ProductService){}
  ngOnInit(): void {
  this.product.popularProducts().subscribe(
    (data: product | product[]) => {
      console.warn(data);
      if (Array.isArray(data)) {
        this.popularProducts = data;
      } else {
        this.popularProducts = [data];
      }
    },
    (error) => {
      console.error('Error fetching popular products:', error);
    }
  );

  this.product.treandyProducts().subscribe(
    (data:product|product[])=>{
      console.warn(data);
      if (Array.isArray(data)) {
        this.treandyProducts = data;
      } else {
        this.treandyProducts = [data];
      }
    },
    (error) => {
      console.error('Error fetching Treandy products:', error);
    })
}


}
