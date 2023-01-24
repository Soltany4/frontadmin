import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [{
  path: '',
  loadChildren: () =>
    import('./login/login.module').then(
      m => m.LoginModule
    )
},
{path: 'dashboard',component: DashboardComponent,

children: [
  {
    path: 'home',
    loadChildren: () =>
      import('./dashboard/home/home.module').then(
        m=>m.HomeModule
      )
   },
   {
     path: 'emplois',
     loadChildren: () => 
       import('./dashboard/emplois/emplois.module').then(
         m=>m.EmploisModule
       )
   },
   {
    path: 'cours',
    loadChildren: () => 
      import('./dashboard/cours/cours.module').then(
        m=>m.CoursModule
      )
  },
  {
    path: 'epreuves',
    loadChildren: () => 
      import('./dashboard/epreuves/epreuves.module').then(
        m=>m.EpreuvesModule
      )
  },

] 

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DashboardModule], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
