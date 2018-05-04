import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule,NgbModal,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import {AlertService} from './services/sweetalert';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FirebaseService} from './services/firebase.service';
import { LoginComponent } from './components/login/login.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { RegistroComponent } from './components/registro/registro.component';
import {ValidationService} from './services/validation.service';
import {AppRouting} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    NgbModule.forRoot(),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireAuthModule
  ],
  providers: [
    NgbModal,
    NgbActiveModal,
    AlertService,
    FirebaseService,
    ValidationService
  ],
  entryComponents:[

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
