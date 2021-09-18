export class ProyectoModel{
    public _id: string; 
    public nombre:string; 
    public descripcion:string; 
    public categoria: string; 
    public year: any;
    public imagen:any

    constructor(){
        this._id = "";
        this.nombre = "";
        this.descripcion = "";
        this.categoria = "";
        this.year= "";
        this.imagen = ""
    }
}