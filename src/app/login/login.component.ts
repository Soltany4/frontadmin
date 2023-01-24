import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email:string|any;
  password:string|any;

  constructor(private _route:Router){ }

  ngOnInit(): void {
   
  }
 

  public login1(email: string, password: string){
    this._route.navigate(['dashboard']);
  }

}
