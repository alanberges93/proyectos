import { Component, OnInit } from '@angular/core';
import { MensajeModel } from 'src/app/modelos/mensaje';
import { ContactoService } from 'src/app/servicios/contactoService';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers:[ContactoService],
})
export class ContactoComponent implements OnInit {
  public titulo:string;
  public mensaje: MensajeModel;
  public mensajeEnviado:string;

  constructor(private _contactoService:ContactoService) {
    this.titulo="Contacto";
    this.mensaje = new MensajeModel();
    this.mensajeEnviado="";
   }

  ngOnInit(): void {
  }

  // Enviamos por mail los datos cargados en el formulario
  enviarMail(formulario:any){   
    // Mostrar círculo y texto de carga
    this.mensajeEnviado="guardando";
    this._contactoService.enviarMail(this.mensaje).subscribe(
      // Si fue exitoso: 
      response=>{
        console.log(response);
        // Limpiar formulario
        formulario.reset(); 
        // Ocultar círculo y texto de carga. Mostrar cartel "Mensaje éxitoso" desde ngModel
        this.mensajeEnviado="exitoso";
        // Después de 7 segundos ocultar cartel "Mensaje éxitoso" desde ngModel
        setTimeout(() => {
          this.mensajeEnviado="";
        }, 7000);
      // Si ocurrió un error:
      }, error=>{
        console.log(error);
        // Ocultar círculo y texto de carga. Mostrar cartel "Mensaje error" desde ngModel
        this.mensajeEnviado="error"
        // Después de 7 segundos ocultar cartel "Mensaje error" desde ngModel
        setTimeout(() => {
          this.mensajeEnviado="";
        }, 7000);
      }
    );    
  }

}
