import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/modelos/usuario';
import { SesionService } from 'src/app/servicios/sesionService';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css'],
  providers:[SesionService]
})
export class SesionComponent implements OnInit {
  public titulo:string;
  public usuarioIngresado:string;
  public passwordIngresada:string;
  public sesion:any;
  public sesionIniciada:string;
  public nombreUsuario:string;

  constructor(private _sesionService:SesionService) {
    this.titulo="Iniciar sesión";
    this.usuarioIngresado = "";
    this.passwordIngresada="";
    this.sesion = localStorage.getItem("sesion")?.toString();
    this.sesionIniciada="";
    this.nombreUsuario="";
  } 

  ngOnInit(): void {
  }

  // Iniciar sesión con el usuario y contraseña ingresados en el formulario
  iniciarSesion(form:any){
    // Mostrar círculo y texto de carga desde ngModel
    this.sesionIniciada="cargando";
    // Petición al backend para obtener el usuario de la base de datos
    this._sesionService.getUsuario(this.usuarioIngresado, this.passwordIngresada).subscribe(
      // Si fue exitosa:
      response=>{
        // Guardar usuario en variable
        var usuario:any = response;
        // Si hay un usuario para mostrar: 
        if(usuario[0]){
          // Guardar el nombre para mostrar desde ngModel
          this.nombreUsuario = usuario[0].nombre;
          // Ocultar círculo y texto de carga desde ngModel. Mostrar sesión iniciada
          this.sesionIniciada="exitosa";
          // Registrar en local storage que se inició la sesión
          localStorage.setItem("sesion","iniciada");
          // Actualizar la variable de sesión con los nuevos datos
          this.sesion = localStorage.getItem("sesion")?.toString();
          // Resetear el formulario
          form.reset();          
        } 
        // Si no hay usuario en la base de datos con ese nombre y contraseña:
        else {
          // Ocultar círculo y texto de carga desde ngModel. Mostrar cartel "Mensaje inválido" desde ngModel
          this.sesionIniciada="invalida";
          // Después de 7 segundos ocultar cartel "Mensaje inválido" desde ngModel
          setTimeout(() => {
            this.sesionIniciada="";
          }, 7000);
        }       
      }, 
      // Si ocurrió un error:
      error=>{     
         // Ocultar círculo y texto de carga desde ngModel. Mostrar cartel "Mensaje error" desde ngModel   
        this.sesionIniciada="error";        
      });
  }

  // Cerrar sesión (al hacer click en el botón "Cerrar sesión")
  cerrarSesion(){
    // Blanquear la sesión del local storage
    localStorage.setItem("sesion","");
    // Actualizar la variable de sesión con los nuevos datos
    this.sesion = localStorage.getItem("sesion")?.toString();
  }
}
