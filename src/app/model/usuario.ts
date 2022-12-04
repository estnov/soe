export class Usuario {
    cedula: string = '';
	cedulaFoto: string = '';
	nombres: string = '';
	apellidos: string = '';
	direccion: string = '';
	ciudad: string = '';
	puntuacion: number = 3;
	telefono: string = '';
	verificado: boolean = false;
	fechaNacimiento: Date = new Date();
	fechaCreacion: Date = new Date();
	ultimoAcceso: Date = new Date();
	correo: string = '';
	contrasena: string = '';
	codigoUnico: string = '';
    urlFoto: string = '';
}