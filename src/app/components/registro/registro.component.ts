import { Component, OnInit } from '@angular/core';
import {UserLog} from '../../interfaces/user';
import {AlertService} from '../../services/sweetalert';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoginComponent} from '../login/login.component';
import {ValidationService} from '../../services/validation.service';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserLog = {
    username: '',
    password: ''
  };

  errorInFields:boolean=false;

  constructor(private _alertService: AlertService,
              private afAuth:AngularFireAuth,
              private _validationService:ValidationService,
              private router:Router,
              private _dbService:FirebaseService) {
  }

  ngOnInit() {
  }

  verifyFields(user:UserLog){
    if(user.username==""){
      this._alertService.errorMessage("Campo vacio","llene el campo usuario");
      this.errorInFields=true;
    }else{
      if(user.password==""){
        this._alertService.errorMessage("Campo vacio","llene el campo contraseña");
        this.errorInFields=true;
      }else{
        this.goToRegisterUser(user);
      }
    }

  }
  goToRegisterUser(user:UserLog){
    this._dbService.goToRegisterUser(user).then(()=>{
      sessionStorage.setItem('isLogged','true');
      this.router.navigate(['home']);
    }).catch((error:string)=>{
        this._alertService.errorMessage(error,"");
    })
  }

  goToLogin(){
    this.router.navigate(['login']);
  }
}


