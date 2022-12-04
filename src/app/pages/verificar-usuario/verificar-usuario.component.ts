import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AsyncSubject, finalize, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verificar-usuario',
  templateUrl: './verificar-usuario.component.html',
  styleUrls: ['./verificar-usuario.component.scss']
})
export class VerificarUsuarioComponent implements OnInit {
  nombres: string = "";
  apellidos: string = "";
  cedula: string = "";
  direccion: string = "";
  ciudad: string = "";
  telefono: string = "";
  fechaNacimiento: Date = new Date();
  password: string = "";
  urlId: string = "";

  uploadPercent: Observable<number | undefined> | undefined;
  urlImage: Observable<string> | undefined;

  msgs1: Message[];
  error: boolean = false;
  constructor(private router: Router, 
    private storage: AngularFireStorage, private auth: AuthService) { 
      this.msgs1 = [ {severity:'error', summary:'Error', detail:'Debe llenar todos los campos'} ];
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

   verificar(){
    if(this.nombres!= "", this.apellidos!= "", this.direccion!= "", this.ciudad!= "", this.telefono!= "", this.fechaNacimiento!= null, this.cedula!= "", this.urlId!= ""){
      this.auth.verifyUser(this.nombres, this.apellidos, this.direccion, this.ciudad, this.telefono, this.fechaNacimiento, this.cedula, this.urlId);
      this.error=false;
    }
    else{
      this.error=true;
    }
    
   }

}
