import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PanelComponent } from './panel/panel.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PasarPLataComponent } from './pasar-plata/pasar-plata.component';


const routes: Routes = [
  {
    path:'',component:PanelComponent,
    children:[
      {
        path:'index',component:IndexComponent
      },
    ]
  },
  {
    path:'profile',component:PasarPLataComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'registro',component:RegistroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
