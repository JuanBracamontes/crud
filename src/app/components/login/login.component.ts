import {Component, OnInit} from '@angular/core';
import {UserLog} from '../../interfaces/user';
import {AngularFireAuth, AngularFireAuthModule} from 'angularfire2/auth';
import {AlertService} from '../../services/sweetalert';
import {Router} from '@angular/router';
import {ValidationService} from '../../services/validation.service';
import {FirebaseService} from '../../services/firebase.service';
import {GlobalsService} from '../../services/globals.service';
import {NavbarComponent} from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserLog = {
    username: '',
    password: ''
  };

  constructor(private afAuth: AngularFireAuth,
              private _alertService: AlertService,
              private router: Router,
              private _validationService: ValidationService,
              private _firebaseService: FirebaseService) {

    sessionStorage.setItem('isLogged', 'false');

  }

  ngOnInit() {
  }

  goToRegister() {
    this.router.navigate(['registro']);
  }

  verifyFields(user: UserLog) {
    if (user.username == '') {
      this._alertService.errorMessage('Campo Vacio', 'Verifique el campo usuerio');
    } else {
      if (user.password == '') {
        this._alertService.errorMessage('Campo Vacio', 'Verifique el campo password');
      } else {
        this.signIn(user);
      }
    }
  }

  signIn(user: UserLog) {
    this._firebaseService.logginUser(user)
      .then(() => {
        sessionStorage.setItem('isLogged', 'true');
        this.router.navigate(['home']);
      })
      .catch((error: string) => {
        switch (error) {

          case 'Usuario no encontrado':
            this._alertService.errorMessage('Usuario no encontrado', '');
            user.username = null;
            user.password = null;
            break;

          case 'Contraseña incorrecta':
            this._alertService.errorMessage('Contraseña incorrecta', '');
            user.password = null;
            break;

        }

      });
  }

}
