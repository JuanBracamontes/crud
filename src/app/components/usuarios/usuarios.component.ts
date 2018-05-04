import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditarComponent} from '../../modals/editar/editar.component';
import {AlertService} from '../../services/sweetalert';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios:any[]=[];
  myUser:string;
  datosVacios:boolean;

  constructor(private router:Router,
              private _dbService:FirebaseService,
              private _modalService:NgbModal,
              private _alertService:AlertService) {
    if (sessionStorage.getItem('isLogged') == 'false' || sessionStorage.getItem('isLogged') == null) {
      this.router.navigate(['login']);
    }

    this.myUser=sessionStorage.getItem('uidUser');
    // this.getMyInfo(this.myUser);
    this.getUsers();
  }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['home'])
  }

  getUsers(){
    this._dbService.getUsers().subscribe((usuarios:any)=>{
      this.usuarios=usuarios;
    })
  }


  updateUser(key:string){

    const updateRef = this._modalService.open(EditarComponent,{size:'lg'});
    updateRef.componentInstance.key=key;
  }

  goToDeleteUser(key:string){
    this._alertService.deleteItem().then((response:any)=>{
      if(response){
        this._dbService.deleteUser(key);
        this._alertService.successMesage("Usuario borrado correctamente","")
      }
    });
  }



}
