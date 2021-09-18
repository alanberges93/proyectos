
export class UsuarioModel{
    public nombre:string;    
    public apellido:string;
    public email:string;
    public nacimiento:string;
    public password:string;

    constructor(){
        this.nombre="";
        this.apellido="";
        this.email="";
        this.nacimiento="";
        this.password="";
    }
}