import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/servicios/proyectoService';
import { ProyectoModel } from 'src/app/modelos/pyoyecto';
import { UrlProyectos } from 'src/app/global/urlProyectos';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
  providers: [ProyectoService]
})
export class ProyectosComponent implements OnInit {
  public titulo:string;
  public proyectos: any;
  public urlProyectos: UrlProyectos;
  public proyectosCargados:string;

  constructor(private _proyectoService:ProyectoService) {
    this.titulo="Mis Proyectos";
    this.proyectos=[];
    this.urlProyectos=new UrlProyectos();
    this.proyectosCargados="";
  }

  ngOnInit(): void {    
    this.obtenerProyectos();
  }

  // Obtener todos los proyectos 
  obtenerProyectos(){
    // Mostrar círculo y texto de carga desde ngModel
    this.proyectosCargados="cargando";
    // Petición al backend para obtener los proyectos de la base de datos
    this._proyectoService.obtenerProyectos().subscribe(
      // Si fue exitosa y hay proyectos:
      response=>{
        if(response){
          // Ocultar círculo y texto de carga desde ngModel
          this.proyectosCargados="";
          // Guardar proyectos en variable para listar desde ngModel
          this.proyectos=response;
          console.log(this.proyectos);
        }
      },
      // Si ocurrió un error:
      error =>{ 
        console.log(error);
        // Ocultar círculo y texto de carga desde ngModel. Mostrar cartel "Mensaje error" desde ngModel
        this.proyectosCargados="error";        
      } 
    );
  }

}
