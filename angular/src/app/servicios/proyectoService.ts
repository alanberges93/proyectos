
import { Injectable } from "@angular/core";
import { Observable, ObservableInput } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { ProyectoModel } from "../modelos/pyoyecto";
import { UrlProyectos } from "../global/urlProyectos";

@Injectable()
export class ProyectoService{
    public urlProyectos: UrlProyectos;

    constructor (private _http:HttpClient){
        this.urlProyectos= new UrlProyectos();
    }

    // Petición al backend para guardar el proyecto en la base de datos
    guardarProyecto(proyecto:ProyectoModel):Observable<any>{
        let params = JSON.stringify(proyecto);
        let headers = new HttpHeaders().set('Content-Type','application/json');        
        return this._http.post(this.urlProyectos.guardar,params,{headers: headers});
    }

    // Petición al backend para obtener un proyecto de la base de datos, según su id
    obtenerProyecto(id:string){
        return this._http.get(this.urlProyectos.get+id);
    }    

    // Petición al backend para obtener todos los proyectos de la base de datos 
    obtenerProyectos(){
        return this._http.get(this.urlProyectos.get);
    }

    // Petición al backend para guardar imagen del proyecto en la base de datos, según id
    guardarImagen(id:string, archivo:any){
        let headers = new HttpHeaders().set('Content-Type','application/json');
        let params={
            imagen: archivo
        }
        console.log(id);
        console.log(params);
        return this._http.post(this.urlProyectos.imagen+id,params,{headers: headers});
    }

    // Petición al backend para actualizar un proyecto, según su id
    actualizarProyecto(id:string, proyectoModificado:ProyectoModel){
        let params = JSON.stringify(proyectoModificado);
        let headers = new HttpHeaders().set('Content-Type','application/json'); 
        return this._http.put(this.urlProyectos.actualizar+id, params,{headers: headers});
    }

    // Petición al backend para eliminar un proyecto, según su id
    borrarProyecto(id:string){        
        return this._http.delete(this.urlProyectos.borrar+id);
    }
}


