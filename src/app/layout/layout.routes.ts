import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {RegistroComponent} from '../components/registro/registro.component';
import {LayoutComponent} from './layout.component';
import {UsuariosComponent} from '../components/usuarios/usuarios.component';

const ROUTES: Routes = [
  {
    path: '', component: LayoutComponent, children:[

      {path: 'home', component: HomeComponent},
      {path: 'usuarios', component: UsuariosComponent},
      {path: '', pathMatch: 'full', redirectTo: 'home'}
    ]
  },
];

export const LayoutRouting = RouterModule.forChild(ROUTES);
