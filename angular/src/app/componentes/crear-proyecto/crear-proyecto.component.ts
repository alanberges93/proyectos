import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ProyectoModel } from 'src/app/modelos/pyoyecto';
import { ProyectoService } from 'src/app/servicios/proyectoService';
import { subirArchivoService } from 'src/app/servicios/subirArchivosService';
import { UrlLocal } from 'src/app/global/urlLocal';
import { UrlProyectos } from 'src/app/global/urlProyectos';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css'],
  providers: [ProyectoService, subirArchivoService]
})
export class CrearProyectoComponent implements OnInit {  
  public titulo:string;
  public proyecto:ProyectoModel;
  public proyectoNuevo:ProyectoModel;
  public proyectoCargado:string;
  public urlLocal:UrlLocal;
  public urlProyectos:UrlProyectos;
  public imagenesParaSubir:any;
  public sesion:any;

  constructor(private _proyectoService: ProyectoService, private _subirArchivo: subirArchivoService) { 
    this.titulo = "Crear Proyecto";
    this.proyecto = new ProyectoModel();
    this.proyectoNuevo = new ProyectoModel();
    this.proyectoCargado="";
    this.urlLocal = new UrlLocal();
    this.urlProyectos = new UrlProyectos();
  }

  ngOnInit(): void {
    this.sesion=localStorage.getItem("sesion");
  }

  // Crear proyecto con los datos cargados en el formulario
  crearProyecto(formulario:any){ 
    // Mostrar círculo y texto de carga
    this.proyectoCargado="cargando";   
    // Petición al backend para guardar el proyecto en la base de datos
    this._proyectoService.guardarProyecto(this.proyecto).subscribe(
      // Si fue exitosa:
      response=>{  
        console.log(response);         
        // Petición al backend para guardar la imagen del proyecto
        this._subirArchivo.subirArchivos(this.urlProyectos.imagen+response._id,[],this.imagenesParaSubir,"imagen")
        .then((resultado:any)=>{ 
          // Guardar el proyecto en una variable 
          this.proyectoNuevo=resultado;
          // Ocultar círculo y texto de carga. Mostrar cartel "Mensaje exitoso" desde ngModel con la ruta para ver el proyecto
          this.proyectoCargado="exitoso";
          // Resetear formulario 
          formulario.reset();        
        });        
      },
      // Si ocurrió un error:
      error =>{        
        console.log(error);
        // Ocultar círculo y texto de carga. Mostrar cartel "Mensaje error" desde ngModel
        this.proyectoCargado="error";
      }
    );
  }

  // Guardar imagen en un arreglo para enviar al backend
  guardarImagen(archivo:any){
    console.log(archivo.target.files);
    this.imagenesParaSubir = <Array<File>>archivo.target.files;
  }
  
}
