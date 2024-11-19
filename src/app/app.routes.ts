import { RutasAsignacionesComponent } from './components/rutas/rutas-asignaciones/rutas-asignaciones.component';
import { BusAsignacionesComponent } from './components/buses/bus-asignaciones/bus-asignaciones.component';
import { Routes } from '@angular/router';
import { BusListComponent } from './components/buses/bus-list.component';
import { ConductorCreateComponent } from './components/conductores/conductor-create.component';
import { ConductorListComponent } from './components/conductores/conductor-list.component';
import { HorarioCreateComponent } from './components/horarios/horario-create.component';
import { HorarioListComponent } from './components/horarios/horario-list.component';
import { RutaCreateComponent } from './components/rutas/ruta-create.component';
import { RutaListComponent } from './components/rutas/ruta-list.component';
import { EditConductorComponent } from './components/conductores/conductor-edit/conductor-edit.component';
import { ConductorAsignacionesComponent } from './components/conductores/conductor-asignaciones/conductor-asignaciones.component';
import { BusEditComponent } from './components/buses/bus-edit/bus-edit.component';
import { RutasEditComponent } from './components/rutas/rutas-edit/rutas-edit.component';
import { HorariosEditComponent } from './components/horarios/horarios-edit/horarios-edit.component';
import { HorariosAsignacionesComponent } from './components/horarios/horarios-asignaciones/horarios-asignaciones.component';
import { BusCreateComponent } from './components/buses/bus-create/bus-create.component';
import { AsignacionesListComponent } from './components/asignaciones/asignaciones-list/asignaciones-list.component';
import { AsignacionesCreateComponent } from './components/asignaciones/asignaciones-create/asignaciones-create.component';
import { AsignacionesEditComponent } from './components/asignaciones/asignaciones-edit/asignaciones-edit.component';
import { LoginComponent } from './security/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'buses', component: BusListComponent, canActivate:[AuthGuard] },
    { path: 'buses/create', component: BusCreateComponent, canActivate:[AuthGuard] },
    { path: 'buses/edit/:id', component: BusEditComponent, canActivate:[AuthGuard]},
    { path: 'buses/asignaciones/:id', component: BusAsignacionesComponent, canActivate:[AuthGuard] },
    { path: 'conductores', component: ConductorListComponent, canActivate:[AuthGuard] },
    { path: 'conductores/create', component: ConductorCreateComponent, canActivate:[AuthGuard] },
    { path: 'conductores/edit/:id', component: EditConductorComponent, canActivate:[AuthGuard] },
    { path: 'conductores/asignaciones/:id', component: ConductorAsignacionesComponent, canActivate:[AuthGuard] },
    { path: 'rutas', component: RutaListComponent, canActivate:[AuthGuard] },
    { path: 'rutas/create', component: RutaCreateComponent, canActivate:[AuthGuard] },
    { path: 'rutas/edit/:id', component: RutasEditComponent, canActivate:[AuthGuard] },
    { path: 'rutas/asignaciones/:id', component:RutasAsignacionesComponent, canActivate:[AuthGuard] },
    { path: 'horarios', component: HorarioListComponent, canActivate:[AuthGuard] },
    { path: 'horarios/create', component: HorarioCreateComponent, canActivate:[AuthGuard] },
    { path: 'horarios/edit/:id', component: HorariosEditComponent, canActivate:[AuthGuard] },
    { path: 'horarios/asignaciones/:id', component:HorariosAsignacionesComponent, canActivate:[AuthGuard] },
    { path: 'asignaciones', component: AsignacionesListComponent, canActivate:[AuthGuard]},
    { path: 'asignaciones/create', component: AsignacionesCreateComponent, canActivate:[AuthGuard]},
    { path: 'asignaciones/edit/:id', component: AsignacionesEditComponent, canActivate:[AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirección por defecto
    { path: '**', redirectTo: '/login' }, // Manejo de rutas no encontradas];
]