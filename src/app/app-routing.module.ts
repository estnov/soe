import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { ListadoProductosComponent } from './pages/listado-productos/listado-productos.component';
import { NewProductoComponent } from './pages/new-producto/new-producto.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { VerificarUsuarioComponent } from './pages/verificar-usuario/verificar-usuario.component';

const routes: Routes = [
  { path:"login", component: InicioSesionComponent},
  
  { path:"signup", component: CrearUsuarioComponent},

  { path:"verify", component: VerificarUsuarioComponent},

  { path:"listado", component: ListadoProductosComponent},

  { path:"", component: ListadoProductosComponent},

  { path:"new_product", component: NewProductoComponent},

  { path:"help", component: AyudaComponent},

  { path:"producto", component: ProductoComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
