import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from  '@angular/common/http';
import { map } from 'rxjs/operators';

import { Product } from './product.model';



@Injectable({providedIn: 'root'})
export class ProductsService {

    private products: Product[] = [];
    private productsUpdate = new Subject<Product[]>(); 

    constructor(private http: HttpClient) {}

        // pipe operator is used to transform the _id from the backed to id in the frontend
        getProducts() {
          // use http client to fetch products from node backend
          this.http.get<{ message: string, products: any }>("http://localhost:3000/api/products")
          .pipe(map((productData) => {
              return productData.products.map(product => {
                  return {
                      id: product._id,
                      name: product.name,
                      gtin: product.gtin,
                      category: product.category,                      
                      price: product.price,
                      brandName: product.brandName
                  };
              })
          }))
          .subscribe(transformedProducts=> {
              this.products = transformedProducts;
              // inform the app about the products and make a copy of it available to the frontend app
              this.productsUpdate.next([...this.products]);
          });
  
          // return [...this.products];
      }

    getProductUpdateListener() {
        return this.productsUpdate.asObservable();
    }

    // addProduct(name: string, gtin: string,  category: string, price: string, brandName: string){
    //     const product: Product = {id:null, name: name, gtin: gtin, category: category, price: price, brandName:brandName}
    //     this.products.push(product)
    //     this.productsUpdate.next([...this.products]);    
    // }

    addProduct(name: string, gtin: string,  category: string, price: string, brandName: string){
      const product: Product = {id:null, name: name, gtin: gtin, category: category, price: price, brandName:brandName}
        // use http client to send product to node backend and get back its response
        this.http.post<{ message: string , productId: string }>("http://localhost:3000/api/products", product)
        .subscribe((responseData)=>{
          // console.log(responseData.message, responseData.productId);
          const  productId = responseData.productId;
          product.id =  productId;
          // Update service data asynchronously, push to local variable, i.e. after the post operation is successful
          this.products.push(product)
          this.productsUpdate.next([...this.products]);
        });
     
  
  }

    // 
    getCategories() {
        // Extract unique categories from products
        return [...new Set(this.products.map(product => product.category))];
      }

      getBrands() {
        // Extract unique brands from products
        return [...new Set(this.products.map(product => product.brandName))];
      }

      filterByCategory(category: string) {
        if (category) {
          const filtered = this.products.filter(product => product.category === category);
          this.productsUpdate.next(filtered);
        } else {
          this.productsUpdate.next(this.products);
        }
      }

      filterByBrand(brand: string) {
        if (brand) {
          const filtered = this.products.filter(product => product.brandName === brand);
          this.productsUpdate.next(filtered);
        } else {
          this.productsUpdate.next(this.products);
        }
      }

    // 

}