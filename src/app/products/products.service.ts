import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from  '@angular/common/http';

import { Product } from './product.model';



@Injectable({providedIn: 'root'})
export class ProductsService {

    private products: Product[] = [];
    private productsUpdate = new Subject<Product[]>(); 

    constructor(private http: HttpClient) {}

    getProducts() {
           // use http client to fetch products from node backend
           this.http.get<{message: string, products: Product[]}>("http://localhost:3000/api/products")
           .subscribe((productData)=> {
               this.products = productData.products;
               // inform the app about the products and make a copy of it available to the frontend app
               this.productsUpdate.next([...this.products]);
   
   
           });
        // return [...this.products];
    }

    getProductUpdateListener() {
        return this.productsUpdate.asObservable();
    }

    addProduct(name: string, gtin: string,  price: string, brandName: string){
        const product: Product = {id:null, name: name, gtin: gtin, price: price, brandName:brandName}
        this.products.push(product)
        this.productsUpdate.next([...this.products]);    
    }

}