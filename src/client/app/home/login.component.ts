import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'vb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
    console.log('LoginComponent.ctor');
  }

  ngOnInit() {
    console.log('LoginComponent.init');
  }

}
