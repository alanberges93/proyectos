
export class UrlLocal{
    sobreMi:string;
    proyectos:string;
    crearProyecto:string;
    contacto:string;
    sesion:string;

    constructor(){
        this.sobreMi="http://localhost:4200/sobre-mi/";
        this.proyectos="http://localhost:4200/proyectos/";
        this.crearProyecto="http://localhost:4200/crear-proyecto/";
        this.contacto="http://localhost:4200/contacto/";
        this.sesion="http://localhost:4200/sesion/";
    }

}