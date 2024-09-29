import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './components/navbar/nav-bar.component';

const routes: Routes = [
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
  ,
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: '',
    component: NavBarComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'buscar-tareas',
        loadChildren: () => import('./buscar-tareas/buscar-tareas.module').then( m => m.BuscarTareasPageModule)
      },
      {
        path: 'anadir-tareas',
        loadChildren: () => import('./anadir-tareas/anadir-tareas.module').then( m => m.AnadirTareasPageModule)
      },
      {
        path: 'editar-etiquetas',
        loadChildren: () => import('./editar-etiquetas/editar-etiquetas.module').then( m => m.EditarEtiquetasPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'ver-tarea',
    loadChildren: () => import('./ver-tarea/ver-tarea.module').then( m => m.VerTareaPageModule)
  },
  {
    path: 'nueva-tarea',
    loadChildren: () => import('./nueva-tarea/nueva-tarea.module').then( m => m.NuevaTareaPageModule)
  },
  {
    path: 'ver-etiqueta',
    loadChildren: () => import('./ver-etiqueta/ver-etiqueta.module').then( m => m.VerEtiquetaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
