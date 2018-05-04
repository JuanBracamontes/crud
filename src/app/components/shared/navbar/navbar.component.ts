import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged:boolean=false;
  constructor(private afAuth:AngularFireAuth,
              private router:Router) {

  }

  ngOnInit() {

  }

  logout(){
    sessionStorage.setItem('isLogged','false');
    this.router.navigate(['login']);
  }

}
