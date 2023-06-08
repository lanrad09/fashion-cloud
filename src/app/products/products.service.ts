import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

import { Product } from './product.model';



@Injectable({providedIn: 'root'})
export class ProductsService {

    private products: Product[] = [];
    private productsUpdate = new Subject<Product[]>(); 

    getProducts() {
        return [...this.products];
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