import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/servicios/proyectoService';
import { ProyectoModel } from 'src/app/modelos/pyoyecto';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UrlProyectos } from 'src/app/global/urlProyectos';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css'],
  providers:[ProyectoService]
})
export class DetalleProyectoComponent implements OnInit {
  public id:string;
  public proyecto: any;
  public proyectoModificado: any;
  public urlProyectos:UrlProyectos;
  public editable:boolean; 
  public proyectoGuardado:string;
  public sesion:any;

  constructor(private _proyectService:ProyectoService, private _router:Router, private _route:ActivatedRoute) {       
    this.id="";
    this.proyecto={};
    this.proyectoModificado={};
    this.urlProyectos=new UrlProyectos();
    this.editable=false;   
    this.proyectoGuardado="";
  }

  ngOnInit(): void {  
    // Obtener la variable de sesión. Si es nula, los botones "Modificar" y "Borrar" permanecerán ocultos
    this.sesion = localStorage.getItem("sesion");     
    // Obtener id de la ruta del proyecto
    this._route.params.subscribe(params=>{
      this.id=params.id;
      // Llamada a getProyecto      
      this.getProyecto();
    });
  }
  
  // Obtener el proyecto elegido
  getProyecto(){
    // Petición al backend para obtenerlo de la base de datos
    this._proyectService.obtenerProyecto(this.id).subscribe(
      // Si fue exitosa y existe el proyecto:
      response=>{
        if(response){
          // Guardar proyecto en una variable para mostrarlo desde ngModel
          this.proyecto=response;
        }
      },
      // Si ocurrió un error: 
      error=>{
        console.log(error);
      });
  }
  
  // Actualizar el proyecto (al hacer click en el botón "Actualizar", dentro del formulario de edición)
  actualizarProyecto(){
    // Mostrar círculo y mensaje de carga desde ngModel
    this.proyectoGuardado="guardando";
    // Guardar el id del proyecto 
    this.proyectoModificado._id=this.id;
    // Guardar imagen del proyecto
    this.proyectoModificado.imagen=this.proyecto.imagen;
    // Petición al backend para guardarlo en la base de datos
    this._proyectService.actualizarProyecto(this.id,this.proyectoModificado).subscribe(
      // Si fue exitosa:
      response=>{
        console.log(response);
        // Ocultar círculo y mensaje de carga desde ngModel
        this.proyectoGuardado="";        
        // Redirigirse a la página de proyectos
        this._router.navigate(['/proyectos']);
      // Si ocurrió un error:
      },error=>{
        // Mostrar cartel "Mensaje error" desde ngModel
        this.proyectoGuardado="error";
        console.log(error);
      }
    );
  }

  // Borrar el proyecto (al hacer click en el botón "Borrar")
  borrarProyecto(){
    // Cartel para confirmar la eliminación
    var confirmacion = confirm("¿Desea eliminar el proyecto permanentemente?");
    // Si se confirmó:
    if (confirmacion){
      // Petición al backend para borrar proyecto en la base de datos
      this._proyectService.borrarProyecto(this.id).subscribe(
        // Si fue exitosa:
        response=>{
          // Redirigirse a la página de proyectos
          this._router.navigate(['/proyectos']);
          console.log(response);
        // Si ocurrió un error:
        },error=>{
          console.log(error);
        }
      );      
    }    
  }

  // Mostrar el formulario de edición (al hacer click en el botón Modificar)
  habilitarEdicion(){
    this.editable=true;
    this.proyectoModificado = new ProyectoModel();
  }

  // Ocultar el formulario de edición (al hacer click en el botón Cancelar)
  cancelarEdicion(){
    this.proyectoModificado = [];
    this.editable=false;
    this.proyectoGuardado="";
  }

}
