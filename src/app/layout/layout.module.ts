import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule,NgbModal,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AlertService} from '../services/sweetalert';
import {FirebaseService} from '../services/firebase.service';
import {ValidationService} from '../services/validation.service';
import {LayoutComponent} from './layout.component';
import {HomeComponent} from '../components/home/home.component';
import {NavbarComponent} from '../components/shared/navbar/navbar.component';
import {LayoutRouting} from './layout.routes';
import {CommonModule} from '@angular/common';
import {UsuariosComponent} from '../components/usuarios/usuarios.component';
import {EditarComponent} from '../modals/editar/editar.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    UsuariosComponent,
    NavbarComponent,
    EditarComponent
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    NgbModule.forRoot(),
    NgbModule,
    LayoutRouting,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireAuthModule
  ],
  exports:[
    NavbarComponent
  ],
  providers: [
    NgbModal,
    NgbActiveModal,
    AlertService,
    FirebaseService,
    ValidationService
  ],
  entryComponents:[
    EditarComponent
  ]
})
export class LayoutModule { }
