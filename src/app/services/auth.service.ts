import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { Credenciales } from '../model/credenciales';



@Injectable({
  providedIn: 'root'
})


export class AuthService {

  public usuario: Usuario = new Usuario();
  cred: Credenciales = new Credenciales();

  constructor(public auth: AngularFireAuth,
    private http: HttpClient, private router: Router) {
    this.auth.authState.subscribe((user) => {
      console.log(user);
      if (user) {
        localStorage.setItem("login", "true")
      } else {
        localStorage.setItem("login", "false")
      }
    });
   }

   isLoggedIn(){
    if(localStorage.getItem("login")=="true"){
      return true;
    }
    else{
      return false;
    }
  }

  async updateUserData(user: any){
    this.usuario = new Usuario();

    let url = environment.WS_PATH + "loginThirdParty"

    console.log(url);

    const providerData = user?.providerData[0]
    
    this.usuario.nombres = providerData.displayName;
    this.usuario.codigoUnico = user?.uid;
    this.usuario.urlFoto = providerData.photoURL;
    this.usuario.correo = providerData.email;

    console.log(this.usuario.codigoUnico);
    console.log(this.usuario.nombres);
    
    this.http.post<any>(url, this.usuario).subscribe(
      data => {
        if(data.codigo==0){
          console.log("creado")
          localStorage.setItem("login", "true")
          this.router.navigate([''])
        }
        else{
          if(data.codigo==99){
            console.log("Falta verificar")
            this.router.navigate(['verify'])
          }
          else if(data.codigo==404){
            console.log("Error al añadir");
          }
        }
      }
    );
  }

  loginGoogle() {
    return new Promise(async (resolve, reject) => {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(credential => {
          console.log(credential)
          console.log(credential.user)
          this.updateUserData(credential.user)
          resolve(true)
      }).catch(()=> {
          resolve(false)
      });
    });
  } 


  createUserNormal(correo: string, contraseña: string, photoUrl: string){

    this.usuario = new Usuario();

    let url = environment.WS_PATH + "create_user"

    const id = Math.random().toString(36).substring(2);
    const uid = `user_${id}`
    this.usuario.contrasena = contraseña;
    this.usuario.codigoUnico = uid;
    this.usuario.urlFoto = photoUrl;
    this.usuario.correo = correo;

    this.http.post<any>(url, this.usuario).subscribe(
      data => {
        if(data.codigo==1){
          console.log("iniciado")
          localStorage.setItem("login", "true")
        }
        else{
          if(data.codigo==0){
            console.log("creado el registro")
            this.router.navigate(['verify'])
          }
          else if(data.codigo==404){
            console.log("Error al añadir");
          }
        }
      }
    );
  }

  verifyUser(nombres: string, apellidos: string, direccion: string, ciudad: string, telefono: string, fechaNacimiento: Date, numCedula: string, cedulaUrl: string){


    let url = environment.WS_PATH + "verify_user"

    console.log("Verificando")
    console.log(this.usuario.codigoUnico)

    this.usuario.nombres= nombres;
    this.usuario.apellidos = apellidos;
    this.usuario.direccion = direccion;
    this.usuario.ciudad = ciudad;
    this.usuario.telefono = telefono;
    this.usuario.fechaNacimiento = fechaNacimiento;
    this.usuario.cedula = numCedula;
    this.usuario.cedulaFoto = cedulaUrl;

    console.log(this.usuario.cedulaFoto)

    this.http.post<any>(url, this.usuario).subscribe(
      data => {
        if(data.codigo==0){
          console.log("Verificado satisfactoriamente")
          localStorage.setItem("login", "true")
          this.router.navigate(['listado']);
        }
        else{
          console.log("error en algun punto")
        }
      }
    );
  }

  iniciarSesion(correo: string, contrasena: string){
    this.usuario = new Usuario();
    this.cred = new Credenciales();
    this.cred.correo = correo;
    this.cred.contrasena = contrasena;

    let url = environment.WS_PATH + "iniciar_sesion"
    console.log("Iniciando sesion")

    this.http.post<any>(url, this.cred).subscribe(
      data => {
        if(data.codigo==0){
          this.usuario.codigoUnico = data.usuarioDest.codigoUnico;
          console.log(data.usuarioDest.codigoUnico)
          localStorage.setItem("login", "true")
          this.router.navigate(['listado'])
        }
        else{
          localStorage.setItem("login", "false")
          console.log("credenciales incorrectas")
        }
      }
    );
  }

  cerrarSesion(){
    this.auth.signOut();
  }


}
