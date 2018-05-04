import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../services/sweetalert';
import {FirebaseService} from '../../services/firebase.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {ValidationService} from '../../services/validation.service';
import {RegisterUser} from '../../interfaces/register-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  estados: string[] = ['Coahuila', 'Baja California', 'Jalisco'];
  ciudades: string[] = [];
  tipoUsuario: string[] = ['admin', 'normal'];
  dataRegister: RegisterUser = {
    nombre: '',
    direccion: '',
    telefono: '',
    cp: '',
    edo: '',
    ciudad: '',
    username: '',
    password: '',
    tipo: ''
  };

  constructor(private _modalService: NgbModal,
              private _alertService: AlertService,
              private _dbService: FirebaseService,
              private afAuth: AngularFireAuth,
              private router: Router,
              public _validationService: ValidationService) {

    if (sessionStorage.getItem('isLogged') == 'false' || sessionStorage.getItem('isLogged') == null) {
      this.router.navigate(['login']);
    }

  }

  ngOnInit() {

  }

  validateFields(dataRegister: RegisterUser, edo: string, ciudad: string, tipo: string) {
    debugger;
    dataRegister.edo = edo;
    dataRegister.ciudad = ciudad;
    dataRegister.tipo = tipo;


    if (this._validationService.errorInField(dataRegister.nombre)) {
      this._alertService.errorMessage('Campo vacio', 'Llene el campo nombre');
    } else {
      if (this._validationService.errorInField(dataRegister.direccion)) {
        this._alertService.errorMessage('Campo vacio', 'Llene el campo direccion');
      } else {
        if (this._validationService.errorInField(dataRegister.telefono)) {
          this._alertService.errorMessage('Campo vacio', 'Llene el campo telefono');
        } else {
          if (this._validationService.errorInField(dataRegister.cp)) {
            this._alertService.errorMessage('Campo vacio', 'Llene el campo codigo postal');
          } else {
            if (this._validationService.errorInField(dataRegister.username)) {
              this._alertService.errorMessage('Campo vacio', 'Llene el campo usuario');
            } else {
              if (this._validationService.errorInField(dataRegister.password)) {
                this._alertService.errorMessage('Campo vacio', 'Llene el campo contraseña');
              } else {
                if (this._validationService.errorInField(dataRegister.tipo)) {
                  this._alertService.errorMessage('Campo vacio', 'Llene el campo tipo');
                } else {
                  if (this._validationService.errorInField(dataRegister.edo)) {
                    this._alertService.errorMessage('Campo vacio', 'Llene el campo estado');
                  } else {
                    if (this._validationService.errorInField(dataRegister.ciudad)) {
                      this._alertService.errorMessage('Campo vacio', 'Llene el campo ciudad');
                    } else {
                      this.goToRegister(dataRegister);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  goToRegister(datos: RegisterUser) {
    this._dbService.registerUser(datos).then(() => {
      this._alertService.successMesage2('Usuario registrado correctamente', '').then(() => {
        window.location.reload();
      });
    }).catch((error: string) => {
      this._alertService.errorMessage(error, '');
    });
  }


  getCiudades(estado: string) {

    switch (estado) {

      case 'Coahuila':
        this.ciudades = ['Abasolo', 'Acuña', 'Allende'];
        break;
      case 'Baja California':
        this.ciudades = ['Tecate', 'Tijuana', 'Playas de Rosarito'];
        break;
      case 'Jalisco':
        this.ciudades = ['Guadalajara', 'Juchitlán', 'San Marcos'];
        break;

    }

  }

  goToUsers() {
    this.router.navigate(['usuarios']);
  }

}
