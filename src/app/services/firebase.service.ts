import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {UserLog} from '../interfaces/user';
import {AlertService} from './sweetalert';
import {Router} from '@angular/router';
import {RegisterUser} from '../interfaces/register-user';

@Injectable()
export class FirebaseService {

  constructor(private db: AngularFireDatabase,
              private _alertService:AlertService,
              private router:Router) {
  }

  logginUser(user:UserLog){
   return new Promise((resolve,reject)=>{
     user.username = user.username.replace('.','');
     this.db.object(`usuarios/${user.username}`).valueChanges().subscribe((response:any)=>{
       debugger;
       if(response!=null){

           if(response.contraseña!=user.password){
              reject("Contraseña incorrecta")
           }else{
             sessionStorage.setItem('isLogged',"true");
              resolve();
           }

       }else{

          reject("Usuario no encontrado");

       }
     });
   })
  }

  goToRegisterUser(user:UserLog){
    return new Promise ((resolve,reject)=>{
      user.username = user.username.replace('.','');
      this.db.object(`usuarios/${user.username}`).valueChanges().subscribe((response:any)=>{
        if(response!=null){
          reject('Usuario ya existente');
        }else{
          this.db.list('usuarios/').set(
            user.username,
            {
              usuario:user.username,
              contraseña:user.password
            }
          );
          resolve();
        }
      });
    })
  }

  registerUser(datos:RegisterUser){
    return new Promise ((resolve,reject)=>{
      datos.username = datos.username.replace('.','');
      this.db.object(`usuarios/${datos.username}`).valueChanges().subscribe((response:any)=>{
        if(response!=null){
          reject('El username ya existe, intente con otro');
        }else{
          this.db.list('usuarios/').set(
            datos.username,
            {
              nombre:datos.nombre,
              usuario:datos.username,
              contraseña:datos.password,
              direccion:datos.direccion,
              telefono:datos.telefono,
              cp:datos.cp,
              estado:datos.edo,
              ciudad:datos.ciudad,
              tipo:datos.tipo
            }
          );
          resolve();
        }
      });
    })
  }

  getUsers(){
   return this.db.list('usuarios').valueChanges();
  }

  getMyUserInfo(uid:string){
     return this.db.object(`usuarios/${uid}`).valueChanges();
  }

  updateInfoUser(datos:RegisterUser){
    this.db.list(`usuarios/`).update(
      datos.username,
      {
        nombre:datos.nombre,
        usuario:datos.username,
        contraseña:datos.password,
        direccion:datos.direccion,
        telefono:datos.telefono,
        cp:datos.cp,
        estado:datos.edo,
        ciudad:datos.ciudad,
        tipo:datos.tipo
      }
    )
  }

  deleteUser(key:string){
    this.db.list(`usuarios/${key}`).remove();
  }

}
