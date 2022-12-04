import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/model/producto';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  producto: Producto;

  constructor(private router: Router, private productService: ProductsService) 
  { 
    this.producto = productService.producto;
  }

  ngOnInit(): void {
  }

}
