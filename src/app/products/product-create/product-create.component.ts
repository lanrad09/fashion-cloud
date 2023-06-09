import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';


@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

    ola = "NO Issues";
    gbawa = '';
   

    constructor(public productsService: ProductsService) {}


    onAddProduct(form: NgForm) {
        
        if (form.invalid) {
            return;
        }
// Question mark?
        this.productsService.addProduct(form.value.name,form.value.gtin,form.value.brandName,form.value.price, form.value.brandName);
        form.resetForm();

        // console.log("I am adding product!")
        // console.log(this.productsService);

       
    }

}