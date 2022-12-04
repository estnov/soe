import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { AuthService } from './services/auth.service';

interface Category {
  name: string,
  code: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  categories: Category[];
  userItems: MenuItem[];
  inicioItems: MenuItem[];
  showBar: boolean = true;


  selectedCategory: Category = {name: '',code: ''};

  constructor(private router: Router, private auth: AuthService){

    this.categories = [
      {name: 'Todo', code:"ALL"},
      {name: 'Vehiculos', code:"VH"},
      {name: 'Inmuebles', code:"IN"},
      {name: 'Articulos musicales', code:"AM"},
      {name: 'Juguetes', code:"JG"},
      {name: 'Tecnologia', code:"TC"},
    ]

    this.userItems = [
      {label:'Mis mensajes', icon: 'pi pi-inbox', command: () => {/*metodo para ir a los mensajes*/ }},
      {label:'Mis pagos', icon: 'pi pi-wallet', command: () => {/*metodo para ir a los mensajes*/ }},
      {label:'Mis anuncios', icon: 'pi pi-list', command: () => {/*metodo para ir a los mensajes*/ }},
      {label:'Configuración', icon: 'pi pi-cog', command: () => {/*metodo para ir a los mensajes*/ }},
      {separator: true},
      {label:'Cerrar sesión', icon: 'pi pi-user-minus', command: () => {this.cerrarSesion()}},
    ]

    this.inicioItems =[
      {label:'Crear usuario', icon: 'pi pi-user-plus', command: () => {this.goCrearUsuario() }},
      {label:'Iniciar sesión', icon: 'pi pi-users', command: () => {this.goIniciarSesion()}},
    ]
  }
  ngAfterViewInit() {
    
  }

  goIniciarSesion(){
    this.router.navigate(['login']);
  }

  goListado(){
    this.router.navigate(['']);
  }

  goAyuda(){
    this.router.navigate(['help']);
  }

  goCrearUsuario(){
    this.router.navigate(['signup']);
  }

  getIniciado(){
    if(localStorage.getItem("login") =="true"){
      return true
    }
    else{
      return false
    }
  }

  goAddProducto(){
    this.router.navigate(['new_product']);
  }

  cerrarSesion(){
    localStorage.setItem("login","false")
    this.auth.cerrarSesion();
    this.router.navigate(['']);
  }
}
