import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegistroComponent} from './components/registro/registro.component';


const ROUTES: Routes = [

    {path: 'login', component: LoginComponent },
    {path: 'registro', component: RegistroComponent },
    {path: '', loadChildren:'./layout/layout.module#LayoutModule' }


];

export const AppRouting = RouterModule.forRoot(ROUTES);
