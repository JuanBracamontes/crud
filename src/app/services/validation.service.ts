import {Injectable} from '@angular/core';
import {AlertService} from './sweetalert';
import {isUndefined} from 'util';

@Injectable()
export class ValidationService {

  constructor(private _alertService: AlertService) {
  }

  errorInField(field: any) {
    return isUndefined(field) || field == null || field == "";
  }

  restrictNumeric(e, field?) {

    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which === 45) {
      return false;
    }
    if (e.which === 46) {
      if(field.includes(".")){
        return false;
      }else{
        return true;
      }
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  getErrorAuth(error: any) {
    switch (error) {

      case 'auth/user-not-found':
        this._alertService.errorMessage('Usuario No Encontrado', '');
        break;

      case 'auth/invalid-email':
        this._alertService.errorMessage('Email invalido', '');
        break;

      case 'auth/operation-not-allowed':
        this._alertService.errorMessage('Operacion no permitida', '');
        break;

      case 'auth/account-exists-with-different-credential':
        this._alertService.errorMessage('Cuenta Duplicada', 'La cuenta se utiliza en otro metodo de inicio de sesion');
        break;

      case 'auth/wrong-password':
        this._alertService.errorMessage('Contraseña incorrecta', 'Verifique la contraseña');
        break;

      case 'auth/weak-password':
        this._alertService.errorMessage('Contraseña debil', 'Ingrese una contraseña mas fuerte');
        break;

    }
  }
}
