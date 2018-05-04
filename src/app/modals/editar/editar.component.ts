import { Component, OnInit, Input } from '@angular/core';
import {RegisterUser} from '../../interfaces/register-user';
import {AlertService} from '../../services/sweetalert';
import {ValidationService} from '../../services/validation.service';
import {FirebaseService} from '../../services/firebase.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  @Input() key;
  estados: string[] = ['Coahuila', 'Baja California','Jalisco'];
  ciudades: string[] = [];
  tipoUsuario: string[] = ['admin', 'normal'];
  dataRegister: RegisterUser = {
    nombre: '',
    direccion: '',
    telefono: '',
    cp: '',
    edo:'',
    ciudad:'',
    username:'',
    password:'',
    tipo:''
  };

  constructor(private _alertService:AlertService,
              public _validationService:ValidationService,
              private _dbService:FirebaseService,
              private _activeModal:NgbActiveModal) {}

  ngOnInit() {this.getInfo(this.key);
  }

  getInfo(key:string){
    this._dbService.getMyUserInfo(key).subscribe((result:any)=>{
      this.dataRegister=result;
      this.dataRegister.password=result.contraseña;
      this.dataRegister.username=result.usuario;
      this.getCiudades(result.estado);
    })
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
                      this.updateInfo(dataRegister);
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

  updateInfo(dataRegister:any){
    this._dbService.updateInfoUser(this.dataRegister);
    this._alertService.successMesage("Datos actualizados correctamente","");
    this._activeModal.dismiss();

  }

  getCiudades(estado: string) {

    switch (estado) {

      case 'Coahuila':
        this.ciudades = ['Abasolo', 'Acuña', 'Allende'];
        break;
      case 'Baja California':
        this.ciudades = ['Tecate', 'Tijuana','Playas de Rosarito'];
        break;
      case 'Jalisco':
        this.ciudades = ['Guadalajara', 'Juchitlán', 'San Marcos'];
        break;

    }

  }

}
