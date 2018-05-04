import { Injectable } from '@angular/core';

@Injectable()
export class ModalOptionsService {

  constructor() { }

  static optionLg:{
    backdrop:'static',
    keyboard:false,
    size:'lg'
  }

}
