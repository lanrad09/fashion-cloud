import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product.model';
import { ProductsService } from '../products.service';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

// you wil end substriction to prevent memory leak
export class ProductListComponent implements OnInit {

    selectedCategory: string;
    selectedBrand: string;
    categories: string[];
    brands: string[];
    
    products: Product[]= [];
    filteredProducts: any[];

    // 

    uniqueBrands: string[] = [];
    uniqueCategories: string[] = [];

    selectedSort: string = '';

    // 
    
    private productsSub: Subscription;

    constructor(public productsService: ProductsService) {}

    ngOnInit() {
        // this.products = this.productsService.getProducts();
        this.productsService.getProducts();
        this.productsSub = this.productsService.getProductUpdateListener().subscribe((products: Product[])=> {
            this.products = products;
        });
        
    }

    // call when the compoent is about to get remove
    ngOnDestroy() {
        this.productsSub.unsubscribe();
    }

    // 
    getUniqueBrands() {
        this.uniqueBrands = [...new Set(this.products.map((product) => product.brandName))];
      }

      getUniqueCategories() {
        this.uniqueCategories = [...new Set(this.products.map((product) => product.category))];
      }

      applyFilters() {
        let  products = [...this.products];
    
        if (this.selectedBrand) {
          products =  products.filter((product) => product.brandName === this.selectedBrand);
        }
    
        if (this.selectedCategory) {
          products =  products.filter((product) => product.category === this.selectedCategory);
        }
    
        if (this.selectedSort) {
          products.sort((a, b) => {
            if (this.selectedSort === 'name') {
              return a.name.localeCompare(b.name);
            } else if (this.selectedSort === 'brand') {
              return a.brandName.localeCompare(b.brandName);
            } else {
              return 0;
            }
          });
        }
    
        this. products =  products;
      }

    // 

    filterByCategory() {
        this.productsService.filterByCategory(this.selectedCategory);
      }

      filterByBrand() {
        this.productsService.filterByBrand(this.selectedBrand);
      }
    

}