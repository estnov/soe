import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Observable, finalize } from 'rxjs';
import { Producto } from 'src/app/model/producto';
import { ProductsService } from 'src/app/services/products.service';

interface Category {
  name: string,
  code: string
}

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.scss']
})
export class NewProductoComponent implements OnInit {
  titulo: string = ''
  descripcion: string = ''
  precio: number = 0
  categoria: Category = {name: 'Vehiculos', code: 'VH'}
  imagenes : any [] = []

  urlId: string = "";

  producto: Producto = new Producto(); 

  uploadPercent: Observable<number | undefined> | undefined;
  urlImage: Observable<string> | undefined;

  
  msgs1: Message[];
  categories: Category[];
  error: boolean = false;

  constructor(private router: Router, 
    private storage: AngularFireStorage,
    private productService: ProductsService) {
      this.msgs1 = [ {severity:'error', summary:'Error', detail:'Debe llenar todos los campos'} ];
     
      this.categories = [
        {name: 'Vehiculos', code:"VH"},
        {name: 'Inmuebles', code:"IN"},
        {name: 'Articulos musicales', code:"AM"},
        {name: 'Juguetes', code:"JG"},
        {name: 'Tecnologia', code:"TC"},
      ]
    
    }

  ngOnInit(): void {
  }

  onUpload(event: any){
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0]
    const filePath = `uploads/cedula_${id}`
    const ref = this.storage.ref(filePath)
    const task = this.storage.upload(filePath, file)

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();

  }

  setUrl(url: any){
    this.urlId = url;
    return this.urlId
   }

   addProducto(){
    console.log(this.titulo)
    console.log(this.categoria.name)
    console.log(this.descripcion)
    console.log(this.urlId)
    console.log(this.precio)
    if(this.titulo!="" && this.categoria.name!="" && this.descripcion!="" && this.urlId!="" && this.precio!=0 ){
      this.producto = new Producto();
      this.producto.titulo = this.titulo;
      this.producto.descripcion = this.descripcion;
      this.producto.precio = this.precio;
      this.producto.categoria = this.categoria.name;
      this.producto.imagen = this.urlId;
      this.error=false;
      this.productService.addProduct(this.producto)
    }
    else{
      this.error= true;
    }

   }

   getDescripcion(descrip:string){
    this.descripcion = descrip
    this.addProducto();
   }

}
