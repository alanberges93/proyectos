import { Injectable } from "@angular/core";
import { Observable, ObservableInput } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { UsuarioModel } from "../modelos/usuario";
import { UrlUsuario } from "../global/urlUsuario";

@Injectable()
export class SesionService{
    public urlUsuario: UrlUsuario;

    constructor(private _http: HttpClient){
        this.urlUsuario= new UrlUsuario();
    }

    // Petición al backend para buscar y obtener el usuario con ese nombre y contraseña de la base de datos 
    getUsuario(nombre:string, password:string){
        var datosUsuario = nombre + "-" + password;
        return this._http.get(this.urlUsuario.get+datosUsuario);
    }

}