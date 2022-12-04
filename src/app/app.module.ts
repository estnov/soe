import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ToolbarModule} from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import {SplitButtonModule} from 'primeng/splitbutton';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component';
import {PasswordModule} from 'primeng/password';
import {CalendarModule} from 'primeng/calendar';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import {ProgressBarModule} from 'primeng/progressbar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';


import { HttpClientModule } from '@angular/common/http';
import { VerificarUsuarioComponent } from './pages/verificar-usuario/verificar-usuario.component';
import { ListadoProductosComponent } from './pages/listado-productos/listado-productos.component';
import { NewProductoComponent } from './pages/new-producto/new-producto.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    CrearUsuarioComponent,
    VerificarUsuarioComponent,
    ListadoProductosComponent,
    NewProductoComponent,
    ProductoComponent,
    AyudaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ButtonModule,
    FileUploadModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ToolbarModule,
    RippleModule,
    SplitButtonModule,
    PasswordModule,
    CalendarModule,
    HttpClientModule,
    ProgressBarModule,
    AngularFireStorageModule,
    MessagesModule,
    MessageModule,
    InputTextareaModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
