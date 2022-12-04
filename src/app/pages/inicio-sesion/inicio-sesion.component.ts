import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

  showBar: boolean = false;
  correo: string = "";
  password: string = "";
  msgs1: Message[];
  error: boolean = false;

  constructor(public auth: AuthService, 
    private router: Router) { 
      this.msgs1 = [ {severity:'error', summary:'Error', detail:'Credenciales incorrectas'} ];
    }

  ngOnInit(): void {

  }

 async inicioSesionGoogle(){
    let login = await this.auth.loginGoogle()

    if(login){
      alert("se inicio sesion correctamente con google")
    }
    else{
      alert("error")

    }
  }

 async inicioSesionNormal(){
  
   this.auth.iniciarSesion(this.correo, this.password)
   if(this.getIniciado()){
    this.error=false;
   }
   else{
    this.error=true;
   }
  }

  getIniciado(){
    if(localStorage.getItem("login") == "true"){
      this.error=false;
      return true
    }
    else{
      this.error=true;
      return false
    }
  }

  
}
