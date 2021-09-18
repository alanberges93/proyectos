import { Injectable } from "@angular/core";
import { Observable, ObservableInput } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { MensajeModel } from "../modelos/mensaje";
import { UrlMail } from "../global/urlMail";

@Injectable()
export class ContactoService{
    public urlMail: UrlMail;

    constructor(private _http: HttpClient){
        this.urlMail= new UrlMail();
    }

    // Petición al backend para enviar mail
    enviarMail(mensaje:MensajeModel){
        let params = JSON.stringify(mensaje);
        let headers = new HttpHeaders().set('Content-Type','application/json');        
        return this._http.post(this.urlMail.enviar+"enviar",params,{headers: headers});
    }

}