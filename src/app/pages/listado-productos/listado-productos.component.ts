import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss']
})
export class ListadoProductosComponent implements OnInit {
  productos: any;
  codigounico : string = ""

  constructor(private auth: AuthService, private productService: ProductsService) { 
    this.list()
    this.codigounico = auth.usuario.codigoUnico;
    console.log(this.codigounico)
    console.log(this.productos)
  }


  ngOnInit(): void {

  }

  list(){
    this.productos=this.productService.listProduct()
  }

  getIniciado(){
    if(localStorage.getItem("login") =="true"){
      return true
    }
    else{
      return false
    }
  }

  goProducto(uid:number){
    this.productService.getProduct(uid);
  }


}
