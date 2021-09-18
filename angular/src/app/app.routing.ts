import { AppRoutingModule } from './app-routing.module'; 
    import { ModuleWithProviders} from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    // IMPORTAR NUESTROS COMPONENTES A UTILIZAR. PONGO DOS DE EJEMPLO. 
    import { SobreMiComponent } from './componentes/sobre-mi/sobre-mi.component';
    import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
    import { ContactoComponent } from './componentes/contacto/contacto.component';
    import { CrearProyectoComponent } from './componentes/crear-proyecto/crear-proyecto.component';
    import { DetalleProyectoComponent } from './componentes/detalle-proyecto/detalle-proyecto.component';
    import { SesionComponent } from './componentes/sesion/sesion.component';

    // CREAR URLS Y VINCULARLAS A NUESTROS COMPONENTES. SIGO EL EJEMPLO ANTERIOR
    const appRoutes: Routes = [        
        {path: 'sobre-mi', component: SobreMiComponent}, 
        {path: 'proyectos', component: ProyectosComponent}, 
        {path: 'proyectos/:id', component: DetalleProyectoComponent},
        {path: 'contacto', component: ContactoComponent}, 
        {path: 'crear-proyecto', component: CrearProyectoComponent},
        {path: 'sesion', component: SesionComponent},
        {path: '**', component: SobreMiComponent} // si no se indica la página o si hay error en algun componente se ejecuta "sobre-mi"
    ];
    export const appRoutingProviders: any[] = [];
    export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes); 