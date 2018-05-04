import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsService {

  static username:string;
  static isLogged:string;
  constructor() { }

}
