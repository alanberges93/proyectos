import { Injectable } from "@angular/core";

@Injectable()
export class subirArchivoService{

    constructor(){
    }
    
     subirArchivos(url:string, params:Array<string>, archivos: Array<File>,nombre:string){
        return new Promise(function(resolve,reject){
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i =0; i<archivos.length; i++){
                formData.append(nombre,archivos[i],archivos[i].name);                
            }
            xhr.onreadystatechange = function(){
                if (xhr.readyState==4){
                    if(xhr.status==200){
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);                        
                    }                    
                }
            }
            xhr.open("POST",url,true);
            xhr.send(formData);
        });
    }
}