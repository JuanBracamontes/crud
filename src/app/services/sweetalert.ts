import {Injectable} from '@angular/core';
import swal from "sweetalert2";
@Injectable()
export class AlertService {

  constructor() {
  }

  successMesage(tittle:string, message:string){
    swal(
      tittle,
      message,
      'success'
    )
  }

  successMesage2(tittle:string, message:string){

    return new Promise((resolve)=>{
      swal(
        tittle,
        message,
        'success'
      ).then(()=>{
        resolve();
      })
    })
  }

  errorMessage(tittle:string,message:string){
    swal(
      tittle,
      message,
      'error'
    )
  }

  deleteItem(){
    return new Promise((resolve)=>{
      swal({
        title: '¿Desea borrar este usuario?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        debugger;
        if (result.value) {
          return resolve(true);
        }
      })
    })

  }

}
