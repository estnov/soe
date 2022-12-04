import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { finalize, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {
  correo: string = "";
  password: string = ""; 
  passwordRep: string = ""; 
  msgs1: Message[];
  error: boolean = false;
  urlProfile: string = "";
  showBar: boolean = false;

  uploadPercent: Observable<number | undefined> | undefined;
  urlImage: Observable<string> | undefined;


  constructor(private primengConfig: PrimeNGConfig, public auth: AuthService, 
    private router: Router, private storage: AngularFireStorage) { 
    this.msgs1 = [
      {severity:'error', summary:'Error', detail:'Las contraseñas no coinciden'}
  ];

  this.primengConfig.ripple = true;
  }

  ngOnInit(): void {
    
  }

  crearUsuario(){
    let correoRegEx: RegExp = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    let passwordRegEx: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
    if(this.password == this.passwordRep){
      if(this.correo!="" && this.password!=""){
        if(correoRegEx.test(this.correo)){
          if(passwordRegEx.test(this.password)){
            this.crearUsuarioNormal();
          }
          else{
            this.msgs1 = [{severity:'error', summary:'Error', detail:'Contraseña inválida, esta debe ser:'},
            {severity:'error', summary:'Error', detail:'- Minimo 8 caracteres'},
            {severity:'error', summary:'Error', detail:'- Maximo 15 caracteres'},
            {severity:'error', summary:'Error', detail:'- Al menos una letra mayúscula'},
            {severity:'error', summary:'Error', detail:'- Al menos una letra minúscula'},
            {severity:'error', summary:'Error', detail:'- Al menos un dígito'},
            {severity:'error', summary:'Error', detail:'- No espacios en blanco'},
            {severity:'error', summary:'Error', detail:'- Al menos 1 caracter especial'}];
            this.error=true;
          }
        }
        else{
          this.msgs1 = [{severity:'error', summary:'Error', detail:'El correo no es válido'}];
          this.error=true;
        }
        
      }
      else{
        this.msgs1 = [{severity:'error', summary:'Error', detail:'Existen espacios en blanco'}];
        this.error=true;
      }
    }
    else{
      this.error=true;
    }
  }

  onUpload(event: any){
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0]
    const filePath = `uploads/profile_${id}`
    const ref = this.storage.ref(filePath)
    const task = this.storage.upload(filePath, file)

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
    
  }

  async crearUsuarioNormal(){
    let login = await this.auth.createUserNormal(this.correo, this.password, this.urlProfile)
    console.log(this.correo);
    console.log(this.password);
    console.log(this.urlProfile);
   }
  
   setUrl(url: any){
    this.urlProfile = url;
    return this.urlProfile
   }

}
