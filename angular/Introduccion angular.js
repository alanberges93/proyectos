
/* Angular  Cli 

INSTALACION:
  Instalarlo desde el cmd con: npm install -g @angular/cli
  Agregar proyecto desde terminal Visual Code con: ng new nombre-proyecto

INICIAR:
  Posicionarse en el proyecto creado: cd nombre-proyecto
  Iniciarlo con: npm start 
          o con: ng serve 

CARPETAS DEL PROYECTO:
  angular.json: agregar styles y scripts
  src/index.html: pagina de inicio
  src/assets: guardar imagenes, etc globales
  src/app: crear componentes (html, css, ts, etc) ES LA MAS IMPORTANTE!!! 

CREAR COMPONENTES DESDE CONSOLA:
  Automaticamente creará una carpeta en src/app con un ts, html y css, 
  relacionandose con los componentes principales de Angular. Increible.
  Crear componente: ng g component nombre-componente 

HOOKS:
  Es el nombre que se le da a los eventos en Angular. Se escriben en el componente a usar
  onInit() se ejecuta al crearse el componente   
  DoCheck() se ejecuta al modificarse el componente (ej: cambiar texto desde un boton)
  onDestroy() se ejecuta al eliminarse el componente (ej: al borrar otro componente adentro de este) 

CONDICIONALES Y CICLOS NG:
  En el html se puede poner condiciones en las etiquetas, para que se muestren/oculten, o incluso se creen repeticiones en ciclos
  If: <div *ngIf="condicion; else id_template_else">Conetindo a mostrarse si la condicion es verdadera.</div>
      <ng-template #id_template_else> Contenido a mostrarse si la condicion es falsa </ng-template>   
  Class: <div [class.nombre_clase]="condicion">Conetindo a agregarse a la clase si la condicion es verdadera.</div>
  Style: 
  ForEach:  <li *ngFor="let item of arreglo; index as i;> Contenido a repetirse por cada item del for 
  </li> 
  
BINDING BIDIRECCIONAL NG:
  Se puede relacionar los input del html con variables de ts, de modo que cuando uno de los dos cambie, el otro tenga el mismo valor
  ngModel: <input type="text" [(ngModel)]="nombre_variable"> 
  Para que funcione, hay que inmportar FormsModule en app.module.ts:
    import { FormsModule } from '@angular/forms';
    imports: [FormsModule ]
  
EVENTOS:
  También se pueden capturar eventos desde html, llamando a la funcion en ts
  click: <button (click)="nombre_funcion()">Loguear</button>
  keyup: <button (keyup.enter)="nombre_funcion()">Loguear</button> // capturo el evento cuando aprieto Enter 
    
SERVICIOS:
  Contienen la funcionalidad de un componente, para mejor organización. Si por ejemplo tengo el componente Videojuego, que muestra en pantalla
  un listado de videojuegos, usuarios online, etc, lo ideal es que la lógica esté separada en un servicio (por ej: crear vector de juegos y usuarios),
  y nuestro componente la utilice (la injecte).
  1) Crear un archivo ts para nuestro servicio, que use el decorador externo "injectable":
      import { Injectable } from "@angular/core";
      @Injectable()
      export class VideojuegoService{
         .............          
      }
  2) Importar e injectar el servicio en nuestro componente:
      import { VideojuegoService } from '../Servicios/Videojuego.service';
      @Component({        
        providers: [VideojuegoService]
      })
      export class VideojuegoComponent {  
        constructor(_videojuegoService:VideojuegoService){} 
      } 

ROUTERS:
  Sirve para comunicar diferentes componentes y parámetros a través de la url. 
  Es una de las cosas mas complejas, debido a que requiere tipear mucho código manualmente en varios archivos diferentes, pero es indispensable para comunicar datos.
  1) Crear una plantilla ts en la carpeta src/app (ej: app.routing.ts) y cargarla con el sig codigo:  
    import { AppRoutingModule } from './app-routing.module'; 
    import { ModuleWithProviders} from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    // IMPORTAR NUESTROS COMPONENTES A UTILIZAR. PONGO DOS DE EJEMPLO. 
    import { HomeComponent } from './home/home.component';  
    import { VideojuegoComponent } from './Videojuego/videojuego.component'; 
    // CREAR URLS Y VINCULARLAS A NUESTROS COMPONENTES. SIGO EL EJEMPLO ANTERIOR
    const appRoutes: Routes = [        
        {path: 'home', component: HomeComponent}, // en la pag principal se ejecuta Home
        {path: 'home/:nombre', component: HomeComponent}, // le agrego un parámetro opcional (el ":" significa opcional, sino estuviera seria obligatorio)
        {path: 'videojuego', component: VideojuegoComponent}, // en la pag /videojuego se ejecuta Videojuego
        {path: '**', component: HomeComponent} // si no se indica la página o si hay error en algun componente se ejecuta el Home
    ];
    export const appRoutingProviders: any[] = [];
    export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes); 
  2) Importar en app.module.ts nuestro componente del router, con el siguiente codigo:
     import { routing, appRoutingProviders } from './app.routing';
     ...........
     @NgModule({
        ........
        imports: [          
          routing
        ],
        providers: [
          appRoutingProviders
        ]
     })
  3) Cargar (al final del código) en app.component.html la etiqueta del router: <router-outlet></router-outlet>
    Esto hará que dependiendo nuestra url, se cargará la etiqueta de un componente u otro.
    Ej: si estamos en localhost:4200/home se cargará automaticamente la etiqueta <home></home> con su contenido
  4) Obtener parámetros de la URL. Ej: obtener el nombre de localhost:4200/home/nombre
    En la plantilla ts de nuestro componente (Ej: home.component.ts) importar componente router, definir el constructor y onInit de la sig manera:
          import { Component, OnInit } from '@angular/core';
          import { Router, ActivatedRoute, Params } from '@angular/router';
          .............
          constructor(private _route:ActivatedRoute, private _router: Router) {
            this.nombre=""; // Variable creada en la clase, usada para guardar el parámetro, en este ejemplo es un nombre            
          }
          ngOnInit(): void {
            this._route.params.subscribe((params:Params) =>{              
              this.nombre=params.nombre; // guardo el parámetro
            });
          }              
  5) Redireccionarme a otra pagina. Usando el sig codigo: this._router.navigate(['/home'])

PETICIONES AJAX A APIS EXTERNAS:
  1) Importar en el app.module.ts el componente de HTTP para habilitar las peticiones:
      import { HttpClientModule } from '@angular/common/http';
      imports: [     
        HttpClientModule
      ]
  2) Crear un servicio para las peticiones (ej: peticiones.service.ts) que utilice los componentes Injectable, HTTP y Observable:
      import { Injectable } from "@angular/core";
      import { HttpClient, HttpHeaders } from "@angular/common/http";
      import { Observable } from "rxjs";
      @Injectable()
      export class PeticionesService{    
          constructor(_http:HttpClient){            
          }
          this._http.get(url); // obtiene un json de una url (la url debe permitir peticiones ajax) 
          return this._http.post(url,json); // envía un json a una url (la url debe permitir peticiones ajax)         
      }   
  3) Usar el servicio en algún componente, como expliqué en el apartado SERVICIOS */
