import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  producto: Producto = new Producto();

  constructor(private http: HttpClient, 
    private auth: AuthService, private router: Router) {

   }
   
   addProduct(producto: Producto){
    
    let url = environment.WS_PATH + "add_product"
    console.log("adding product")

    this.http.post<any>(url, producto).subscribe(
      data => {
        if(data.codigo==0){
          this.router.navigate(['listado'])
        }
        else{
          console.log("El usuario ha expirado")
        }
      }
    );

    }

    listProduct(){
      let url = environment.WS_PATH + "listaProductos"
      return this.http.get<any>(url);
    }

    getProduct(uid: number){
      this.producto = new Producto()
      let url = environment.WS_PATH + "producto"
      
      return this.http.post<any>(url, uid).subscribe(
        data => {
          if(data.codigo==0){

            console.log(data.productoDest.titulo);
            this.producto.titulo=(data.productoDest.titulo);
            this.producto.categoria=(data.productoDest.categoria);
            this.producto.descripcion=(data.productoDest.descripcion);
            this.producto.imagen=(data.productoDest.imagen);
            this.producto.precio=(data.productoDest.precio);
            this.producto.titulo=(data.productoDest.titulo);
            this.producto.uid=(data.productoDest.uid);

            this.router.navigate(['producto'])
          }
          
        }
      );
    }


}
