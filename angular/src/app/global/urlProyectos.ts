
export class UrlProyectos{
    get:string;
    guardar:string;
    actualizar:string;
    borrar:string;
    imagen:string;
    getImagen:string;

    constructor(){
        this.get="http://localhost:3700/proyectos/get/";
        this.guardar="http://localhost:3700/proyectos/guardar/";
        this.actualizar="http://localhost:3700/proyectos/actualizar/";
        this.borrar="http://localhost:3700/proyectos/borrar/";
        this.imagen="http://localhost:3700/proyectos/imagen/";
        this.getImagen="http://localhost:3700/proyectos/getImagen/";
    }
}
